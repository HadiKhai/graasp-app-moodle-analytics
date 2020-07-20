import moment from 'moment';
import getComponentById from '../../../../../reducers/chartDataById';

export const DateOfCreation = (creationData) => {
  const {
    data: { importedData },
  } = creationData;

  const { timecreated } = importedData[0];

  return new Date(timecreated);
};

export const moodleData = (appIR) => {
  const moodle = [];

  appIR.forEach((e) => {
    const { type } = e;

    if (type === 'moodle_data') {
      moodle.push(e);
    }
  });

  return moodle;
};

export const fromDate = (chartDataById, id) => {
  if (chartDataById) {
    const componentByIdElement = getComponentById(chartDataById, id)[id];
    if (componentByIdElement) {
      return componentByIdElement.from;
    }
  }
  return undefined;
};

export const toDate = (chartDataById, id) => {
  if (chartDataById) {
    const componentByIdElement = getComponentById(chartDataById, id)[id];
    if (componentByIdElement) {
      return componentByIdElement.to;
    }
  }
  return undefined;
};

export const buildDateRange = (from, to) => {
  const dates = [];
  const fromTemp = new Date(from);
  const toTemp = new Date(to);
  while (fromTemp <= toTemp) {
    dates.push(fromTemp.toLocaleDateString());
    fromTemp.setDate(fromTemp.getDate() + 1);
  }
  return dates;
};

export const Occurrence = (actions, property, attributes) => {
  const data = [];
  let condition = [];
  if (attributes) {
    condition = attributes;
  }
  actions.forEach((action) => {
    let entry = action[property];

    if (property === 'createdAt' || property === 'date') {
      entry = entry.slice(0, 10);
    }

    if (entry && !data.includes(entry) && !condition.includes(entry)) {
      data.push(entry);
    }
  });

  data.sort();

  return data;
};

export const createDataForBarChart = (key, value, property) => {
  const data = [];
  key.forEach((e) => {
    const Obj = {};
    Obj[property] = e;

    value.forEach((v) => {
      Obj[v] = 0;
    });

    data.push(Obj);
  });

  return data;
};

export const changeDateFormat = (date) => {
  return moment(date).format('DD/MM');
};

export const changeDateFormatForBarChart = (arr) => {
  const newArr = [...arr];

  newArr.forEach((e) => {
    const { date } = e;

    e.date = changeDateFormat(date);
  });
  return newArr;
};

export const changeDateFormatForArray = (arr) => {
  const temp = [];

  arr.forEach((e) => {
    temp.push(changeDateFormat(new Date(e)));
  });
  return temp;
};
export const nbOfTicks = (
  arrayOfTickValues,
  arrayOfBreakpoints,
  windowsSize,
) => {
  let tick = 0;

  for (let i = arrayOfBreakpoints.length; i >= 0; i -= 1) {
    if (windowsSize <= arrayOfBreakpoints[i]) {
      tick = arrayOfTickValues[i];
    }
  }

  return tick;
};

export const fillDataForBarChart = (actions, dataFormat) => {
  const data = dataFormat;
  actions.forEach((e) => {
    const { timecreated, action } = e;
    const correspondingObject = data.find(
      (obj) => obj.date === new Date(timecreated).toLocaleDateString(),
    );

    if (action && correspondingObject) {
      correspondingObject[action] += 1;
    }
  });
  return data;
};

export const combineContents = (listOfContent) => {
  const updatedContentList = [];
  listOfContent.map((content) => {
    content.data.importedData.map((action) => updatedContentList.push(action));
    return updatedContentList;
  });
  return updatedContentList;
};
