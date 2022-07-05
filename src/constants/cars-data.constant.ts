import { CarConfig } from '../models/car-data.model';

export const carsData: CarConfig[] = [
  { id: '100d-km', dataUrl: require('../data/metric-100D.json') },
  { id: 'p100d-km', dataUrl: require('../data/metric-P100D.json') },
];
