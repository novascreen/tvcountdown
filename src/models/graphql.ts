export type Show = {
  id: number;
  name: string;
};

export type Episode = {
  id: number;
  name: string;
  season?: number;
  number?: number;
  airstamp: string;
  show: Show;
};