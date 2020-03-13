const axios = require('axios').default
const cheerio = require('cheerio')
const DatabaseHelper = require('./db')

const url = "https://www.worldometers.info/coronavirus"


function buildObject(headers, values) {
    const result = values.reduce((previousValue, currentValue, currentIndex) => {
        previousValue[headers[currentIndex]] = currentValue
        return previousValue
    }, {})

    return result
}

function parseResponse(response) {
    // prepare database
    let database = new DatabaseHelper()
    database.clear()

    // load response
    let $ = cheerio.load(response.data)

    // parse table header
    let headers = []
    let headerSelector = $('thead', '#main_table_countries').first()
    $(headerSelector).find('th').each((i, element) => {
        headers[i] = $(element).text()
    })

    // parse table row
    let data = []
    let selectorResult = $('tbody', '#main_table_countries').first()
    $(selectorResult).find('td').each((i, element) => {
        let value = $(element).text().trim().replace('+', '').replace(',', '')
        value = value === "" ? "0" : value
        data.push(value)

        let index = i % headers.length
        if (index == headers.length - 1) {
            database.insert(buildObject(headers, data))
            data = []
        }
    })
}

axios.get(url)
    .then((response) => {
        // console.log(response)
        parseResponse(response)
    })
    .catch((error) => {
        console.log(error)
    })