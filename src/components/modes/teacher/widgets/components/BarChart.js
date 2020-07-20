import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import Loader from '../../../../common/Loader';
import { HEIGHT, X_AXIS, Y_AXIS } from '../../../chartDesign';

const BarChart = ({
  data,
  keys,
  colors,
  indexBy,
  yAxis,
  xAxis,
  id,
  values,
  maxTicks,
}) => {
  const [size, setSize] = useState(0);
  function updateSize() {
    if (document.getElementById(id)) {
      const height = document.getElementById(id).clientHeight;
      if (height > 0) {
        setSize(height);
      }
    }
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (document.getElementById(id)) {
    const height = document.getElementById(id).clientHeight;
    if (height !== size && height > 0) {
      updateSize();
    }
  }

  if (data.length > 0 && keys.length > 0) {
    return (
      <div style={{ height: HEIGHT - size, width: '100%' }}>
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy={indexBy}
          margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
          padding={0.05}
          colors={(bar) => colors[bar.id]}
          groupMode="grouped"
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={X_AXIS(xAxis, values, maxTicks)}
          axisLeft={Y_AXIS(yAxis)}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#ffffff',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#ffffff',
              rotation: 32,
              lineWidth: 4,
              spacing: 7,
            },
          ]}
          fill={[
            {
              match: {
                id: 'changeAvg',
              },
              id: 'dots',
            },
            {
              match: {
                id: 'navigateAvg',
              },
              id: 'dots',
            },

            {
              match: {
                id: 'createAvg',
              },
              id: 'dots',
            },

            {
              match: {
                id: 'openAvg',
              },
              id: 'dots',
            },
          ]}
          enableLabel={false}
          labelSkipWidth={6}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              data: keys.map((key) => {
                return {
                  id: key,
                  label: key,
                  color: colors[key],
                };
              }),
              dataFrom: 'keys',
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 121,
              translateY: 0,
              itemWidth: 84,
              itemHeight: 20,
              itemsSpacing: 11,
              symbolSize: 22,
              itemDirection: 'left-to-right',
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                    itemBackground: '#eee',
                  },
                },
              ],
            },
          ]}
          animate
          motionStiffness={200}
          motionDamping={50}
        />
      </div>
    );
  }

  return <Loader />;
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.instanceOf(Object).isRequired,
  indexBy: PropTypes.string.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  id: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxTicks: PropTypes.number.isRequired,
};

BarChart.defaultProps = {
  id: '',
};
export default BarChart;
