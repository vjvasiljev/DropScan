/**
 * Fetches compare data from Dune API for a given wallet address.
 * @param {string} walletAddress - The wallet address to fetch data for.
 * @param {function} setTransactionPercentile - A function to set the transaction percentile state.
 * @param {function} setTransactionsToNextLvl - A function to set the transactions to next level state.
 * @returns {number} The percentile of the given wallet address.
 */

// return percentage for the card
function returnPercentages(data, percentileColumnString, mainApiAddressData) {
  let rawPercentile = 100;
  let rawNumTargetWallet = mainApiAddressData;
  let percentile = 100;
  if (data.result.rows[0]) {
    rawPercentile = data.result.rows[0][percentileColumnString];
    // rawTransactionCountTargetWallet = data.result.rows[0].transaction_count;
    percentile = 100 - rawPercentile * 100;
  }

  if (percentile < 5) {
    percentile = percentile.toFixed(2);
  } else {
    percentile = percentile.toFixed(0);
  }
  return percentile;
}

/**
+ * Selects the next step percentage based on the given percentile.
+ * @param {number} percentile - The percentile of the wallet address.
+ * @returns {number} The selected step percentage.
+ */
function selectNextSteps(percentile) {
  const topSteps = [0.75, 0.5, 0.25, 0.1, 0.05];
  let selectedStep = 0;
  // console.log("transactionPercentile", transactionPercentile);
  if (percentile > 75 && percentile <= 100) {
    selectedStep = 0.75;
  } else if (percentile > 50 && percentile <= 75) {
    selectedStep = 0.5;
  } else if (percentile > 25 && percentile <= 50) {
    selectedStep = 0.25;
  } else if (percentile > 10 && percentile <= 25) {
    selectedStep = 0.1;
  } else if (percentile > 5 && percentile <= 10) {
    selectedStep = 0.05;
  }
  return selectedStep;
}

//check if it is nor more than top 5% and only then calculated required steps, else jsut set it to DONE

// function selectNextSteps(data, dataColumnString, mainApiAddressData) {
//   if (!data) {
//     return "DONE";
//   } else {
//     console.log("data inside", data);
//     const rawCountCompareWallet = data[dataColumnString];
//     const transactionDiffrence =
//       rawCountCompareWallet - mainApiAddressData;
//     console.log("Required txs", transactionDiffrence);
//     return transactionDiffrence;
//   }
// }
// console.log("111", data.result.rows[0]);
// const nextStepData = selectNextSteps(
//   data.result.rows[0],
//   "transaction_count",
//   transactions
// );

// console.log("nextStepData", nextStepData);
// setTransactionsToNextLvl(nextStepData);

export const getCompareDataFromDune = async (
  walletAddress,
  //txs data
  setTransactionPercentile,
  setTransactionsToNextLvl,
  transactions,
  //balance data
  setBalancePercentile,
  setBalanceToNextLvl,
  balance
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
  // walletAddress = "0x5DCA863A984193AAE7889e2024A020859D274787"; // Zero txs address

  const queryId = {
    ScrollTxs: "3733797", // Scroll txs
    ScrollBalance: "3039059", // Current Balance
    queryID3: "value3",
  };

  //fetch transaction count percentile
  /**
   * Fetches transaction count percentile and required transactions to next level from Dune API and sets state.
   */
  async function fetchScrollTransactions() {
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
      console.log("Dune Txs data: ", data.result); // Handle the data from the API

      const percentileColumnString = "transaction_count_percentile";
      const transactionPercentile = returnPercentages(
        data,
        percentileColumnString,
        transactions
      );
      // console.log("transactionPercentile", transactionPercentile);
      setTransactionPercentile(transactionPercentile);

      // Fetch required transactions to next level

      const selectedTransactionStep = selectNextSteps(transactionPercentile);

      // console.log("selectedStep", selectedStep);

      //new query to get results for nexts step info
      queryParams = new URLSearchParams({
        limit: "1",
        filters: `transaction_count_percentile > ${
          1 - selectedTransactionStep
        }`,
        sort_by: "transaction_count_percentile asc",
      });
      data = await fetchDuneQueryResults(
        apiKey,
        queryId.ScrollTxs,
        queryParams
      );

      if (!data.result.rows[0]) {
        setTransactionsToNextLvl("DONE");
      } else {
        const rawTransactionCountCompareWallet =
          data.result.rows[0].transaction_count;
        const transactionDiffrence =
          rawTransactionCountCompareWallet - transactions;

        setTransactionsToNextLvl(transactionDiffrence);
        console.log("Required txs", transactionDiffrence);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  async function fetchScrollBalance() {
    try {
      let queryParams = new URLSearchParams({
        limit: "1", // We only need one row
        filters: `address = ${walletAddress.toLowerCase()}`,
      });
      let data = await fetchDuneQueryResults(
        apiKey,
        queryId.ScrollBalance,
        queryParams
      );
      console.log("Dune Scroll Balance: ", data.result); // Handle the data from the API
      let rawBalancePercentile = 100;
      let rawBalanceTargetWallet = balance;
      let balancePercentile = 100;
      if (data.result.rows[0]) {
        rawBalancePercentile = data.result.rows[0].balance_percentile;
        // rawBalanceTargetWallet = data.result.rows[0].balance;
        balancePercentile = 100 - rawBalancePercentile * 100 + 1;
      }
      setBalancePercentile(data.result.rows[0].balance_percentile);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  fetchScrollTransactions();
  fetchScrollBalance();
};
