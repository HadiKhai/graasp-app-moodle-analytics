export const xTickValues = (values, tickCount) => {
  const temp = [];
  const l = values.length;
  let step = l / tickCount;
  step = Math.ceil(step);
  if (l > tickCount) {
    if (step > 0) {
      for (let i = 0; i < l; i += step) {
        temp.push(values[i]);
      }
    }

    return temp;
  }
  return values;
};

// const tickValueY = data => {
//   const Max = [];
//
//   data.forEach(entry => {
//     Max.push(
//       Math.max(
//         ...entry.data.map(o => {
//           return o.y;
//         }),
//       ),
//     );
//   });
//
//   return Array.from(Array(Math.max(...Max) + 1).keys());
// };

export const HEIGHT = 400;
export const WIDTH = '100%';
export const MARGIN = { top: 50, right: 110, bottom: 60, left: 60 };
export const X_AXIS = (legend, values, tickCount) => ({
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: `${legend}`,
  legendPosition: 'middle',
  legendOffset: 45,
  tickValues: xTickValues(values, tickCount),
});

export const Y_AXIS = (legend, data) => {
  if (legend && data) {
    return {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: `${legend}`,
      legendOffset: -40,
      legendPosition: 'middle',
      // tickValues: tickValueY(data),
    };
  }
  return {
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: `${legend}`,
    legendOffset: -40,
    legendPosition: 'middle',
  };
};
