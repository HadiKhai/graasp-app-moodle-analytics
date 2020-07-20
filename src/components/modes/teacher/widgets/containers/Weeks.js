import { connect } from 'react-redux';

import Calendar from '../components/Calendar';
import { DateOfCreation, moodleData } from '../util';

const WeekCalendar = (appIR) => {
  let date = new Date();

  const data = moodleData(appIR);

  if (appIR.length > 0) {
    date = DateOfCreation(data[0]);
  }
  return date;
};

const mapStateToProps = ({ appInstanceResources: { content } }) => ({
  date: WeekCalendar(content),
});

export default connect(mapStateToProps)(Calendar);
