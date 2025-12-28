"""
Parse portfolio markdown file into structured content.
This is the Python equivalent of the TypeScript parser for the backend.
"""

import re
from pathlib import Path
from typing import Any


def parse_portfolio_markdown(markdown: str) -> dict[str, Any]:
    """Parse the portfolio markdown file into structured content."""
    sections = _split_into_sections(markdown)

    return {
        "bio": _parse_bio(sections.get("Bio", "")),
        "experience": _parse_experience(sections.get("Experience", "")),
        "projects": _parse_projects(sections.get("Projects", "")),
        "education": _parse_education(sections.get("Education", "")),
        "skills": _parse_skills(sections.get("Skills", "")),
        "contact": _parse_contact(sections.get("Contact", ""), sections.get("Bio", "")),
    }


def load_portfolio_content() -> dict[str, Any]:
    """Load and parse the portfolio markdown file."""
    # Path relative to the api directory
    portfolio_path = Path(__file__).parent.parent.parent.parent / \
        "content" / "portfolio.md"
    markdown = portfolio_path.read_text(encoding="utf-8")
    return parse_portfolio_markdown(markdown)


def _split_into_sections(markdown: str) -> dict[str, str]:
    """Split markdown into major sections by ## headers."""
    sections: dict[str, str] = {}
    lines = markdown.split("\n")
    current_section = ""
    current_content: list[str] = []

    for line in lines:
        match = re.match(r"^## (.+)$", line)
        if match:
            if current_section:
                sections[current_section] = "\n".join(current_content).strip()
            current_section = match.group(1)
            current_content = []
        elif current_section:
            current_content.append(line)

    if current_section:
        sections[current_section] = "\n".join(current_content).strip()

    return sections


def _parse_key_value(text: str) -> dict[str, str]:
    """Parse key: value lines from text."""
    result: dict[str, str] = {}
    for line in text.split("\n"):
        match = re.match(r"^(\w+):\s*(.+)$", line)
        if match:
            result[match.group(1)] = match.group(2)
    return result


def _parse_list_items(text: str) -> list[str]:
    """Parse markdown list items."""
    items: list[str] = []
    for line in text.split("\n"):
        match = re.match(r"^- (.+)$", line)
        if match:
            items.append(match.group(1))
    return items


def _extract_subsection(text: str, header: str) -> str:
    """Extract content under a ### header."""
    pattern = rf"### {re.escape(header)}\n([\s\S]*?)(?=\n###|\n---\n|$)"
    match = re.search(pattern, text)
    return match.group(1).strip() if match else ""


def _extract_subsubsection(text: str, header: str) -> str:
    """Extract content under a #### header."""
    pattern = rf"#### {re.escape(header)}\n([\s\S]*?)(?=\n####|\n###|\n---\n|$)"
    match = re.search(pattern, text)
    return match.group(1).strip() if match else ""


def _parse_social_links(text: str) -> list[dict[str, str]]:
    """Parse social links from markdown list."""
    links: list[dict[str, str]] = []
    for line in text.split("\n"):
        match = re.match(r"^- (\w+):\s*(.+)$", line)
        if match:
            platform = match.group(1)
            url = match.group(2)
            links.append({
                "platform": platform.capitalize(),
                "url": url,
                "icon": platform.lower(),
            })
    return links


def _parse_bio(section: str) -> dict[str, Any]:
    """Parse the bio section."""
    kv = _parse_key_value(section)
    summary_section = _extract_subsection(section, "Summary")
    highlights_section = _extract_subsection(section, "Highlights")
    social_section = _extract_subsection(section, "Social Links")

    # Extract summary text
    summary_lines = [
        line for line in summary_section.split("\n")
        if line.strip() and not line.startswith("#")
    ]
    summary = " ".join(summary_lines).strip()

    return {
        "name": kv.get("name", ""),
        "title": kv.get("title", ""),
        "location": kv.get("location", ""),
        "summary": summary,
        "highlights": _parse_list_items(highlights_section),
        "socialLinks": _parse_social_links(social_section),
    }


