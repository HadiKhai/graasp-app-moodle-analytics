import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';

const ActionBarChart = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <KeyedDatePicker
        id="VERB_BAR_CHART_DAT_PICKER_ID"
        initialValue={initialState}
      />
    </div>
  );
};

export default ActionBarChart;
