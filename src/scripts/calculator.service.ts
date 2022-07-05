import { CalcFormData } from '../models/calculator.model';

export class CalculatorService {
  constructor(private formElm: HTMLFormElement) {}

  getFormData(): CalcFormData {
    const formData = new FormData(this.formElm);
    return {
      wheelSize: parseInt(formData.get('wheelsize') as string, 10) as CalcFormData['wheelSize'],
      ac: formData.get('ac') === 'on' ? 'on' : 'off',
      kmh: parseInt(formData.get('kmh') as string, 10),
      temp: parseInt(formData.get('temp') as string, 10),
    };
  }

  setupFormHandler({ onFormDataChange }: { onFormDataChange: (formData: CalcFormData) => void }) {
    onFormDataChange(this.getFormData());
    this.formElm.addEventListener('change', () => {
      onFormDataChange(this.getFormData());
    });

    // Seems to be the only solution to detect js modifications according to this SO answer: https://stackoverflow.com/a/1949416/1889607
    setInterval(() => {
      onFormDataChange(this.getFormData());
    }, 100);
  }
}
