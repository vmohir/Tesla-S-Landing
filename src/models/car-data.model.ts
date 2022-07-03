export type CarBrands = '100D' | 'P100D';
export interface CarData {
  temp: number;
  ac: 'on' | 'off';
  wheelsize: 19 | 21;
  hwy: { kmh: number; kilometers: number }[];
}

export interface EnrichedCarData {
  [p: string]: number;
}
