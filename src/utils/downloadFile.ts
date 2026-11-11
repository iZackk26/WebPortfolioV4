/** Triggers a browser download of `href`, saving it as `fileName`. */
export const downloadFile = (href: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  link.click();
};
