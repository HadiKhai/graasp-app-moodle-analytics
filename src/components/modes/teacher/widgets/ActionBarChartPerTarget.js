import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET } from './types';
import VerbBarChartPerTarget from './containers/VerbBarChartPerTarget';

const ActionBarChartPerTarget = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <VerbBarChartPerTarget />
      <KeyedDatePicker
        id={VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET}
        initialValue={initialState}
      />
    </div>
  );
};

export default ActionBarChartPerTarget;
