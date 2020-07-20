import { UPDATE_WINDOW_SIZE } from '../types';

const updateWindowSize = (windowSize) => (dispatch) =>
  dispatch({
    type: UPDATE_WINDOW_SIZE,
    windowSize,
  });

export default updateWindowSize;
