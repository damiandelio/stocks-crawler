import fs from "fs";

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
  return `output/api_cache_json/${assetclass}/${symbol}.json`;
}

function getCsvFilePath(assetclass, symbol) {
  return `output/csv/${assetclass}/${symbol}.csv`;
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

export async function fetchAllSymbols(symbols, options) {
  // Create the folder to store the files.
  fs.mkdirSync(`./output/api_cache_json/${options.assetclass}`, {
    recursive: true,
  });

  const fetchPromises = symbols.map((symbol) => fetchAndSave(symbol, options));
  await Promise.all(fetchPromises);
}

export async function generateAllCSVs(symbols, options) {
  // Create the folder to store the files.
  fs.mkdirSync(`./output/csv/${options.assetclass}`, { recursive: true });

  for (let symbol of symbols) {
    await generateAndSaveCSV(symbol, options);
  }
}

export async function genetateCombinedCsv(
  symbols,
  { assetclass, outputFileName }
) {
  const outputFile = `output/csv/${outputFileName}.csv`;
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
