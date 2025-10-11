export type Brand = { id: string; label: string };

// Static brand list, used for filtering and display
export const BRANDS: Brand[] = [
  { id: "allo", label: "Allo" },
  { id: "beast", label: "Flavour Beast" },
  { id: "ovns", label: "OVNS" },
  { id: "stlth", label: "STLTH" },
  { id: "alfakher", label: "Al Fakher" },
  { id: "geek", label: "Geek Bar" },
  { id: "drip'n-by-envi", label: "Drip'n by Envi" },
  { id: "breeze-prime", label: "Breeze Prime" },
  { id: "vice", label: "Vice" },
  { id: "uwell", label: "Uwell" },
  { id: "kraze-luna", label: "Kraze Luna" },
  { id: "level-x", label: "Level X" }
];

export const brandLabel = (id: string): string => BRANDS.find(b => b.id === id)?.label || id;
