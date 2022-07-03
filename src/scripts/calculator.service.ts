import { CalcFormData } from '../models/calculator.model';
import { CarDataService } from './car-data.service';
import { EnrichedCarData } from '../models/car-data.model';

export class CalculatorService {
  private carsData: EnrichedCarData[] = [];
  constructor(
    private formElm: HTMLFormElement,
    private car100DValueElm: HTMLElement,
    private carP100DValueElm: HTMLElement,
  ) {}

  getFormData(form: HTMLFormElement): CalcFormData {
    const formData = new FormData(form);
    return {
      wheelSize: parseInt(formData.get('wheelsize') as string, 10) as CalcFormData['wheelSize'],
      ac: formData.get('ac') === 'on' ? 'on' : 'off',
      kmh: parseInt(formData.get('kmh') as string, 10),
      temp: parseInt(formData.get('temp') as string, 10),
    };
  }

  setupFormHandler(carsData: EnrichedCarData[]) {
    this.carsData = carsData;

    this.updateCarKilometers();
    this.formElm.addEventListener('change', (e) => {
      this.updateCarKilometers();
    });
  }

  updateCarKilometers() {
    const formData = this.getFormData(this.formElm);
    console.log('#ee formData', formData);
    const result = this.carsData.map((car) => {
      return car[CarDataService.getCarDataItemKey(formData)];
    });
    console.log('#ee result', result);

    if (!this.car100DValueElm || !this.carP100DValueElm || result.length !== 2) {
      return; // todo handle it
    }

    this.car100DValueElm.innerText = result[0].toString();
    this.carP100DValueElm.innerText = result[1].toString();
  }
}
