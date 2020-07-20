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
