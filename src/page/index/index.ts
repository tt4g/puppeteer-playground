import type { Page } from "puppeteer";
import { resolveLocalFilePath } from "../../resolveLocalResource";

export async function visitIndexPage(page: Page): Promise<unknown> {
  console.log("Visit local index page.");

  const localHtml = resolveLocalFilePath("html/index.html");
  console.log(localHtml);

  await page.goto(localHtml);

  return waitForClose(page);
}

async function waitForClose(page: Page): Promise<void> {
  // NOTE that the code in the callbacks registered in `page.evaluate` will be
  // executed in the browser, and the `console.log` executed in the browser will
  // not be displayed in the application.
  // Even if we manipulate the `page` object of `pupetter` with Javascript in
  // the browser, we will not be able to manipulate the `page` because it refers
  // to a different variable than the application.
  await page.evaluate(waitForCloseBrowserCallback);

  await page.close();
}

const waitForCloseBrowserCallback = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const buttonId = "close-button";
    const closeButtonElement = document.getElementById(buttonId);

    if (closeButtonElement === null) {
      reject(new Error(`button#${buttonId} does not exist.`));
      return;
    }

    closeButtonElement.addEventListener("click", (event) => {
      event.preventDefault();

      resolve();

      return false;
    });
  });
};
