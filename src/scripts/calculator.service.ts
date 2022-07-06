import { CalcFormData } from '../models/calculator.model';

export class CalculatorService {
  private latestFormData?: string;

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
    this.emitFormData(onFormDataChange);
    this.formElm.addEventListener('change', () => {
      this.emitFormData(onFormDataChange);
    });

    // Seems to be the only solution to detect js modifications according to this SO answer: https://stackoverflow.com/a/1949416/1889607
    setInterval(() => {
      this.emitFormData(onFormDataChange);
    }, 5000);
  }

  private emitFormData(onFormDataChange: (formData: CalcFormData) => void) {
    const newFormData = this.getFormData();
    if (this.latestFormData === JSON.stringify(newFormData)) return;

    console.log('#ee fefe');
    this.latestFormData = JSON.stringify(newFormData);
    onFormDataChange(newFormData);
  }
}
