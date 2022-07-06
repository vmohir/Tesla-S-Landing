import { CarConfig, CarDataResponse } from '../models/car-data.model';

export class CarApiService {
  static async fetchCarData(car: CarConfig) {
    console.log('#ee car 5', car);
    const response = await fetch(car.dataUrl);
    console.log('#ee response 7', response);
    return (await response.json()) as CarDataResponse[];
  }
}
