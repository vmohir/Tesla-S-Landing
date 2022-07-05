import { CarConfig, CarDataResponse } from '../models/car-data.model';

export class CarApiService {
  static async fetchCarData(car: CarConfig) {
    const response = await fetch(car.dataUrl);
    return (await response.json()) as CarDataResponse[];
  }
}
