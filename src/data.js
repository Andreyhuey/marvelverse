export const collection = [
  { name: "Avengers" },
  { name: "captain-america" },
  { name: "deadpool" },
  { name: "moon knight" },
  { name: "nova" },
  { name: "skrull" },
  { name: "spider" },
  { name: "thanos" },
  { name: "thor" },
  { name: "venom" },
  { name: "wolverine" },
];

export const characterOptions = [
  { label: "Ascending Order (A-Z)", value: "name" },
  { label: "Descending Order (Z-A)", value: "-name" },
  { label: "Old", value: "modified" },
  { label: "Recently Modified", value: "-modified" },
];

export const comicOptions = [
  { label: "Ascending Order (A-Z)", value: "title" },
  { label: "Descending Order (Z-A)", value: "-title" },
  { label: "Oldest Issue", value: "issueNumber" },
  { label: "Latest Issue", value: "-issueNumber" },
  { label: "Old", value: "modified" },
  { label: "Recently Modified", value: "-modified" },
  { label: "Final Order Cutoff (FOC)", value: "focDate" },
  { label: "Latest Final Order Cutoff (FOC)", value: "-focDate" },
  { label: "Oldest On Sale", value: "onsaleDate" },
  { label: "Latest On Sale", value: "-onsaleDate" },
];

export const eventOptions = [
  { label: "Ascending Order (A-Z)", value: "name" },
  { label: "Descending Order (Z-A)", value: "-name" },
  { label: "Newest", value: "-startDate" },
  { label: "Oldest", value: "startDate" },
  { label: "Modified", value: "modified" },
];

export const seriesOptions = [
  { label: "Start Year", value: "startYear" },
  { label: "Ascending Order (A-Z)", value: "title" },
  { label: "Descending Order (Z-A)", value: "-title" },
  { label: "Old", value: "modified" },
  { label: "Newest", value: "-modified" },
];
