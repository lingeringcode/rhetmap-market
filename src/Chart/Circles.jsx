import React from "react"
import PropTypes from "prop-types"
import { accessorPropsType } from "./utils"

const Tooltip = ({ x, y, info }) => (
  <foreignObject x={x - 75} y={y - 70} width={250} height={50}>
    <div id="tooltip" className="tooltip">
      <p>
        In week {info.week} {info.year}, there were {info.postings} posts.
      </p>
    </div>
  </foreignObject>
);

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius, tooltip, setTooltip, xScale, yScale }) => (
  
  <React.Fragment>
    {data.map((d, i) => (
      <circle
        className="Circles__circle"
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == "function" ? radius(d) : radius}
        onMouseOver={() => setTooltip(d)}
        onMouseOut={() => setTooltip(false)}
      />
    ))}
    {tooltip && (
      <Tooltip
        x={xScale(tooltip.week)}
        y={yScale(tooltip.postings)}
        info={tooltip}
      />
    )}
    
  </React.Fragment>
)

Circles.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  radius: accessorPropsType,
}

Circles.defaultProps = {
  radius: 3,
}

export default Circles
