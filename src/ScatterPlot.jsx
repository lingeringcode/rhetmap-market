import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import Chart from "./Chart/Chart"
import Line from "./Chart/Line"
import Circles from "./Chart/Circles"
import Axis from "./Chart/Axis"
import { useChartDimensions, accessorPropsType } from "./Chart/utils"
import { tooltipContext } from "./utils/useTooltip"

const formatDate = d3.timeFormat("%b/%d/%Y")
const getYear = d3.timeFormat("%Y")

const ScatterPlot = ({ data, xAccessor, yAccessor, xLabel, yLabel }) => {

  const { tooltip, setTooltip } = useContext(tooltipContext)
  
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  })

  const latestYearData = []
  data.forEach(d => {
    const year = (d.date).slice(-4)
    if (year == "2021") {
      latestYearData.push(d)
    }
  })
   
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  const writeMeanData = async () => {

    const weeks = [...Array(18).keys()].splice(1,)
    const weekMeanData = []
    const selectData = await goWeeklyData(data, weeks);

  };

  const goWeeklyData = async (data, weeks) => {
    weeks.forEach(w => {
      getWeeklyData(data, w)
    })

    return newData
  }

  const getWeeklyData = async (data, w) => {
    const wData = await data.map(d => {
      if (d.week = w) {
        return d.postings
      }
    })

    console.log(wData)

    return wData
  }

  console.log(tooltip)
  
  return (
    <div className="ScatterPlot" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          // formatTick={formatDate}
          label={xLabel}
        />
        <Axis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label={yLabel}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          xScale={xScale}
          yScale={yScale}
          setTooltip={setTooltip}
          tooltip={tooltip}
        />
        <Line
          data={latestYearData}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
      
    </div>
  )
}

ScatterPlot.propTypes = {
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
}

ScatterPlot.defaultProps = {
  xAccessor: d => d.x,
  yAccessor: d => d.y,
}
export default ScatterPlot
