import { UPDATE_CHART_DATE_BY_ID } from '../types';

const updateDateById = (from, to, id) => (dispatch) =>
  dispatch({
    type: UPDATE_CHART_DATE_BY_ID,
    payload: {
      from,
      to,
    },
    key: id,
  });

export default updateDateById;
