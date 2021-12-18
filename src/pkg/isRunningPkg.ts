/**
 * `true` if the application is running in an executable file generated by
 * `vercel/pkg`, otherwise `false`.
 */
export const isRunningPkg: boolean =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Avoid "Property 'pkg' does not exist on type 'Process'.".
  process.pkg !== undefined;
