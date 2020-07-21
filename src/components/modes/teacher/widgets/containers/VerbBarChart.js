import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  buildDateRange,
  combineContents,
  fromDate,
  toDate,
  createDataForBarChart,
  fillDataForBarChart,
  changeDateFormatForArray,
  nbOfTicks,
  changeDateFormatForBarChart,
} from '../util';
import { DATE, VERB_BAR_CHART_DAT_PICKER_ID } from '../types';

const colors = {
  created: '#decaff',
  assigned: '#BBAAFF',
  viewed: '#988BFF',
  started: '#756DF4',
  shown: '#decaff',
  ended: '#BBAAFF',
  updated: '#988BFF',
  uploaded: '#756DF4',
};

const xAxis = DATE;
const yAxis = 'Occurrence';

const allowedVerbs = [
  'created',
  'assigned',
  'viewed',
  'started',
  'ended',
  'updated',
  'shown',
  'uploaded',
];
const VerbBarChart = (content, from, to) => {
  const dateRange = buildDateRange(from, to);
  let data = combineContents(content);
  const formattedData = createDataForBarChart(dateRange, allowedVerbs, DATE);
  data = fillDataForBarChart(data, formattedData);
  data = changeDateFormatForBarChart(data);
  return data;
};

const mapStateToProps = ({
  appInstanceResources: { content },
  chartDataById,
  windowSize: { windowSize },
}) => {
  return {
    data: VerbBarChart(
      content,
      fromDate(chartDataById, VERB_BAR_CHART_DAT_PICKER_ID),
      toDate(chartDataById, VERB_BAR_CHART_DAT_PICKER_ID),
    ),
    keys: allowedVerbs,
    colors,
    indexBy: DATE,
    xAxis,
    yAxis,
    values: changeDateFormatForArray(
      buildDateRange(
        fromDate(chartDataById, VERB_BAR_CHART_DAT_PICKER_ID),
        toDate(chartDataById, VERB_BAR_CHART_DAT_PICKER_ID),
      ),
    ),
    maxTicks: nbOfTicks([4, 7, 12], [800, 1200, 1920], windowSize),
  };
};

export default connect(mapStateToProps)(BarChart);
