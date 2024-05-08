import * as React from "react";
import { useState, useEffect } from 'react';
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import CardInvertedColors from "./CardInvertedColors";
import NftCard from "./NftCard";
import Carousel from "react-multi-carousel";
import Typography from "@mui/joy/Typography";
import "react-multi-carousel/lib/styles.css";

//Get transaction list
const getTransactionsByAddress = async (
  walletAddress,
  startBlock = 0,
  endBlock = 99999999,
  page = 1,
  offset = 9999,
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

    // Handle the transactions data
    console.log(data.result);
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

    // Get the totals
    calculateUniquePeriods(data.result);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  } finally {
    // setIsLoading(false); // Stop loading
  }
};


const CardData = {
  cards: [
    {
      title: "Current Balance",
      infoTooltipTitle: "Total balance including Ethereum and stablecoins",
      valueMain: "Ξ0.56548 ETH",
      valueSecondary: "$1500.25",
      percentageLevel: 10,
      nextStepText: "Add this amount to your wallet",
      nextStepData: "Ξ0.06548 ETH",
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Transaction Volume",
      infoTooltipTitle:
        "This metric shows the total amount of money transacted through this blockchain account, indicating its financial activity.",
      valueMain: "Ξ10.47 ETH",
      valueSecondary: "$32457 USD",
      percentageLevel: 21,
      nextStepText: "Increase your transaction volume by",
      nextStepData: "Ξ1.56548 ETH",
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Total Transaction Count",
      infoTooltipTitle: "Total transactions successfully completed",
      valueMain: 148,
      valueSecondary: "",
      percentageLevel: 0.7,
      nextStepText: "Add this amount to your wallet",
      nextStepData: "Ξ 0.06548 ETH",
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Unique Smart Contracts",
      infoTooltipTitle: "Total unique smart contracts interacted with",
      valueMain: 34,
      valueSecondary: "",
      percentageLevel: 11,
      nextStepText: "Interact with smart contracts",
      nextStepData: 16,
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Unique Days",
      infoTooltipTitle: "Unique days this address was active on",
      valueMain: 9,
      valueSecondary: "",
      percentageLevel: 54,
      nextStepText: "Days to be active on",
      nextStepData: 6,
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Unique Weeks",
      infoTooltipTitle: "Unique weeks this address was active on",
      valueMain: 3,
      valueSecondary: "",
      percentageLevel: 43,
      nextStepText: "Weeks to be active on",
      nextStepData: 3,
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Unique Months",
      infoTooltipTitle: "Unique months this address was active on",
      valueMain: 1,
      valueSecondary: "",
      percentageLevel: 84,
      nextStepText: "Months to be active on",
      nextStepData: 3,
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
    {
      title: "Gas Fees Spent",
      infoTooltipTitle: "Total gas fees spent by this account",
      valueMain: "Ξ0.07 ETH",
      valueSecondary: "$14.45 USD",
      percentageLevel: 71,
      nextStepText: "Spend more on gas fees",
      nextStepData: "Ξ 0.154780 ETH",
      steps: [
        {
          percent: 75,
          nftLink: "src/assets/DropScanNFT75.webp"
        },
        {
          percent: 50,
          nftLink: "src/assets/DropScanNFT50.webp"
        },
        {
          percent: 25,
          nftLink: "src/assets/DropScanNFT25.webp"
        },
        {
          percent: 10,
          nftLink: "src/assets/DropScanNFT10.webp"
        },
        {
          percent: 5,
          nftLink: "src/assets/DropScanNFT5.webp"
        },
      ],
    },
  ],
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
  const [balance, setBalance] = useState();
  const [transactionCount, setTransactionCount] = useState();
  const [gas, setGas] = useState();

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
  const [totalUniqueDays, setTotalUniqueDays] = useState();
  const [totalUniqueWeeks, setTotalUniqueWeeks] = useState();
  const [totalUniqueMonths, setTotalUniqueMonths] = useState();


  useEffect(() => {
    if (window.ethereum && walletAddress) {
      // getEtherBalance();
      getTransactionsByAddress(walletAddress);
    }
  }, [walletAddress]);
  
  return (
    <>
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
        {CardData.cards.map((card, index) => (
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
                        <NftCard key={index} nftLink={step.nftLink} nftLevel = {step.percent} currentPercent={card.percentageLevel} />
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
