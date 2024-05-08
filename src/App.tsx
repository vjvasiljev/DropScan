import * as React from "react";
import { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";

import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";

import Sidebar from "./components/Sidebar";

import Header from "./components/Header";
import WalletInfo from "./components/WalletInfo";

import DottedConnector from "./components/DottedConnector";

import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme,
  useWalletInfo,
} from "@web3modal/wagmi/react";

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider, useAccount } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckConnectionStatus from "./components/CheckConnectionStatus";

import { useColorScheme } from "@mui/joy/styles";

import Stack from "@mui/joy/Stack";

import CardInvertedColors from "./components/CardInvertedColors";

import Grid from "@mui/joy/Grid";
import AboutChainInfo from "./components/AboutChainCard";

import ButtonGroup from "@mui/joy/ButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Settings from "@mui/icons-material/Settings";
import Footer from "./components/Footer";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

//dottedconnector data
const dottedConnectorData = [
  {
    percent: 100,
    nftLink: "src/assets/DropScanNFT75.webp",
  },
  {
    percent: 90,
    nftLink: "src/assets/DropScanNFT75.webp",
  },
  {
    percent: 80,
    nftLink: "src/assets/DropScanNFT50.webp",
  },
  {
    percent: 70,
    nftLink: "src/assets/DropScanNFT50.webp",
  },
  {
    percent: 60,
    nftLink: "src/assets/DropScanNFT25.webp",
  },
  {
    percent: 50,
    nftLink: "src/assets/DropScanNFT25.webp",
  },
  {
    percent: 40,
    nftLink: "src/assets/DropScanNFT10.webp",
  },
  {
    percent: 30,
    nftLink: "src/assets/DropScanNFT10.webp",
  },
  {
    percent: 20,
    nftLink: "src/assets/DropScanNFT5.webp",
  },
  {
    percent: 10,
    nftLink: "src/assets/DropScanNFT5.webp",
  },
  {
    percent: 1,
    nftLink: "src/assets/DropScanNFT5.webp",
  },
];

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com

const projectId = import.meta.env.VITE_WALLET_CONNECT_CLOUD_API;
if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

// 2. Create wagmiConfig
const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet, arbitrum],
  projectId,
  metadata: {
    name: "Web3Modal React Example",
    description: "Web3Modal React Example",
    url: "",
    icons: [],
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: "dark",
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // enableOnramp: true, // Optional - false as default
  themeVariables: {
    // "--w3m-color-mix": "#00BB7F",
    // "--w3m-color-mix-strength": 40,
    "--w3m-border-radius-master": "1px",
    "--w3m-z-index": 10000,
  },
});

// export function Web3ModalProvider({ children }) {
//   return (
//     <WagmiProvider config={wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   );
// }

function ColorSchemeSetWalletConnect() {
  const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme();
  const { colorScheme, setColorScheme } = useColorScheme();
  React.useEffect(() => {
    setThemeMode(colorScheme);
  }, [colorScheme]); // Only re-run if colorScheme changes
}

function SignTransactionButton() {
  const { signMessage } = useSignMessage();

  return (
    <Button onClick={() => signMessage({ message: "hello world" })}>
      Sign message
    </Button>
  );
}

function ConnectedAddress({ onAddressChange }) {
  const { address, isConnecting, isDisconnected } = useAccount();

  React.useEffect(() => {
    onAddressChange(address); // This will call the parent function whenever the address changes
  }, [address, onAddressChange]);
}

export default function App() {
  const [walletAddress, setWalletAddress] = useState("0x0...");
  // const [drawerOpen, setDrawerOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  // const { walletInfo } = useWalletInfo();

  //Check if connected
  // function checkWalletInfo() {
  //   console.log(walletInfo.name, walletInfo.icon);
  // }

  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ConnectedAddress onAddressChange={setWalletAddress} />
          </QueryClientProvider>
        </WagmiProvider>

        {/* <Web3ModalProvider> */}
        {/* {console.log(colorScheme)} */}
        <ColorSchemeSetWalletConnect />
        {/* <Button onClick={() => checkConnectionStatus()}>Check Wallet Info</Button> */}
        <CssBaseline />
        {/* <CheckConnectionStatus /> */}

        {/* {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )} */}

        <Stack
          id="tab-bar"
          direction="row"
          justifyContent="space-around"
          spacing={1}
          sx={{
            display: { xs: "flex", sm: "none" },
            zIndex: "999",
            bottom: 0,
            position: "fixed",
            width: "100dvw",
            py: 2,
            backgroundColor: "background.body",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        ></Stack>

        <Header />

        <Box sx={{ display: "flex", minHeight: "200dvh" }}>
          {/* <Sidebar /> */}
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 6 },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              // height: "100dvh",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                mb: 1,
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "center" },
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* <Typography level="h1" component="h1">
                Scroll Airdrop Checker
              </Typography> */}
            </Box>
            <Grid>
              <Item>
                <AboutChainInfo />
              </Item>
              <Item>
                <CardInvertedColors
                  title={
                    walletAddress ? (
                      walletAddress
                    ) : (
                      <Typography>
                        Please connect your wallet to see your address
                        information.{" "}
                      </Typography>
                    )
                  }
                  valueMain={
                    walletAddress ? (
                      "You are in the top 44% of all Scroll addresses"
                    ) : (
                      <Typography> </Typography>
                    )
                  }
                  valueSecondary={""}
                  percentageLevel={44}
                  steps={dottedConnectorData}
                  cardOverflowHidden={true}
                />
              </Item>
            </Grid>

            {/* <CardInvertedColors /> */}

            <WalletInfo walletAddress={walletAddress} />
          </Box>
        </Box>
        {/* </Web3ModalProvider> */}
        <Footer />
      </CssVarsProvider>
    </>
  );
}
