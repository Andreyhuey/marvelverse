export const collection = [
  { name: "avengers" },
  { name: "black panther" },
  { name: "black widow" },
  { name: "captain america" },
  { name: "captain marvel" },
  { name: "daredevil" },
  { name: "deadpool" },
  { name: "doctor strange" },
  { name: "hawkeye" },
  { name: "hulk" },
  { name: "Red hulk" },
  { name: "Iron Man" },
  { name: "Loki" },
  { name: "Kang" },
  { name: "moon knight" },
  { name: "magneto" },
  { name: "nova" },
  { name: "scarlet witch" },
  { name: "skrull" },
  { name: "spider" },
  { name: "thanos" },
  { name: "thor" },
  { name: "wolverine" },
  { name: "venom" },
];

export const charactersOptions = [
  { label: "Ascending Order (A-Z)", value: "name" },
  { label: "Descending Order (Z-A)", value: "-name" },
  { label: "Old", value: "modified" },
  { label: "Recently Modified", value: "-modified" },
];

export const comicsOptions = [
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

export const eventsOptions = [
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

export const searchStructure = [
  { label: "All" },
  { label: "Characters" },
  { label: "Comics" },
  { label: "Events" },
  { label: "Series" },
];
