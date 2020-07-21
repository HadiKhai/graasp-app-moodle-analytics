import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  buildDateRange,
  combineContents,
  fromDate,
  toDate,
  createDataForBarChart,
  changeDateFormatForArray,
  nbOfTicks,
  Occurrence,
  fillDataForBarChartPerTarget,
} from '../util';
import { TARGET, VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET } from '../types';

const colors = {
  course: '#decaff',
  course_module: '#BBAAFF',
  discussion: '#988BFF',
  course_section: '#756DF4',
};

const xAxis = TARGET;
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

const allowedTargets = [
  'course',
  'course_module',
  'discussion',
  'course_section',
];
const VerbBarChartPerTarget = (content, from, to) => {
  const dateRange = buildDateRange(from, to);
  let data = combineContents(content);
  const targetList = Occurrence(data, TARGET, allowedTargets);
  const formattedData = createDataForBarChart(targetList, allowedVerbs, [
    TARGET,
  ]);
  data = fillDataForBarChartPerTarget(data, formattedData, dateRange);
  return data;
};

const mapStateToProps = ({
  appInstanceResources: { content },
  chartDataById,
  windowSize: { windowSize },
}) => {
  return {
    data: VerbBarChartPerTarget(
      content,
      fromDate(chartDataById, VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET),
      toDate(chartDataById, VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET),
    ),
    keys: allowedTargets,
    colors,
    indexBy: TARGET,
    xAxis,
    yAxis,
    values: changeDateFormatForArray(
      buildDateRange(
        fromDate(chartDataById, VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET),
        toDate(chartDataById, VERB_LINE_CHART_DAY_PICKER_ID_PER_TARGET),
      ),
    ),
    maxTicks: nbOfTicks([4, 7, 12], [800, 1200, 1920], windowSize),
  };
};

export default connect(mapStateToProps)(BarChart);
