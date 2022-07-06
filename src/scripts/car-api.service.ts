import { CarConfig, CarDataResponse } from '../models/car-data.model';

export class CarApiService {
  static async fetchCarData(car: CarConfig) {
    const response = await fetch(car.dataUrl, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    const json = await response.json();
    return json as CarDataResponse[];
  }
}
