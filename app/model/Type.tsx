export type ICrime = {
  id: number;
  title: string;
  location: number;
  photo?: string;
  createdat: number;
  status: number;
  notes: string;
};

export type ILocation = {
  id: number;
  name: string;
};

export type IDropdownLocation = {
  value: number;
  label: string;
};
