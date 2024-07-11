/**
 * Fetches compare data from Dune API for a given wallet address.
 * @param {string} walletAddress - The wallet address to fetch data for.
 * @param {function} setTransactionPercentile - A function to set the transaction percentile state.
 * @param {function} setTransactionsToNextLvl - A function to set the transactions to next level state.
 */
export const getCompareDataFromDune = async (
  walletAddress,
  setTransactionPercentile,
  setTransactionsToNextLvl
) => {
  /**
   * Fetches data from Dune API using the provided API key, query ID, and query parameters.
   * @param {string} apiKey - The API key to use for authentication.
   * @param {string} queryId - The ID of the query to fetch data for.
   * @param {URLSearchParams} queryParams - The query parameters to include in the request.
   * @returns {Promise} A promise that resolves to the fetched data.
   */
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
  /**
   * Fetches transaction count percentile and required transactions to next level from Dune API and sets state.
   */
  async function fetchAndProcessData() {
    try {
      // Fetch transaction count percentile
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

      // Fetch required transactions to next level
      const topSteps = [0.75, 0.5, 0.25, 0.1, 0.05];
      let selectedStep = 0;
      console.log("transactionPercentile", transactionPercentile);
      if (transactionPercentile > 75 && transactionPercentile <= 100) {
        selectedStep = 0.75;
      } else if (transactionPercentile > 50 && transactionPercentile <= 75) {
        selectedStep = 0.5;
      } else if (transactionPercentile > 25 && transactionPercentile <= 50) {
        selectedStep = 0.25;
      } else if (transactionPercentile > 10 && transactionPercentile <= 25) {
        selectedStep = 0.1;
      } else if (transactionPercentile > 5 && transactionPercentile <= 10) {
        selectedStep = 0.05;
      }
      console.log("selectedStep", selectedStep);

      queryParams = new URLSearchParams({
        limit: "1", // We only need one row
        filters: `transaction_count_percentile > ${1 - selectedStep}`, //TODO
        sort_by: "transaction_count_percentile asc",
      });

      data = await fetchDuneQueryResults(
        apiKey,
        queryId.ScrollTxs,
        queryParams
      );
      console.log("Dune data: ", data.result.rows[0]); // Handle the data from the API

      //check if it is nor more than top 5% and only then calculated required steps, else jsut set it to DONE
      if (!data.result.rows[0]) {
        setTransactionsToNextLvl("DONE");
      } else {
        const rawTransactionCountCompareWallet =
          data.result.rows[0].transaction_count;
        const transactionDiffrence =
          rawTransactionCountCompareWallet - rawTransactionCountTargetWallet;
        setTransactionsToNextLvl(transactionDiffrence);
        console.log("Required txs", transactionDiffrence);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  fetchAndProcessData();
};
