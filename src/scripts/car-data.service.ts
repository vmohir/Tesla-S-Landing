import { CarBrands, CarData, EnrichedCarData } from '../models/car-data.model';
import { CalcFormData } from '../models/calculator.model';

export class CarDataService {
  private static car100D: string = require('../data/metric-100D.json');
  private static carP100D: string = require('../data/metric-P100D.json');
  private enrichedData?: EnrichedCarData;

  static getCarDataItemKey({ kmh, ac, temp, wheelSize }: CalcFormData) {
    return `${ac}.${temp}.${wheelSize}.${kmh}`;
  }

  async getCarData(carName: CarBrands) {
    const carDataUrl = { '100D': CarDataService.car100D, P100D: CarDataService.carP100D }[carName];

    try {
      const data = (await (await fetch(carDataUrl)).json()) as CarData[];
      this.enrichedData = data.reduce<{ [key: string]: number }>(
        (res, { ac, temp, hwy, wheelsize: wheelSize }) => ({
          ...res,
          ...hwy.reduce(
            (innerResult, { kmh, kilometers }) => ({
              ...innerResult,
              [CarDataService.getCarDataItemKey({ ac, temp, wheelSize, kmh })]: kilometers,
            }),
            {},
          ),
        }),
        {},
      );
      return this.enrichedData;
    } catch (e) {
      throw e;
    }
  }
}
