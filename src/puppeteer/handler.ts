import type { Browser, Page } from "puppeteer";

export type Handler = () => void;

export const handleBrowserClose = (browser: Browser, callback: Handler) =>
  browser.on("disconnected", callback);

export const handlePageClose = (page: Page, callback: Handler) =>
  page.on("close", callback);
