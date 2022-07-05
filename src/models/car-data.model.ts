export interface CarDataResponse {
  temp: number;
  ac: 'on' | 'off';
  wheelsize: 19 | 21;
  hwy: { kmh: number; kilometers: number }[];
}

export interface CarConfig {
  dataUrl: string;
  domElm?: HTMLElement | null;
  id: string;
  data?: CarKilometers;
}

export interface CarKilometers {
  [p: string]: number;
}
