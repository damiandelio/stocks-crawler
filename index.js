const fs = require("fs");

const SPX_LIST = [
  "MSFT",
  "AAPL",
  "NVDA",
  "GOOGL",
  "GOOG",
  "AMZN",
  "META",
  "BRK.B",
  "LLY",
  "AVGO",
  "JPM",
  "TSLA",
  "V",
  "WMT",
  "XOM",
  "UNH",
  "MA",
  "PG",
  "COST",
  "JNJ",
  "ORCL",
  "MRK",
  "HD",
  "BAC",
  "ABBV",
  "CVX",
  "NFLX",
  "KO",
  "AMD",
  "PEP",
  "CRM",
  "QCOM",
  "TMO",
  "TMUS",
  "ADBE",
  "LIN",
  "WFC",
  "DHR",
  "ABT",
  "DIS",
  "MCD",
  "CSCO",
  "AMAT",
  "ACN",
  "TXN",
  "GE",
  "VZ",
  "AXP",
  "AMGN",
  "PFE",
  "PM",
  "CAT",
  "INTU",
  "MS",
  "IBM",
  "NEE",
  "CMCSA",
  "ISRG",
  "GS",
  "NKE",
  "MU",
  "UBER",
  "RTX",
  "NOW",
  "BX",
  "UNP",
  "HON",
  "SPGI",
  "SYK",
  "SCHW",
  "INTC",
  "COP",
  "T",
  "BKNG",
  "ETN",
  "LRCX",
  "ELV",
  "VRTX",
  "PGR",
  "LOW",
  "TJX",
  "C",
  "UPS",
  "BA",
  "ADI",
  "BLK",
  "BSX",
  "LMT",
  "MDT",
  "REGN",
  "CB",
  "KLAC",
  "MMC",
  "ADP",
  "PLD",
  "DE",
  "PANW",
  "CI",
  "ABNB",
  "ANET",
  "SBUX",
  "MDLZ",
  "AMT",
  "FI",
  "HCA",
  "SNPS",
  "CMG",
  "SO",
  "BMY",
  "GD",
  "ZTS",
  "GILD",
  "WM",
  "MO",
  "CDNS",
  "DUK",
  "APH",
  "CVS",
  "CL",
  "ICE",
  "MCK",
  "SHW",
  "MCO",
  "TDG",
  "TT",
  "CME",
  "ITW",
  "EQIX",
  "FCX",
  "PYPL",
  "BDX",
  "NXPI",
  "CTAS",
  "EOG",
  "ECL",
  "TGT",
  "PH",
  "MAR",
  "NOC",
  "CSX",
  "SLB",
  "CEG",
  "APD",
  "WELL",
  "PNC",
  "MSI",
  "EMR",
  "MPC",
  "AON",
  "FDX",
  "USB",
  "ROP",
  "RSG",
  "PSX",
  "MRNA",
  "ORLY",
  "CARR",
  "PCAR",
  "MMM",
  "AJG",
  "MNST",
  "COF",
  "EW",
  "OXY",
  "GM",
  "CPRT",
  "NSC",
  "HLT",
  "VLO",
  "AFL",
  "AIG",
  "MCHP",
  "MET",
  "WMB",
  "SPG",
  "TRV",
  "TFC",
  "ROST",
  "PSA",
  "AZO",
  "SRE",
  "F",
  "DLR",
  "JCI",
  "COR",
  "KDP",
  "ADSK",
  "AEP",
  "NEM",
  "O",
  "DHI",
  "DXCM",
  "OKE",
  "STZ",
  "TEL",
  "FTNT",
  "HES",
  "KMB",
  "BK",
  "SMCI",
  "GEV",
  "PAYX",
  "GWW",
  "CCI",
  "KMI",
  "ALL",
  "EL",
  "D",
  "FIS",
  "URI",
  "LEN",
  "HUM",
  "AMP",
  "PRU",
  "LHX",
  "KHC",
  "IDXX",
  "IQV",
  "OTIS",
  "CHTR",
  "RCL",
  "HSY",
  "PWR",
  "YUM",
  "AME",
  "DOW",
  "MSCI",
  "A",
  "NUE",
  "PCG",
  "LULU",
  "GIS",
  "KR",
  "ACGL",
  "VRSK",
  "CNC",
  "CMI",
  "CTVA",
  "ODFL",
  "MPWR",
  "FAST",
  "EA",
  "PEG",
  "SYY",
  "EXC",
  "IR",
  "HPQ",
  "KVUE",
  "GEHC",
  "HWM",
  "MLM",
  "FANG",
  "NDAQ",
  "IT",
  "LVS",
  "DD",
  "XYL",
  "BIIB",
  "CTSH",
  "VMC",
  "DAL",
  "FICO",
  "ED",
  "GLW",
  "BKR",
  "GRMN",
  "EXR",
  "DFS",
  "LYB",
  "CSGP",
  "ON",
  "RMD",
  "MTD",
  "XEL",
  "ADM",
  "HAL",
  "CDW",
  "PPG",
  "HIG",
  "VICI",
  "DVN",
  "VST",
  "TSCO",
  "ROK",
  "EFX",
  "WAB",
  "FSLR",
  "EIX",
  "ANSS",
  "TTWO",
  "AVB",
  "DG",
  "EBAY",
  "DECK",
  "CBRE",
  "CHD",
  "TRGP",
  "WTW",
  "HPE",
  "TROW",
  "BRO",
  "FTV",
  "WEC",
  "IFF",
  "IRM",
  "AWK",
  "NTAP",
  "GPN",
  "RJF",
  "FITB",
  "EQR",
  "MTB",
  "VLTO",
  "WDC",
  "DOV",
  "CAH",
  "DLTR",
  "KEYS",
  "NVR",
  "PHM",
  "BR",
  "ZBH",
  "DTE",
  "ETR",
  "WST",
  "ROL",
  "STT",
  "STE",
  "FE",
  "APTV",
  "TER",
  "INVH",
  "WY",
  "BALL",
  "AXON",
  "PPL",
  "CCL",
  "PTC",
  "LYV",
  "SBAC",
  "BF.B",
  "ES",
  "CTRA",
  "WRB",
  "TYL",
  "K",
  "WBD",
  "GPC",
  "STX",
  "VTR",
  "ARE",
  "STLD",
  "HUBB",
  "LDOS",
  "TSN",
  "HBAN",
  "CNP",
  "ALGN",
  "BBY",
  "AEE",
  "COO",
  "PFG",
  "TDY",
  "MKC",
  "ULTA",
  "AVY",
  "CPAY",
  "CBOE",
  "CINF",
  "MOH",
  "ILMN",
  "CMS",
  "VRSN",
  "WAT",
  "DPZ",
  "EQT",
  "BLDR",
  "OMC",
  "DRI",
  "EXPD",
  "SYF",
  "UAL",
  "J",
  "HOLX",
  "ATO",
  "ESS",
  "RF",
  "BAX",
  "NTRS",
  "HRL",
  "ENPH",
  "L",
  "EG",
  "LUV",
  "LH",
  "CLX",
  "JBHT",
  "PKG",
  "TXT",
  "NRG",
  "CE",
  "MAA",
  "DGX",
  "MRO",
  "IP",
  "FDS",
  "EXPE",
  "NWS",
  "NWSA",
  "CFG",
  "GEN",
  "ZBRA",
  "FOX",
  "FOXA",
  "IEX",
  "BG",
  "SWKS",
  "MAS",
  "AMCR",
  "CF",
  "CAG",
  "SNA",
  "AES",
  "JBL",
  "RVTY",
  "WBA",
  "AKAM",
  "DOC",
  "ALB",
  "TRMB",
  "PODD",
  "WRK",
  "INCY",
  "KEY",
  "POOL",
  "UDR",
  "NDSN",
  "PNR",
  "LNT",
  "CPB",
  "MGM",
  "SWK",
  "NI",
  "KIM",
  "DVA",
  "HST",
  "VTRS",
  "LW",
  "TECH",
  "SJM",
  "EVRG",
  "EMN",
  "BEN",
  "JKHY",
  "AOS",
  "IPG",
  "JNPR",
  "CPT",
  "RL",
  "REG",
  "LKQ",
  "UHS",
  "CRL",
  "TAP",
  "KMX",
  "APA",
  "WYNN",
  "EPAM",
  "BBWI",
  "ALLE",
  "CTLT",
  "CHRW",
  "TFX",
  "TPR",
  "HII",
  "SOLV",
  "FFIV",
  "QRVO",
  "BXP",
  "MOS",
  "AIZ",
  "HSIC",
  "PNW",
  "MTCH",
  "PAYC",
  "PARA",
  "GNRC",
  "FRT",
  "BIO",
  "HAS",
  "DAY",
  "BWA",
  "CZR",
  "ETSY",
  "NCLH",
  "AAL",
  "MKTX",
  "GL",
  "MHK",
  "FMC",
  "IVZ",
  "RHI",
  "CMA",
];

const CRYPTO_LIST = [
  "BTC",
  "ETH",
  "USDT",
  "USDT",
  "BNB",
  "BUSD",
  "XRP",
  "ADA",
  "SOL",
  "DOGE",
  "DOT",
  "DAI",
  "MATIC",
  "SHIB",
  "TRX",
  "AVAX",
  "LEO",
  "LTC",
  "XEM",
  "XLM",
  "BCH",
];

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
      const date = row.date.replaceAll("/", "-");
      const close = parseFloat(row.close.replace("$", ""));
      const volume = parseFloat(row.volume.replace("$", ""));
      const open = parseFloat(row.open.replace("$", ""));
      const high = parseFloat(row.high.replace("$", ""));
      const low = parseFloat(row.low.replace("$", ""));

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
        const date = row.date.replaceAll("/", "-");
        const close = parseFloat(row.close.replace("$", ""));
        const volume = parseFloat(row.volume.replace("$", ""));
        const open = parseFloat(row.open.replace("$", ""));
        const high = parseFloat(row.high.replace("$", ""));
        const low = parseFloat(row.low.replace("$", ""));

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
