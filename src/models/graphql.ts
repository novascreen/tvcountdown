export type Image = {
  medium?: string
  original?: string
};

export type Show = {
  id: number
  name: string
  image?: Image
};

export type Episode = {
  id: number
  name: string
  season?: number
  number?: number
  airstamp: string
  show: Show
};