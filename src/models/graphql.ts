export type Image = {
  medium?: string
  original?: string
};

export type Network = {
  name?: string
};

export type Show = {
  id: number
  name: string
  premiered?: string
  image?: Image
  network?: Network
};

export type Episode = {
  id: number
  name: string
  season?: number
  number?: number
  airstamp: string
  show: Show
};