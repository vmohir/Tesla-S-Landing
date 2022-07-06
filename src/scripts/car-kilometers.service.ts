import { CarConfig, CarDataResponse, CarKilometers } from '../models/car-data.model';
import { CalcFormData } from '../models/calculator.model';
import { carsData } from '../constants/cars-data.constant';
import { CarApiService } from './car-api.service';

export class CarKilometersService {
  private carsData = carsData;

  constructor() {
    this.enrichCarData(carsData);
  }

  private async enrichCarData(carsData: CarConfig[]) {
    console.log('#ee carsData', carsData);
    this.carsData = await Promise.all(
      carsData.map(async (c) => ({
        ...c,
        domElm: document.getElementById(c.id),
        data: await this.getCarData(c),
      })),
    );
    console.log('#ee this.carsData', this.carsData);
  }

  static getCarKilometerKey({ kmh, ac, temp, wheelSize }: CalcFormData) {
    return `${ac}.${temp}.${wheelSize}.${kmh}`;
  }

  private async getCarData(car: CarConfig): Promise<CarKilometers> {
    console.log('#ee car 29', car);
    try {
      const data = await CarApiService.fetchCarData(car);
      return this.enrichCarResponse(data);
    } catch (e) {
      console.log('#ee e 34', e);
      throw e;
    }
  }

  enrichCarResponse(data: CarDataResponse[]) {
    return data.reduce<{ [key: string]: number }>(
      (res, { ac, temp, hwy, wheelsize: wheelSize }) => {
        const carKilometers = hwy.reduce((kmItemMap, { kmh, kilometers }) => {
          const key = CarKilometersService.getCarKilometerKey({ ac, temp, wheelSize, kmh });
          return { ...kmItemMap, [key]: kilometers };
        }, {});

        return { ...res, ...carKilometers };
      },
      {},
    );
  }

  updateKilometers(formData: CalcFormData) {
    this.carsData.forEach((c) => {
      this.updateCarKilometer(c, formData);
    });
  }

  updateCarKilometer({ domElm, id, data }: CarConfig, formData: CalcFormData) {
    console.log('#ee domElm, id, data', domElm, id, data, formData);
    if (!domElm) {
      console.warn(`Car with id=${id} doesn't exist on the page`);
      return;
    }
    if (!data) {
      domElm.innerText = '-';
      return;
    }

    const result = this.calculate(data, formData)?.toString() ?? '-';
    console.log('#ee result', result, domElm.innerText);
    if (domElm.innerText !== result) {
      console.log('#ee WTF', result);
      domElm.innerText = result;
    }
  }

  private calculate(carKilometers: CarKilometers, formData: CalcFormData): number | undefined {
    return carKilometers[CarKilometersService.getCarKilometerKey(formData)];
  }
}
