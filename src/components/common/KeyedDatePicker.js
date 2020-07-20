import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import updateDateById from '../../actions/chartDataByID';
import 'react-day-picker/lib/style.css';

const flag = [];

const KeyedDatePicker = ({ id, initialValue }) => {
  const [from, setFrom] = useState(initialValue.from);
  const [fromPrev, setFromPrev] = useState(initialValue.from);
  const [to, setTo] = useState(initialValue.to);
  const [enteredTo, setEnteredTo] = useState(initialValue.to);
  const [modifiers, setModifiers] = useState({ start: from, end: enteredTo });
  const [selectedDays, setSelectedDays] = useState([
    from,
    { from, to: enteredTo },
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const PopId = open ? 'simple-popover' : undefined;

  const dispatch = useDispatch();
  useEffect(() => {
    if (from !== null) {
      setFromPrev(from);
    }
  }, [from]);
  if (!flag.includes(id)) {
    flag.push(id);

    dispatch(updateDateById(from, to, id));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSelectingFirstDay = (fromD, toD, day) => {
    const isBeforeFirstDay = fromD && DateUtils.isDayBefore(day, fromD);
    const isRangeSelected = fromD && toD;
    return !fromD || isBeforeFirstDay || isRangeSelected;
  };

  const setLastMonth = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    setFrom(lastMonth);
    setTo(today);
    setEnteredTo(today);
    dispatch(updateDateById(lastMonth, today, id));
    handleClose();
  };

  const setLastWeek = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);
    setFrom(lastWeek);
    setTo(today);
    setEnteredTo(today);
    dispatch(updateDateById(lastWeek, today, id));
    handleClose();
  };

  const setToday = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    setFrom(today);
    setTo(today);
    setEnteredTo(today);
    setModifiers({ start: today, end: today });
    setSelectedDays([today, { from: today, to: today }]);
    dispatch(updateDateById(today, today, id));
    handleClose();
  };

  const handleResetClick = () => {
    setFrom(null);
    setTo(null);
    setEnteredTo(null);
  };

  const handleDayClick = (day) => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    if (day > today) {
      return;
    }
    if (from && to && day >= from && day <= to) {
      handleResetClick();
      return;
    }
    if (isSelectingFirstDay(from, to, day)) {
      setFrom(day);
      setTo(null);
      setEnteredTo(null);
    } else {
      setTo(day);
      setEnteredTo(day);
      dispatch(updateDateById(from, day, id));
      handleClose();
    }
  };

  const handleDayMouseEnter = (day) => {
    const today = new Date();
    if (from && to) {
      return;
    }

    if (day > today) {
      setEnteredTo(today);
      return;
    }

    if (!isSelectingFirstDay(from, to, day)) {
      setEnteredTo(day);
    }
  };

  const prevWeek = () => {
    if (from.getDate() === to.getDate()) {
      const fromD = new Date(from);
      fromD.setDate(fromD.getDate() - 7);
      setFrom(fromD);
      dispatch(updateDateById(fromD, to, id));
    } else {
      const fromD = new Date(from);
      fromD.setDate(fromD.getDate() - 7);
      const toD = new Date(fromD.getDate() + 7);
      setFrom(fromD);
      setTo(toD);
      setEnteredTo(toD);
      dispatch(updateDateById(fromD, toD, id));
      handleClose();
    }
  };

  const nextWeek = () => {
    setFrom(from.getDate() + 7);
    setTo(to.getDate() + 7);
    setEnteredTo(to.getDate());
    dispatch(updateDateById(from, to, id));
    handleClose();
  };

  const toDate = () => {
    if (to !== null) {
      return moment(new Date(to)).format('DD/MM/YY');
    }
    return ' ';
  };

  const fromDate = () => {
    if (from !== null) {
      return moment(new Date(from)).format('DD/MM/YY');
    }
    return ' ';
  };

  const after = () => {
    const today = new Date();
    if (to !== null) {
      return to;
    }
    return today;
  };
  useEffect(() => {
    setModifiers({ start: from, end: enteredTo });
    setSelectedDays([from, { from, to: enteredTo }]);
  }, [from, enteredTo]);

  return (
    <div>
      <Box display="flex" justifyContent="center" mt={2} mx={5} px={3} pb={3}>
        <TextField
          aria-describedby={PopId}
          label="From"
          value={fromDate()}
          onClick={handleClick}
        />
        <TextField
          aria-describedby={PopId}
          label="To"
          value={toDate()}
          onClick={handleClick}
        />
      </Box>
      <Popover
        id={PopId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <Box display="flex">
            <Box mt={2} ml={1}>
              <Box
                display="flex"
                flexDirection="column"
                p={1}
                m={1}
                bgcolor="background.paper"
                justifyContent="center"
              >
                <Button onClick={setToday}>Today</Button>
                <Divider />

                <Button onClick={setLastWeek}>Last Week</Button>
                <Divider />

                <Button onClick={setLastMonth}>Last Month</Button>

                <Box
                  display="flex"
                  flexDirection="row"
                  p={1}
                  mt={2}
                  justifyContent="center"
                >
                  <IconButton aria-label="weekBefore" onClick={prevWeek}>
                    <UndoIcon />
                  </IconButton>
                  Weeks
                  <IconButton aria-label="weekAfter" onClick={nextWeek}>
                    <RedoIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box p={1} flexGrow={1}>
              <DayPicker
                month={fromPrev}
                className="Range"
                numberOfMonths={2}
                selectedDays={selectedDays}
                disabledDays={{
                  after: after(),
                  before: from,
                }}
                modifiers={modifiers}
                onDayClick={handleDayClick}
                onDayMouseEnter={handleDayMouseEnter}
              />
              <div>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
              </div>
              <Helmet>
                <style>
                  {`
                  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                  background-color:rgba(222,202,255,0.44) !important;
                  color: #988BFF;
                }
                  .Range .DayPicker-Day {
                  border-radius: 0 !important;
                }
                  .Range .DayPicker-Day--start {
                  border-top-left-radius: 50% !important;
                  border-bottom-left-radius: 50% !important;
                }
                  .Range .DayPicker-Day--end {
                  border-top-right-radius: 50% !important;
                  border-bottom-right-radius: 50% !important;
                }
                .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside){
                
                background-color: #5050d2 !important;
                }
                .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover{
                background-color: #5050d2 !important;

                }
                  `}
                </style>
              </Helmet>
            </Box>
          </Box>
        </div>
      </Popover>
    </div>
  );
};

KeyedDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  initialValue: PropTypes.instanceOf(Object).isRequired,
};

export default KeyedDatePicker;
