import { CalculatorService } from './calculator.service';
import { CarKilometersService } from './car-kilometers.service';
import { NumberInputService } from './number-input.service';
import { AcModeService } from './ac-mode.service';

export class App {
  private calculator: CalculatorService;
  private carDataService: CarKilometersService;

  constructor(formElm: HTMLFormElement) {
    this.calculator = new CalculatorService(formElm);
    new NumberInputService().setupNumberInputs();
    new AcModeService();
    this.carDataService = new CarKilometersService();
  }

  setupApp() {
    this.calculator.setupFormHandler({
      onFormDataChange: (formData) => {
        this.carDataService.updateKilometers(formData);
      },
    });
  }
}
