import React, { useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import ScatterPlot from "./ScatterPlot"
import { useTooltip, tooltipContext } from "./utils/useTooltip"
import "./styles.css"

// Data accessor methods
const parseDate = d3.timeParse("%m/%d/%Y")
const dateAccessor = d => parseDate(d.date)
const weekAccessor = d => d.week
const jobPostingsAccessor = d => d.postings

const App = () => {

  // Instantiate the API data
  const [weekData, setRhetMapDataState] = useState([])

  // Get and set the API data
  useEffect(() => { getRhetMapData() }, [])

  const getRhetMapData = async () => {
    const response = await fetch('/api');
    const jsonData = await response.json();
    setRhetMapDataState(jsonData)
    
  };

  const transformRMD = async (data) => {

    const newData = await data.map(d => {
      let rObj = {}
      rObj['week'] = d.week
      rObj['postings'] = d.postings
      return rObj
    })

    console.log(newData)

    return newData
  }

  const state = useTooltip()

  return (
    <div className="App">
      <h1>
        Rhetmap Job-Market Comparison Dashboard
      </h1>
      <div className="App__charts">
        <tooltipContext.Provider value={state}>
          <ScatterPlot 
            data={weekData}
            xAccessor={weekAccessor}
            yAccessor={jobPostingsAccessor}
            xLabel="Week"
            yLabel="Job Postings"
          />
        </tooltipContext.Provider>
      </div>
    </div>
  )
}

export default App