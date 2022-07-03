import { CalculatorService } from './calculator.service';
import { CarDataService } from './car-data.service';
import { NumberInputService } from './number-input.service';
import { AcModeService } from './ac-mode.service';

export class App {
  private calculator: CalculatorService;
  private carDataService: CarDataService;

  constructor(car100DSelector: string, carP100DSelector: string, formSelector: string) {
    const car100DValueElm = document.getElementById(car100DSelector);
    const carP100DValueElm = document.getElementById(carP100DSelector);
    const calcForm = document.getElementById(formSelector);

    if (!(calcForm instanceof HTMLFormElement) || !car100DValueElm || !carP100DValueElm) {
      throw new Error('');
    }

    this.calculator = new CalculatorService(calcForm, car100DValueElm, carP100DValueElm);
    new NumberInputService(this.calculator).setupNumberInputs();
    this.carDataService = new CarDataService();
    new AcModeService();
  }

  setupApp() {
    Promise.all([
      this.carDataService.getCarData('100D'),
      this.carDataService.getCarData('P100D'),
    ]).then((carsData) => {
      console.log('#ee data', carsData);

      this.calculator.setupFormHandler(carsData);
    });
  }
}
