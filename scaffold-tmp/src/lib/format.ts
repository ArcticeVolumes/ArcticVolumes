export function formatCad(amount: number) {
  return `$${amount.toFixed(2)} CAD`;
}

// Some image files have spaces in their names (e.g. "bowtie main.jpg").
// encodeURI makes those safe to use in a src attribute.
export function imageSrc(path: string) {
  return encodeURI(path);
}