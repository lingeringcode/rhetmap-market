import * as d3 from "d3"

const randomAroundMean = (mean, deviation) => mean + boxMullerRandom() * deviation

const boxMullerRandom = () => (
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random())
)

const today = new Date()
const formatDate = d3.timeFormat("%m/%d/%Y")

export const getTimelineData = (length = 100) => {
  let lastTemperature = randomAroundMean(70, 20)
  const firstTemperature = d3.timeDay.offset(today, -length)

  return new Array(length).fill(0).map((d, i) => {
    lastTemperature += randomAroundMean(0, 2)
    return {
      date: formatDate(d3.timeDay.offset(firstTemperature, i)),
      temperature: lastTemperature,
    }
  })
}

export const getScatterData = (count = 100) => (
  new Array(count).fill(0).map((d, i) => ({
    temperature: randomAroundMean(70, 20),
    humidity: randomAroundMean(0.5, 0.1),
  }))
)

export const getJobData = () => {
  return [
      {
          "week": "1",
          "postings": "68"
      },
      {
          "week": "2",
          "postings": "83"
      },
      {
          "week": "3",
          "postings": "95"
      },
      {
          "week": "4",
          "postings": "113"
      },
      {
          "week": "5",
          "postings": "123"
      },
      {
          "week": "6",
          "postings": "134"
      },
      {
          "week": "7",
          "postings": "149"
      },
      {
          "week": "8",
          "postings": "155"
      },
      {
          "week": "9",
          "postings": "167"
      },
      {
          "week": "10",
          "postings": "176"
      },
      {
          "week": "11",
          "postings": "184"
      },
      {
          "week": "12",
          "postings": "193"
      },
      {
          "week": "13",
          "postings": "196"
      },
      {
          "week": "14",
          "postings": "198"
      },
      {
          "week": "15",
          "postings": "201"
      },
      {
          "week": "16",
          "postings": "205"
      },
      {
          "week": "17",
          "postings": "205"
      }
  ]
}
