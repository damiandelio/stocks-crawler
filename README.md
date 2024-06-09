## Run
```
node index.mjs
```


## Nasdaq

https://www.nasdaq.com/market-activity/index/spx/historical?page=1&rows_per_page=25&timeline=y14

https://www.nasdaq.com/market-activity/index/spx/historical?page=1&rows_per_page=1000000&timeline=y14

### API

Type: __index__

https://api.nasdaq.com/api/quote/SPX/historical?assetclass=index&fromdate=2014-06-07&todate=2024-06-07&limit=9999999

Type: __stocks__

https://api.nasdaq.com/api/quote/AAL/historical?assetclass=stocks&fromdate=2014-06-07&todate=2024-06-07&limit=9999999

Type: __crypto__

https://api.nasdaq.com/api/quote/BTC/historical?assetclass=crypto&fromdate=2014-06-07&todate=2024-06-07&limit=9999999


## Investing.com (crypto)

https://www.investing.com/crypto/ethereum/historical-data

### API

https://api.investing.com/api/financialdata/historical/1061443?start-date=2010-01-01&end-date=2024-06-07&time-frame=Daily&add-missing-rows=false

Should include the `headers` to call the API:
```javascript
const response = await fetch(
    `https://api.investing.com/api/financialdata/historical/1061443?start-date=2010-01-01&end-date=2024-06-07&time-frame=Daily&add-missing-rows=false`,
    { headers: { "Domain-Id": "www" } }
  );

  const data = await response.json();
```


## CoinMarketCap (crypto)

https://coinmarketcap.com/currencies/bitcoin/historical-data/

### API

https://api.coinmarketcap.com/data-api/v3.1/cryptocurrency/historical?id=1&convertId=2781&timeStart=1712534400&timeEnd=1717891200&interval=1d

https://api.coinmarketcap.com/data-api/v3.1/cryptocurrency/historical?id=1&timeStart=1262314800&timeEnd=1717729200&interval=1d

`id=1` is Bitcoin.

How to get `timeStart` and `timeEnd`:
```javascript
const dtStr = "2010-01-01"; // yyyy-mm-dd
const [y, m, d] = dtStr.split(/-|\//); // splits "2010-01-01" or "2010/01/01"
const date = new Date(y, m - 1, d);
const timestamp = date.getTime();
const trimedTimestamp = timestamp.toString().slice(0, -3) // removes last 3 chars.

console.log(trimedTimestamp);
```


## Get the list of S&P 500 symbols
https://stockanalysis.com/list/sp-500-stocks/

Run this inside the page's console:

```javascript
Array.from(document.querySelectorAll('.sym')).map((el) => el.firstChild.innerHTML).filter(item => item)
```


## Get list of top 50 popular Crypto symbols
https://crypto.com/price

```javascript
// TODO...
```
