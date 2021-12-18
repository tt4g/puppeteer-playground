import * as path from "path";
import { isRunningPkg } from "./pkg/isRunningPkg";

// When the application is running with the executable file generated by `vercel/pkg`,
// the resource files are placed in the same directory as the executable file.
export const localResourceBasePath = isRunningPkg
  ? path.dirname(process.execPath)
  : process.cwd();

export const resolveLocalFilePath = (localPath: string) => {
  const absolutePath = path.join(localResourceBasePath, localPath);

  return "file://" + absolutePath;
};
