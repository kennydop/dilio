// capitalize first letter of each word in a string
export const toCapitalize = (str: string) => {
  return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

export const cediFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
});