def _parse_experience(section: str) -> list[dict[str, Any]]:
    """Parse the experience section."""
    items: list[dict[str, Any]] = []
    entries = [e for e in section.split("\n---\n") if e.strip()]

    for entry in entries:
        header_match = re.search(r"### ([\w-]+): (.+) at (.+)\n", entry)
        if not header_match:
            continue

        exp_id = header_match.group(1)
        role = header_match.group(2)
        company = header_match.group(3)

        kv = _parse_key_value(entry)
        achievements_section = _extract_subsubsection(entry, "Achievements")
        tech_section = _extract_subsubsection(entry, "Technologies")

        # Extract description
        lines = entry.split("\n")
        description_lines: list[str] = []
        in_description = False

        for line in lines:
            if line.startswith("###") or re.match(r"^\w+:", line):
                in_description = False
                continue
            if line.startswith("####"):
                break
            if line.strip() and not in_description:
                in_description = True
            if in_description and line.strip():
                description_lines.append(line.strip())

        technologies = [t.strip()
                        for t in tech_section.split(",") if t.strip()]

        items.append({
            "id": exp_id,
            "company": company,
            "role": role,
            "duration": f"{kv.get('startDate', '')} - {kv.get('endDate', 'Present')}",
            "description": " ".join(description_lines),
            "achievements": _parse_list_items(achievements_section),
            "technologies": technologies,
        })

    return items


def _parse_projects(section: str) -> list[dict[str, Any]]:
    """Parse the projects section."""
    items: list[dict[str, Any]] = []
    entries = [e for e in section.split("\n---\n") if e.strip()]

    for entry in entries:
        header_match = re.search(r"### ([\w-]+): (.+)\n", entry)
        if not header_match:
            continue

        proj_id = header_match.group(1)
        name = header_match.group(2)

        kv = _parse_key_value(entry)
        tech_section = _extract_subsubsection(entry, "Technologies")

        # Extract descriptions
        lines = entry.split("\n")
        short_desc = ""
        long_desc = ""
        found_first = False
        found_second = False

        for line in lines:
            if line.startswith("###") or line.startswith("####") or re.match(r"^\w+:", line):
                continue
            if line.strip():
                if not found_first:
                    short_desc = line.strip()
                    found_first = True
                elif not found_second:
                    long_desc = line.strip()
                    found_second = True
                    break

        technologies = [t.strip()
                        for t in tech_section.split(",") if t.strip()]

        items.append({
            "id": proj_id,
            "name": name,
            "category": kv.get("category", ""),
            "description": short_desc,
            "longDescription": long_desc or short_desc,
            "technologies": technologies,
            "featured": kv.get("featured") == "true",
        })

    return items


def _parse_education(section: str) -> list[dict[str, Any]]:
    """Parse the education section."""
    items: list[dict[str, Any]] = []
    entries = [e for e in section.split("\n---\n") if e.strip()]

    for entry in entries:
        header_match = re.search(r"### ([\w-]+): (.+)\n", entry)
        if not header_match:
            continue

        edu_id = header_match.group(1)
        institution = header_match.group(2)

        kv = _parse_key_value(entry)
        honors_section = _extract_subsubsection(entry, "Honors")

        # Build degree string
        degree = kv.get("degree", "")
        field = kv.get("field", "")
        degree_str = f"{degree} in {field}" if field else degree

        items.append({
            "id": edu_id,
            "institution": institution,
            "degree": degree_str,
            "years": f"{kv.get('startDate', '')}-{kv.get('endDate', '')}",
            "honors": ", ".join(_parse_list_items(honors_section)) if honors_section else None,
            "gpa": kv.get("gpa"),
        })

    return items


def _parse_skills(section: str) -> dict[str, list[str]]:
    """Parse the skills section into a simpler format for the system prompt."""
    skills: dict[str, list[str]] = {}

    # Split by ### headers, keeping the header with its content
    parts = re.split(r"\n(?=### )", section)

    for part in parts:
        # Extract the header name
        header_match = re.match(r"^### (.+)\n", part)
        if not header_match:
            continue

        category_name = header_match.group(1).strip()

        # Map category names to simpler keys
        key_map = {
            "Programming Languages": "languages",
            "Frontend Development": "frontend",
            "Backend & Infrastructure": "backend",
            "AI & Machine Learning": "ai",
        }
        key = key_map.get(
            category_name, category_name.lower().replace(" ", "_"))

        skill_list: list[str] = []
        for line in part.split("\n"):
            match = re.match(r"^- (.+):\s*\w+,\s*\d+\s*years?$", line)
            if match:
                skill_list.append(match.group(1))

        if skill_list:
            skills[key] = skill_list

    return skills


def _parse_contact(section: str, bio_section: str) -> dict[str, Any]:
    """Parse the contact section."""
    kv = _parse_key_value(section)
    social_section = _extract_subsection(section, "Social Links")
    social_links = _parse_social_links(social_section)

    # If no social links in contact, try bio section
    if not social_links:
        bio_social = _extract_subsection(bio_section, "Social Links")
        social_links = _parse_social_links(bio_social)

    return {
        "email": kv.get("email", ""),
        "calendly": kv.get("calendlyUrl", ""),
        "social": [link["platform"] for link in social_links],
    }
