import fs from "fs";
import { SPX_LIST } from "./utils/spx_list.mjs";
import { CRYPTO_LIST } from "./utils/crypto_list.mjs";

function sanitizeNumericString(numStr) {
  // Replace all "$" and "," with an empty spaces.
  // Replace "N/A" with an empty space.
  return numStr.replace(/[$,]/g, "").replace("N/A", "");
}

function sanitizeDateString(dateStr) {
  // "2015/01/01" -> "2015-01-01"
  return dateStr.replaceAll("/", "-");
}

function getCacheFilePath(assetclass, symbol) {
  return `api_cache_json/${assetclass}/${symbol}.json`;
}

function getCsvFilePath(assetclass, symbol) {
  return `csv/${assetclass}/${symbol}.csv`;
}

async function fetchAndSave(symbol, { assetclass, fromdate, todate, limit }) {
  try {
    const response = await fetch(
      `https://api.nasdaq.com/api/quote/${symbol}/historical?assetclass=${assetclass}&fromdate=${fromdate}&todate=${todate}&limit=${limit}`
    );

    const data = await response.json();

    // Guardar la respuesta en un archivo JSON
    fs.writeFileSync(
      getCacheFilePath(assetclass, symbol),
      JSON.stringify(data, null, 2)
    );

    console.log(`Response from ${symbol} saved to ${symbol}.json`);
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
  }
}

async function generateAndSaveCSV(symbol, { assetclass }) {
  try {
    const data = fs.readFileSync(getCacheFilePath(assetclass, symbol), "utf8");
    const json = JSON.parse(data);

    let csv = "date,close,volume,open,high,low\n";

    for (let row of json.data.tradesTable.rows) {
      const date = sanitizeDateString(row.date);
      const close = sanitizeNumericString(row.close);
      const volume = sanitizeNumericString(row.volume);
      const open = sanitizeNumericString(row.open);
      const high = sanitizeNumericString(row.high);
      const low = sanitizeNumericString(row.low);

      csv += `${date},${close},${volume},${open},${high},${low}\n`;
    }

    fs.writeFileSync(getCsvFilePath(assetclass, symbol), csv);

    console.log(`Generated ${symbol}.csv file from ${symbol}.json`);
  } catch (error) {
    console.error(`Error genereting ${symbol}.csv:`, error);
  }
}

async function fetchAllSymbols(symbols, options) {
  const fetchPromises = symbols.map((symbol) => fetchAndSave(symbol, options));
  await Promise.all(fetchPromises);
}

async function generateAllCSVs(symbols, options) {
  for (let symbol of symbols) {
    await generateAndSaveCSV(symbol, options);
  }
}

async function genetateCombinedCsv(symbols, { assetclass, outputFileName }) {
  const outputFile = `csv/${outputFileName}.csv`;
  const csv_header = "symbol,date,close,volume,open,high,low\n";
  fs.writeFileSync(outputFile, csv_header);

  for (let symbol of symbols) {
    try {
      const data = fs.readFileSync(
        getCacheFilePath(assetclass, symbol),
        "utf8"
      );
      const json = JSON.parse(data);

      let csv = "";

      for (let row of json.data.tradesTable.rows) {
        const date = sanitizeDateString(row.date);
        const close = sanitizeNumericString(row.close);
        const volume = sanitizeNumericString(row.volume);
        const open = sanitizeNumericString(row.open);
        const high = sanitizeNumericString(row.high);
        const low = sanitizeNumericString(row.low);

        csv += `${symbol},${date},${close},${volume},${open},${high},${low}\n`;
      }

      fs.appendFileSync(outputFile, csv);

      console.log(`${symbol} added to ${outputFile}`);
    } catch (error) {
      console.error(`Error adding ${symbol} to ${outputFile}:`, error);
    }
  }
}

async function main() {
  {
    const options = {
      assetclass: "stocks",
      fromdate: "2010-01-01", // The API has a limit of 10 years.
      todate: "2024-06-07", // yyyy-mm-dd
      limit: 99999999,
    };

    await fetchAllSymbols(SPX_LIST, options); // Coment to not fetch.
    await generateAllCSVs(SPX_LIST, options);

    await genetateCombinedCsv(SPX_LIST, {
      assetclass: "stocks",
      outputFileName: "all_stocks_spx",
    });
  }

  {
    const options = {
      assetclass: "crypto",
      fromdate: "2010-01-01", // The API has a limit of 10 years.
      todate: "2024-06-07", // yyyy-mm-dd
      limit: 99999999,
    };

    await fetchAllSymbols(CRYPTO_LIST, options); // Coment to not fetch.
    await generateAllCSVs(CRYPTO_LIST, options);

    await genetateCombinedCsv(CRYPTO_LIST, {
      assetclass: "crypto",
      outputFileName: "all_top_crypto",
    });
  }
}

main();
