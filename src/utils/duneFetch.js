export const getCompareDataFromDune = async (
  walletAddress,
  setTransactionPercentile,
  setTransactionsToNextLvl
) => {
  async function fetchDuneQueryResults(apiKey, queryId, queryParams) {
    const url = `https://api.dune.com/api/v1/query/${queryId}/results?${queryParams}`;

    const options = {
      method: "GET",
      headers: {
        "X-Dune-API-Key": apiKey,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error after logging it
    }
  }

  //usage:
  const apiKey = import.meta.env.VITE_DUNE_API;
  //WALLET ADDRESS OVERRIDE. TOREMOVE
  walletAddress = "0x71B0CCe271A182309Dd75EEd078066D202eEdce0";

  const queryId = {
    ScrollTxs: "3733797", // Scroll txs
    queryID2: "value2",
    queryID3: "value3",
  };

  //fetch transaction count percentile
  async function fetchAndProcessData() {
    try {
      let queryParams = new URLSearchParams({
        limit: "1", // We only need one row
        filters: `user_address = ${walletAddress.toLowerCase()}`,
      });
      let data = await fetchDuneQueryResults(
        apiKey,
        queryId.ScrollTxs,
        queryParams
      );
      console.log("Dune data: ", data.result.rows[0]); // Handle the data from the API

      const rawTransactionPercentile =
        data.result.rows[0].transaction_count_percentile;
      const rawTransactionCountTargetWallet =
        data.result.rows[0].transaction_count;
      let transactionPercentile = 100 - rawTransactionPercentile * 100 + 1;

      if (transactionPercentile < 5) {
        transactionPercentile = transactionPercentile.toFixed(2);
      } else {
        transactionPercentile = transactionPercentile.toFixed(0);
      }

      console.log("transactionPercentile", transactionPercentile);
      setTransactionPercentile(transactionPercentile);

      queryParams = new URLSearchParams({
        limit: "1", // We only need one row
        filters: `transaction_count_percentile > ${0.75}`, //TOIMPLEMENT
        sort_by: "transaction_count_percentile asc",
      });
      data = await fetchDuneQueryResults(
        apiKey,
        queryId.ScrollTxs,
        queryParams
      );
      console.log("Dune data: ", data.result.rows[0]); // Handle the data from the API

      const rawTransactionCountCompareWallet =
        data.result.rows[0].transaction_count;
      const transactionDiffrence =
        rawTransactionCountCompareWallet - rawTransactionCountTargetWallet;
      setTransactionsToNextLvl(transactionDiffrence);
      console.log("Required txs", transactionDiffrence);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  fetchAndProcessData();
};
