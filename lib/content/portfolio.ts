import type { PortfolioContent } from './types';
import { parsePortfolioMarkdown } from './parsePortfolio';
// @ts-expect-error - webpack handles .md as raw text via next.config.ts
import portfolioMarkdown from '../../content/portfolio.md';

// Parse portfolio content from the single-source-of-truth markdown file
export const portfolioContent: PortfolioContent = parsePortfolioMarkdown(portfolioMarkdown);
