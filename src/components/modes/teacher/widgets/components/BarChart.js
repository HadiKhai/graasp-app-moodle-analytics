import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import { BoxLegendSvg } from '@nivo/legends';
import _ from 'lodash';
import Loader from '../../../../common/Loader';
import { HEIGHT, MARGIN, WIDTH, X_AXIS, Y_AXIS } from '../../../chartDesign';

const BarChart = ({
  data,
  keys,
  colors,
  indexBy,
  xAxis,
  yAxis,
  values,
  maxTicks,
}) => {
  console.log(data, keys, indexBy);
  const [hiddenKeys, setHiddenKeys] = useState([]);

  const toggle = (d) => {
    let hidden = hiddenKeys;
    if (hiddenKeys.includes(d.id)) {
      hidden = hidden.filter((e) => e !== d.id);
      setHiddenKeys(hidden);
    } else {
      hidden = [...hidden, d.id];
      hidden.sort((a, b) => (a > b ? 1 : -1));
      setHiddenKeys(hidden);
    }
  };

  const customLegend = (d) => {
    const { bars, height, width, fill } = d;

    const keysProperties = [];

    if (keys.length > 0) {
      keys.forEach((key) => {
        const Obj = {};
        Obj.id = key;
        Obj.label = key;
        Obj.color = colors[key];
        Obj.itemTextColor = 'white';
        keysProperties.push(Obj);
      });
      fill.forEach((e) => {
        const { match } = e;
        const correspondingObject = keysProperties.find(
          (obj) => obj.id === match.id,
        );
        correspondingObject.fill = `url(#${e.id}.bg.${colors[match.id]}`;
      });
    }
    hiddenKeys.forEach((hiddenKey) => {
      const correspondingObject = keysProperties.find(
        (obj) => obj.id === hiddenKey,
      );
      correspondingObject.color = 'grey';
      // correspondingObject = _.pick(correspondingObject,['id','label','color'])
      delete correspondingObject.fill;
    });

    bars.sort((a, b) => (a.key > b.key ? 1 : -1));
    const legend = {
      data: keysProperties.reverse(),
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
      onClick: toggle,
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000',
            itemBackground: '#eee',
          },
        },
      ],
    };

    return (
      <>
        <BoxLegendSvg
          data={legend.data}
          dataFrom={legend.dataFrom}
          anchor={legend.anchor}
          direction={legend.direction}
          justify={legend.justify}
          translateX={legend.translateX}
          translateY={legend.translateY}
          itemWidth={legend.itemWidth}
          itemHeight={legend.itemHeight}
          itemsSpacing={legend.itemsSpacing}
          symbolSize={legend.symbolSize}
          itemDirection={legend.itemDirection}
          symbolShape={legend.symbolShape}
          onClick={legend.onClick}
          effects={legend.effects}
          containerHeight={height}
          containerWidth={width}
        />
      </>
    );
  };

  if (data.length > 0 && keys && colors && indexBy) {
    return (
      <div style={{ height: HEIGHT, width: WIDTH }}>
        <ResponsiveBar
          data={data}
          keys={_.difference(keys, hiddenKeys)}
          indexBy={indexBy}
          margin={MARGIN}
          padding={0.7}
          colors={(bar) => colors[bar.id]}
          groupMode="stacked"
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={X_AXIS(xAxis, values, maxTicks)}
          axisLeft={Y_AXIS(yAxis)}
          legends={[
            {
              data: keys.map((id) => {
                return {
                  id,

                  label: id,
                  color: colors[id],
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
              onClick: toggle,
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
          enableLabel={false}
          labelSkipWidth={6}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate
          motionStiffness={200}
          motionDamping={50}
          layers={['grid', 'bars', 'markers', 'axes', customLegend]}
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
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxTicks: PropTypes.number.isRequired,
};

export default BarChart;
