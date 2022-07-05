import { createElementFromHTML } from '../tests/utils/dom-test-utils';
import { CarKilometersService } from './car-kilometers.service';
import { CalcFormData } from '../models/calculator.model';

describe('CarKilometersService', () => {
  let carKilometersService!: CarKilometersService;

  const dataResponse = [
    {
      temp: -10,
      wheelsize: 19 as const,
      ac: 'off' as const,
      hwy: [
        { kmh: 70, kilometers: 798 },
        { kmh: 140, kilometers: 338 },
      ],
    },
    {
      temp: 10,
      wheelsize: 21 as const,
      ac: 'on' as const,
      hwy: [
        { kmh: 80, kilometers: 575 },
        { kmh: 130, kilometers: 351 },
      ],
    },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(dataResponse),
    }),
  ) as jest.Mock;

  beforeEach(() => {
    carKilometersService = new CarKilometersService();
  });

  it.concurrent.each([
    [{ ac: 'off', temp: 0, kmh: -10, wheelSize: 19 }, 'off.0.19.-10'],
    [{ ac: 'on', temp: 10, kmh: 100, wheelSize: 21 }, 'on.10.21.100'],
  ])('should create car item key', (formData, result) => {
    expect(CarKilometersService.getCarKilometerKey(formData as CalcFormData)).toBe(result);
  });

  it('should enrich car data response', () => {
    expect(carKilometersService.enrichCarResponse(dataResponse)).toEqual({
      'off.-10.19.70': 798,
      'off.-10.19.140': 338,
      'on.10.21.80': 575,
      'on.10.21.130': 351,
    });
  });

  const domElm = createElementFromHTML<HTMLElement>(`<span id='test-km'></span>`);
  const carConfig = {
    domElm,
    id: 'test-km',
    dataUrl: '',
    data: {
      'off.-10.19.70': 798,
      'off.-10.19.140': 338,
      'on.10.21.80': 575,
      'on.10.21.130': 351,
    },
  };

  it.each([
    [carConfig, { kmh: 130, temp: 10, ac: 'on', wheelSize: 21 }, '351'],
    [carConfig, { kmh: 0, temp: 10, ac: 'on', wheelSize: 21 }, '-'],
    [{ ...carConfig, data: undefined }, { kmh: 0, temp: 10, ac: 'on', wheelSize: 21 }, '-'],
  ])('should update car KM dom', (carConfig, formData, result) => {
    carKilometersService.updateCarKilometer(carConfig, formData as CalcFormData);
    expect(domElm.innerText).toBe(result);
  });
});
