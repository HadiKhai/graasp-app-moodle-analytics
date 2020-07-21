import { UPDATE_WINDOW_SIZE } from '../types';

export default (state = [], { type, windowSize }) => {
  if (type === UPDATE_WINDOW_SIZE) {
    return { ...state, windowSize };
  }
  return state;
};
