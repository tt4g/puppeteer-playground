import { platform } from "os";
import * as path from "path";
import * as puppeteer from "puppeteer";
import { isRunningPkg } from "../pkg/isRunningPkg";
import { localResourceBasePath } from "../resolveLocalResource";

export const resolveChromiumExecutablePath = (): string => {
  // Avoid "Property 'executablePath' does not exist on type ...".
  // See: https://github.com/puppeteer/puppeteer/issues/6899#issuecomment-878415393
  const executablePath: string = (
    puppeteer as unknown as puppeteer.PuppeteerNode
  ).executablePath();

  if (isRunningPkg) {
    // When running the application by executable file generated by `vercel/pkg`,
    // using local chromium.
    // See: https://github.com/vercel/pkg/issues/204#issuecomment-822015279

    const replacePattern: RegExp =
      platform() === "win32"
        ? /^.*?\\node_modules\\puppeteer\\\.local-chromium/
        : /^.*?\/node_modules\/puppeteer\/\.local-chromium/;

    return executablePath.replace(
      replacePattern,
      path.join(localResourceBasePath, ".local-chromium")
    );
  }

  return executablePath;
};
