import { CarConfig, CarDataResponse } from '../models/car-data.model';

export class CarApiService {
  static async fetchCarData(car: CarConfig) {
    console.log('#ee car 5', car);
    const response = await fetch(car.dataUrl, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    const json = await response.json();
    console.log('#ee response 7', response, json);
    return json as CarDataResponse[];
  }
}
