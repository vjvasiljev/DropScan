import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import CardInvertedColors from "./CardInvertedColors";
import NftCard from "./NftCard";
import Carousel from "react-multi-carousel";
import Typography from "@mui/joy/Typography";
import cardData from "/src/data/cardData.json";
import "react-multi-carousel/lib/styles.css";
import Button from "@mui/joy/Button";
import Web3 from "web3";
//helpers
import { getCompareDataFromDune } from "../utils/duneFetch";

const ETH_DECIMAL_PLACES = 6;

//Get transaction list
const getTransactionsByAddress = async (
  walletAddress,
  setTransactions,
  setNumTotalTransactions,
  setNumSuccesfulTransactions,
  uniqueDays,
  setUniqueDays,
  uniqueWeeks,
  setUniqueWeeks,
  uniqueMonths,
  setUniqueMonths,
  setTotalUniqueDays,
  setTotalUniqueWeeks,
  setTotalUniqueMonths,
  setTotalUniqueContracts,
  setTotalTransactionValue,
  setTotalGasSpent,
  startBlock = 0,
  endBlock = 99999999,
  page = 1,
  offset = 1000,
  sort = "asc"
) => {
  if (!walletAddress) {
    console.log("No account address provided.");
    return;
  }

  const apiBaseUrl = "https://api.scrollscan.com/api";
  const apiKeyToken = import.meta.env.VITE_SCROLL_SCAN_API; // Replace with your actual API key token
  // Construct the API endpoint with the given query parameters
  const url = `${apiBaseUrl}?module=account&action=txlist&address=${walletAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKeyToken}`;

  try {
    // setIsLoading(true); // Start loading

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "1") {
      console.error("Error fetching transactions:", data.message);
      return [];
    }
    console.log(data);
    // Handle the transactions data
    // console.log("Get transaction list");
    // You can set the transactions data to a state or return it depending on your app's design
    setTransactions(data.result);
    setNumTotalTransactions(data.result.length);

    // Function to calculate the number of successful transactions
    const calculateSuccessfulTransactions = (transactions) => {
      return transactions.filter((tx) => tx.isError === "0").length;
    };

    // Number of successful transactions
    const numOfSuccessfulTransactions = calculateSuccessfulTransactions(
      data.result
    );
    setNumSuccesfulTransactions(numOfSuccessfulTransactions);

    // Helper function to format a date to YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    // Helper function to get the week number in the year
    const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // Helper function to format a date to its year-week representation "YYYY-WW"
    const formatWeek = (date) => {
      return `${date.getFullYear()}-W${getWeekNumber(date)
        .toString()
        .padStart(2, "0")}`;
    };

    // Helper function to calculate unique days, weeks, and months
    const calculateUniquePeriods = (transactions) => {
      // Assuming you have transactions in your state or props
      let tempUniqueDays = new Set(uniqueDays);
      let tempUniqueWeeks = new Set(uniqueWeeks);
      let tempUniqueMonths = new Set(uniqueMonths);

      transactions.forEach((tx) => {
        const date = new Date(tx.timeStamp * 1000);
        tempUniqueDays.add(formatDate(date)); // Add to temporary unique days
        tempUniqueWeeks.add(formatWeek(date)); // Add to temporary unique weeks
        tempUniqueMonths.add(`${date.getFullYear()}-${date.getMonth() + 1}`); // Add to temporary unique months
      });

      // Update the state with the new Sets
      setUniqueDays(tempUniqueDays);
      setUniqueWeeks(tempUniqueWeeks);
      setUniqueMonths(tempUniqueMonths);
      setTotalUniqueDays(tempUniqueDays.size);
      setTotalUniqueWeeks(tempUniqueWeeks.size);
      setTotalUniqueMonths(tempUniqueMonths.size);
    };

    // Helper function to calculate unique smart contracts interacted with
    const calculateUniqueContracts = (transactions) => {
      const uniqueContracts = new Set();

      transactions.forEach((tx) => {
        if (tx.to) {
          uniqueContracts.add(tx.to.toLowerCase());
        }
      });

      return uniqueContracts.size;
    };

    //helper function to calculate volume
    const calculateTotalTransactionValue = (transactions) => {
      const web3 = new Web3(window.ethereum);
      // Convert from Wei to Ether
      return transactions.reduce((total, tx) => {
        return total + parseFloat(web3.utils.fromWei(tx.value, "ether"));
      }, 0);
    };

    //Add a helper function to calculate the total gas spent:
    const calculateTotalGasSpent = (transactions) => {
      const web3 = new Web3(window.ethereum);

      return transactions.reduce((total, tx) => {
        const gasSpentInWei = BigInt(tx.gasUsed) * BigInt(tx.gasPrice);
        const gasSpentInEther = parseFloat(
          web3.utils.fromWei(gasSpentInWei.toString(), "ether")
        );
        return total + gasSpentInEther;
      }, 0);
    };

    // Get the totals
    calculateUniquePeriods(data.result);

    // Get the total unique contracts interacted with
    const totalUniqueContracts = calculateUniqueContracts(data.result);
    setTotalUniqueContracts(totalUniqueContracts);

    //Add the function call to calculate the total transaction value and set it:
    const totalTransactionValue = calculateTotalTransactionValue(data.result);
    setTotalTransactionValue(
      Number(totalTransactionValue).toFixed(ETH_DECIMAL_PLACES)
    );

    //Add the function call to calculate the total gas spent and set it:
    const totalGasSpent = calculateTotalGasSpent(data.result);
    setTotalGasSpent(totalGasSpent.toFixed(ETH_DECIMAL_PLACES));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  } finally {
    // setIsLoading(false); // Stop loading
  }
};

