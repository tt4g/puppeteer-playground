import { install as sourceMapSupportInstall } from "source-map-support";
import { isRunningPkg } from "./pkg/isRunningPkg";

// Enable source map support.
// Don't forget:
// 1. pass `--inlineSourceMap` option to `tsc`.
// 2. pass `--public` option to `pkg`.
sourceMapSupportInstall();

if (isRunningPkg && process.env.NODE_ENV === undefined) {
  // 1. If the application is running in an executable file generated by `vercel/pkg`.
  // 2. `process.env.NODE_ENV` is `undefined`.
  // then `NODE_ENV = "production"`.
  process.env.NODE_ENV = "production";
}
