# api-coronavirus
Simple Coronavirus info updates API from [Wordlometers](https://worldometers.info/coronavirus), created with Express, Cheerio, and Lowdb.

### installation
- install required packages with your fav package manager, for **npm** use `npm install`
- run `node /src/scrape_data.js` to fetch data from [Wordlometers](https://worldometers.info/coronavirus) and save to local lowdb database
- serve the API by issuing `npm start`

### usage
- just send a http GET request to your server address (or just localhost) using port 8080
- response will looks like this

```
[
    {
        "Country,Other": "China",
        "TotalCases": "80814",
        "NewCases": "21",
        "TotalDeaths": "3177",
        "NewDeaths": "8",
        "TotalRecovered": "64113",
        "ActiveCases": "13524",
        "Serious,Critical": "4257",
        "Tot Cases/1M pop": "56.1"
    },
    ...
  ]
```

### info
- the data from [Wordlometers](https://worldometers.info/coronavirus) is updated once a day at 00.00 GMT+0, so we just need to re-fetch data once a day
- don't use the data directly without using local database to serve the API, it can flood the website if the request is high
