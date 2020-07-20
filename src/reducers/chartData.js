import { UPDATE_CHART_DATE_BY_ID, UPDATE_CHART_LEGEND_BY_ID } from '../types';

const chartData = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_CHART_DATE_BY_ID:
      return { ...state, from: payload.from, to: payload.to };

    case UPDATE_CHART_LEGEND_BY_ID:
      return { ...state, payload };

    default:
      return state;
  }
};

export default chartData;
