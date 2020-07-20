import React from 'react';
import Helmet from 'react-helmet';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import PropTypes from 'prop-types';

import Loader from '../../../../common/Loader';

const Calendar = ({ date }) => {
  const modifiers = {
    creationDay: new Date(date),
  };
  if (date) {
    return (
      <div>
        <Helmet>
          <style>
            {`
          .DayPicker-Day--creationDay {
            background-color: #00bcd4;
            color: white;
          }
          `}
          </style>
        </Helmet>
        <DayPicker numberOfMonths={4} fromMonth={date} modifiers={modifiers} />
      </div>
    );
  }

  return <Loader />;
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Calendar;
