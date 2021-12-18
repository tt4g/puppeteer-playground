import * as puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";
import { resolveChromiumExecutablePath } from "./resolveChromiumExecutablePath";

export const launch = async (): Promise<[Browser, Page]> => {
  const chromiumExecutablePath = resolveChromiumExecutablePath();
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: chromiumExecutablePath,
  });

  const page = await firstPage(browser);

  return [browser, page];
};

const firstPage = async (browser: Browser): Promise<Page> => {
  const [page] = await browser.pages();

  return page;
};
