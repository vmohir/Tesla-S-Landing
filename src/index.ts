const car100D: string = require('./data/metric-100D.json');
const carP100D: string = require('./data/metric-P100D.json');

type CarBrands = '100D' | 'P100D';
interface CarData {
  temp: number;
  ac: 'on' | 'off';
  wheelsize: number;
  hwy: { kmh: number; kilometers: number }[];
}

function getCarDataItemKey(ac: 'on' | 'off', temp: number, wheelsize: number, kmh: number) {
  return `${ac}.${temp}.${wheelsize}.${kmh}`;
}

async function getCarData(carName: CarBrands) {
  const carDataUrl = { '100D': car100D, P100D: carP100D }[carName];

  try {
    const data = (await (await fetch(carDataUrl)).json()) as CarData[];
    return data.reduce<{ [key: string]: number }>(
      (res, { ac, temp, hwy, wheelsize }) => ({
        ...res,
        ...hwy.reduce(
          (innerResult, { kmh, kilometers }) => ({
            ...innerResult,
            [getCarDataItemKey(ac, temp, wheelsize, kmh)]: kilometers,
          }),
          {},
        ),
      }),
      {},
    );
  } catch (e) {
    throw e;
  }
}

Promise.all([getCarData('100D'), getCarData('P100D')]).then((carsData) => {
  console.log('#ee data', carsData);
  const car100DValueElm = document.getElementById('100d-km');
  const carP100DValueElm = document.getElementById('p100d-km');

  setupFormHandler();

  function getFormData(form: HTMLFormElement) {
    const formData = new FormData(form);
    return {
      wheelSize: parseInt(formData.get('wheelsize') as string, 10) as CalcFormData['wheelSize'],
      ac: formData.get('ac') === 'on' ? ('on' as const) : ('off' as const),
      kmh: parseInt(formData.get('kmh') as string, 10),
      temp: parseInt(formData.get('temp') as string, 10),
    };
  }
  function setupFormHandler() {
    const calcForm = document.getElementById('range-calculator-form');
    if (!calcForm || !(calcForm instanceof HTMLFormElement)) return;

    handleFormChanges(calcForm);
    calcForm.addEventListener('change', (e) => {
      handleFormChanges(calcForm);
    });
  }

  interface CalcFormData {
    ac: 'on' | 'off';
    temp: number;
    kmh: number;
    wheelSize: 19 | 21;
  }

  function handleFormChanges(calcForm: HTMLFormElement) {
    const formData = getFormData(calcForm);
    updateCarKilometers(formData);
  }

  function updateCarKilometers(formData: CalcFormData) {
    const result = carsData.map((car) => {
      return car[getCarDataItemKey(formData.ac, formData.temp, formData.wheelSize, formData.kmh)];
    });
    console.log('#ee result', result);

    if (!car100DValueElm || !carP100DValueElm) {
      return; // todo handle it
    }

    car100DValueElm.innerText = result[0].toString();
    carP100DValueElm.innerText = result[1].toString();
  }
});
