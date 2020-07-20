import { UPDATE_CHART_LEGEND_BY_ID } from '../types';

const updateLegendById = (payload = [], id) => (dispatch) =>
  dispatch({
    type: UPDATE_CHART_LEGEND_BY_ID,
    payload,
    key: id,
  });

export default updateLegendById;
