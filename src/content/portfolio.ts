import type { PortfolioContent } from './types';
import { parsePortfolioMarkdown } from './parsePortfolio';
import portfolioMarkdown from '../../content/portfolio.md?raw';

// Parse portfolio content from the single-source-of-truth markdown file
export const portfolioContent: PortfolioContent = parsePortfolioMarkdown(portfolioMarkdown);
