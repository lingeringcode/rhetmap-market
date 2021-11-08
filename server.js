const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')
const {google} = require("googleapis")
require('dotenv').config()

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get("/api", async (req, res) => {

  // Create auth object
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GCS,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1PVz3wtuY6khdh8ASP6TJ0t_KgrV4BhCPPCwudeevqcI";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1"
  })
  
  function getNumberOfYears(y) {
    
    let length

    for(let yi = 2; yi <= y.length; yi++) {
      length = yi;
    }

    // Account for first 2 columns
    length = length - 2

    return length
  }

  let sheetData = getRows.data.values

  // Use assumptions from data to create per Year object array
  let numberOfYears = getNumberOfYears(sheetData[0])

  function getWeeklies(data, numYears) {

    let dataPerYear = []

    for (let i = 2; i <= numYears+1; i++) {

      dataPerYear.push(
      {
        year: data[0][i],
        week: Number(data[1][0]),
        date: data[1][1]+"/"+data[0][i],
        postings: Number(data[1][i])
      },
      {
        year: data[0][i],
        week: Number(data[2][0]),
        date: data[2][1]+"/"+data[0][i],
        postings: Number(data[2][i])
      },
      {
        year: data[0][i],
        week: Number(data[3][0]),
        date: data[3][1]+"/"+data[0][i],
        postings: Number(data[3][i])
      },
      {
        year: data[0][i],
        week: Number(data[4][0]),
        date: data[4][1]+"/"+data[0][i],
        postings: Number(data[4][i])
      },
      {
        year: data[0][i],
        week: Number(data[5][0]),
        date: data[5][1]+"/"+data[0][i],
        postings: Number(data[5][i])
      },
      {
        year: data[0][i],
        week: Number(data[6][0]),
        date: data[6][1]+"/"+data[0][i],
        postings: Number(data[6][i])
      },
      {
        year: data[0][i],
        week: Number(data[7][0]),
        date: data[7][1]+"/"+data[0][i],
        postings: Number(data[7][i])
      },
      {
        year: data[0][i],
        week: Number(data[8][0]),
        date: data[8][1]+"/"+data[0][i],
        postings: Number(data[8][i])
      },
      {
        year: data[0][i],
        week: Number(data[9][0]),
        date: data[9][1]+"/"+data[0][i],
        postings: Number(data[9][i])
      },
      {
        year: data[0][i],
        week: Number(data[10][0]),
        date: data[10][1]+"/"+data[0][i],
        postings: Number(data[10][i])
      },
      {
        year: data[0][i],
        week: Number(data[11][0]),
        date: data[11][1]+"/"+data[0][i],
        postings: Number(data[11][i])
      },
      {
        year: data[0][i],
        week: Number(data[12][0]),
        date: data[12][1]+"/"+data[0][i],
        postings: Number(data[12][i])
      },
      {
        year: data[0][i],
        week: Number(data[13][0]),
        date: data[13][1]+"/"+data[0][i],
        postings: Number(data[13][i])
      },
      {
        year: data[0][i],
        week: Number(data[14][0]),
        date: data[14][1]+"/"+data[0][i],
        postings: Number(data[14][i])
      },
      {
        year: data[0][i],
        week: Number(data[15][0]),
        date: data[15][1]+"/"+data[0][i],
        postings: Number(data[15][i])
      },
      {
        year: data[0][i],
        week: Number(data[16][0]),
        date: data[16][1]+"/"+data[0][i],
        postings: Number(data[16][i])
      },
      {
        year: data[0][i],
        week: Number(data[17][0]),
        date: data[17][1]+"/"+data[0][i],
        postings: Number(data[17][i])
      })
    }

    return dataPerYear
  }

  let dpy = getWeeklies(sheetData, numberOfYears)
 
  const dpyFiltered = []
  
  for (let ii = 0; ii <= dpy.length-1; ii++) {

    // let newWeeks = []

    // for (let i = 0; i <= dpy.length-1; i++) {

    if (dpy[ii].postings) {
      dpyFiltered.push(dpy[ii])
    }

    // }

    // dpyFiltered.push({
    //   year: dpy[ii].year,
    //   data: newWeeks
    // })

  }

  // Create JSON header and endpoint page
  res.setHeader('Content-Type', 'application/json')
  res.json(dpyFiltered)
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, 'favicon.ico'))
})
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8090, function(err) {

  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:8090/')
})