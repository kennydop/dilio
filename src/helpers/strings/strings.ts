import { Timestamp } from "firebase/firestore";

// capitalize first letter of each word in a string
export const toCapitalize = (str: string) => {
  return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

export const cediFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
});

export const formatDate = (timestamp: Timestamp) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    timestamp.toDate()
  );
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
    timestamp.toDate()
  );
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    timestamp.toDate()
  );

  return `${month} ${day}, ${year}`;
};
