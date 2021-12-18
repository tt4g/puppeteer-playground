import type { Browser, Page } from "puppeteer";
import "./initialize";
import { visitIndexPage } from "./page/index";
import { handleBrowserClose, handlePageClose } from "./puppeteer/handler";
import { launch } from "./puppeteer/setup";

const registerEventHandler = (browser: Browser, page: Page) => {
  handlePageClose(page, () => {
    console.log("First page closed.");

    browser.close();
  });

  handleBrowserClose(browser, () => console.log("Browser disconnected."));
};

const main = async () => {
  const [browser, page] = await launch();
  try {
    registerEventHandler(browser, page);

    await visitIndexPage(page);
  } finally {
    browser.close();
  }
};

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
  }
})();
