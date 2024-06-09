import { SPX_LIST } from "./src/symbols/spx_list.mjs";
import { CRYPTO_LIST } from "./src/symbols/crypto_list.mjs";
import {
  fetchAllSymbols,
  generateAllCSVs,
  genetateCombinedCsv,
} from "./src/functions.mjs";

const CONFIG = {
  isFetchEnable: false, // `true` to fetch from the API. With `false` will use the cache.
};

async function main() {
  {
    const options = {
      assetclass: "stocks",
      fromdate: "2010-01-01", // The API has a limit of 10 years.
      todate: "2024-06-07", // yyyy-mm-dd
      limit: 99999999,
    };

    if (CONFIG.isFetchEnable) {
      await fetchAllSymbols(SPX_LIST, options);
    }

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

    if (CONFIG.isFetchEnable) {
      await fetchAllSymbols(CRYPTO_LIST, options);
    }

    await generateAllCSVs(CRYPTO_LIST, options);

    await genetateCombinedCsv(CRYPTO_LIST, {
      assetclass: "crypto",
      outputFileName: "all_top_crypto",
    });
  }

  /* const response = await fetch(
    `https://api.investing.com/api/financialdata/historical/1061443?start-date=2010-01-01&end-date=2024-06-07&time-frame=Daily&add-missing-rows=false`,
    { headers: { "Domain-Id": "www" } }
  );

  const data = await response.json(); */
}

main();
