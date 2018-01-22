export type Show = {
  id: string;
  name: string;
};

export type Episode = {
  id: string;
  name: string;
  season: number;
  number: number;
  airstamp: string;
  show: Show;
};