const getEtherBalance = async (walletAddress, setBalance) => {
  // Make sure there is an account address to check. Without an address, the API call won't work.
  if (!walletAddress) {
    console.log("No account address to check balance for.");
    return;
  }

  const apiBaseUrl = "https://api.scrollscan.com/api";
  const apiKeyToken = import.meta.env.VITE_SCROLL_SCAN_API; // Replace with your actual API key token
  const url = `${apiBaseUrl}?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKeyToken}`;

  // Ensure loading is true
  // setIsLoading(true);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
      return;
    }

    const data = await response.json();
    console.log("API Response Data:", data); // Log the entire response for debugging

    // Check if the data contains an error message, in which case you should not proceed
    if (!data.result || data.result.startsWith("Error!")) {
      console.error("Error fetching balance:", data.result);
    } else {
      const web3 = new Web3(window.ethereum);
      // Convert from Wei to Ether and set the balance state
      setBalance(
        Number(web3.utils.fromWei(data.result, "ether")).toFixed(
          ETH_DECIMAL_PLACES
        )
      );
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
  } finally {
    // setIsLoading(false);
  }
};

const responsive = {
  mobile: {
    breakpoint: {
      max: 475,
      min: 0,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 650,
      min: 475,
    },
    items: 3,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: {
      max: 1200,
      min: 650,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
  largeDesktop: {
    breakpoint: {
      max: 3000,
      min: 1200,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
};
const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

// const ColoredContainers = () => {
//   // Extended range of color codes
//   const colors = [
//     "danger.100",
//     "danger.200",
//     "danger.300",
//     "danger.400",
//     "danger.500",
//     "danger.600",
//     "danger.700",
//     "success.100",
//     "success.200",
//     "success.300",
//     "success.400",
//     "success.500",
//     "success.600",
//     "success.700",
//     "primary.100",
//     "primary.200",
//     "primary.300",
//     "primary.400",
//     "primary.500",
//     "primary.600",
//     "primary.700",
//     // Add other Joy UI specific color ranges here if needed
//   ];

//   return (
//     <div>
//       {colors.map((color, index) => (
//         <Typography key={index} sx={{ color: color }}>
//           Hello, this is color {color}
//         </Typography>
//       ))}
//     </div>
//   );
// };

export default function WalletInfo({ deviceType, walletAddress }) {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState();

  const [balance, setBalance] = useState(0);
  const [transactionCount, setTransactionCount] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [numTotalTransactions, setNumTotalTransactions] = useState(0);
  const [numSuccesfulTransactions, setNumSuccesfulTransactions] = useState(0);
  const [ethPrice, setEthPrice] = useState({ BTC: null, USD: null, EUR: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uniqueDays, setUniqueDays] = useState(new Set());
  const [uniqueWeeks, setUniqueWeeks] = useState(new Set());
  const [uniqueMonths, setUniqueMonths] = useState(new Set());
  const [totalUniqueDays, setTotalUniqueDays] = useState(0);
  const [totalUniqueWeeks, setTotalUniqueWeeks] = useState(0);
  const [totalUniqueMonths, setTotalUniqueMonths] = useState(0);
  const [totalUniqueContracts, setTotalUniqueContracts] = useState(0);
  const [totalTransactionValue, setTotalTransactionValue] = useState(0);
  const [totalGasSpent, setTotalGasSpent] = useState();

  //Dune txs table
  const [transactionPercentile, setTransactionPercentile] = useState(100);
  const [transactionsToNextLvl, setTransactionsToNextLvl] = useState(0);

  //Dune balance table
  const [balancePercentile, setBalancePercentile] = useState(0);
  const [balanceToNextLvl, setBalanceToNextLvl] = useState(0);

  // Saving json to state
  const [cardDataActive, setCardDataActive] = useState(cardData);

  //Updating card data with fetched data from Scroll API
  const updateCardData = () => {
    // console.log("Updated card data");
    // Define the values for valueMain and valueSecondary for each card index
    const updateValues = {
      0: {
        valueMain: "Ξ" + balance + " ETH",
        valueSecondary: "$" + (balance * ethPrice.USD).toFixed(2) + " USD",
        percentageLevel: balancePercentile,
        nextStepData: balanceToNextLvl,
      },
      1: {
        valueMain: "Ξ" + totalTransactionValue + " ETH",
        valueSecondary:
          "$" + (totalTransactionValue * ethPrice.USD).toFixed(2) + " USD",
      },
      2: {
        valueMain: numSuccesfulTransactions,
        percentageLevel: transactionPercentile,
        nextStepData: transactionsToNextLvl,
      },
      3: { valueMain: totalUniqueContracts },
      4: { valueMain: totalUniqueDays },
      5: { valueMain: totalUniqueWeeks },
      6: { valueMain: totalUniqueMonths },
      7: {
        valueMain: "Ξ" + totalGasSpent + " ETH",
        valueSecondary:
          "$" + (totalGasSpent * ethPrice.USD).toFixed(2) + " USD",
      },
    };

    // Create a new array with the updated values for each card
    const updatedCardData = cardDataActive.map((card, index) => {
      if (updateValues.hasOwnProperty(index)) {
        return { ...card, ...updateValues[index] };
      }
      return card;
    });
    setCardDataActive(updatedCardData);
  };

  useEffect(() => {
    if (window.ethereum && walletAddress) {
      getEtherBalance(walletAddress, setBalance);
      getTransactionsByAddress(
        walletAddress,
        setTransactions,
        setNumTotalTransactions,
        setNumSuccesfulTransactions,
        uniqueDays,
        setUniqueDays,
        uniqueWeeks,
        setUniqueWeeks,
        uniqueMonths,
        setUniqueMonths,
        setTotalUniqueDays,
        setTotalUniqueWeeks,
        setTotalUniqueMonths,
        setTotalUniqueContracts,
        setTotalTransactionValue,
        setTotalGasSpent
      );
      getCompareDataFromDune(
        walletAddress,
        setTransactionPercentile,
        setTransactionsToNextLvl,
        //txs length was required for checking how many txs the address has if there is no Dune data
        transactions.length,
        setBalancePercentile,
        setBalanceToNextLvl,
        balance
      );
    }
    // console.log(walletAddress);
  }, [walletAddress]);

  //Updating the dynamic data in the cards
  useEffect(() => {
    updateCardData();
  }, [
    walletAddress,
    transactions,
    transactionPercentile,
    transactionsToNextLvl,
    setBalancePercentile,
    setBalanceToNextLvl,
  ]);

  useEffect(() => {
    const getEthPrice = async () => {
      // Construct the API endpoint URL with query parameters
      const url = new URL("https://min-api.cryptocompare.com/data/price");
      url.search = new URLSearchParams({
        fsym: "ETH",
        tsyms: "BTC,USD,EUR",
      }).toString();

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        // Raises an error if the HTTP request returned an unsuccessful status code
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEthPrice({
          BTC: data.BTC,
          USD: data.USD,
          EUR: data.EUR,
        });
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    getEthPrice();
  }, []);

  // console.log(transactions);
  return (
    <>
      {/* <Button onClick={getEtherBalance}>test</Button> */}
      <style>
        {`
    .carousel-item-padding-30-px {
      margin-right: 15px;
    }
  `}
      </style>
      {/* <ColoredContainers /> */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
      >
        {cardDataActive.map((card, index) => (
          <Grid xs={12} sm={12} md={12} lg={6} key={index}>
            <Item>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid xs={12}>
                  <CardInvertedColors
                    title={card.title}
                    infoTooltipTitle={card.infoTooltipTitle}
                    valueMain={card.valueMain}
                    valueSecondary={card.valueSecondary}
                    percentageLevel={card.percentageLevel}
                    nextStepText={card.nextStepText}
                    nextStepData={card.nextStepData}
                    steps={card.steps}
                  />
                </Grid>
                <Grid xs={12}>
                  <div
                    //Dots fro Carousel lower
                    style={{
                      paddingBottom: "30px",
                      position: "relative",
                    }}
                  >
                    <Carousel
                      additionalTransfrom={0}
                      arrows
                      autoPlaySpeed={3000}
                      centerMode
                      className=""
                      containerClass="container-padding-bottom"
                      dotListClass=""
                      draggable
                      focusOnSelect={false}
                      infinite={false}
                      itemClass="carousel-item-padding-30-px"
                      keyBoardControl
                      minimumTouchDrag={80}
                      pauseOnHover
                      renderArrowsWhenDisabled={false}
                      renderButtonGroupOutside={false}
                      renderDotsOutside={true}
                      responsive={responsive}
                      rewind={false}
                      rewindWithAnimation={false}
                      rtl={false}
                      shouldResetAutoplay
                      showDots={true}
                      sliderClass=""
                      slidesToSlide={1}
                      swipeable
                    >
                      {card.steps.map((step, index) => (
                        <NftCard
                          key={index}
                          nftLink={step.nftLink}
                          nftLevel={step.percent}
                          currentPercent={card.percentageLevel}
                        />
                      ))}
                    </Carousel>
                  </div>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
