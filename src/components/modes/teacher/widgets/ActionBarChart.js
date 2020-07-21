import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import VerbBarChart from './containers/VerbBarChart';
import { VERB_BAR_CHART_DAT_PICKER_ID } from './types';

const ActionBarChart = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <VerbBarChart />
      <KeyedDatePicker
        id={VERB_BAR_CHART_DAT_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

export default ActionBarChart;
