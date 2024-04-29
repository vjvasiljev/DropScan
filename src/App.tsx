import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import WalletIcon from "@mui/icons-material/Wallet";

import Sidebar from "./components/Sidebar";
import OrderTable from "./components/OrderTable";
import OrderList from "./components/OrderList";
import Header from "./components/Header";
import WalletInfo from "./components/WalletInfo";
import LinearProgress from "@mui/joy/LinearProgress";

import DottedConnector from "./components/DottedConnector";
import ColorSchemeToggle from "./components/ColorSchemeToggle";
import IconButton from "@mui/joy/IconButton";
import ParaglidingIcon from "@mui/icons-material/Paragliding";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FocusTrap } from "@mui/base/FocusTrap";

import Stack from "@mui/joy/Stack";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import Mails from "./components/Mails";
import EmailContent from "./components/EmailContent";
import WriteEmail from "./components/WriteEmail";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com

const projectId = import.meta.env.VITE_WALLET_CONNECT_CLOUD_API;

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // ...wagmiOptions // Optional - Override createConfig parameters
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

// export default function JoyOrderDashboardTemplate() {
//   return (
//     <CssVarsProvider disableTransitionOnChange>
//       <Header />
//       <CssBaseline />
//       <Box sx={{ display: "flex", minHeight: "100dvh" }}>
//         {/* <Sidebar /> */}
//         <Box
//           component="main"
//           className="MainContent"
//           sx={{
//             px: { xs: 2, md: 6 },
//             pt: {
//               xs: "calc(12px + var(--Header-height))",
//               sm: "calc(12px + var(--Header-height))",
//               md: 3,
//             },
//             pb: { xs: 2, sm: 2, md: 3 },
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             minWidth: 0,
//             height: "100dvh",
//             gap: 1,
//           }}
//         >
//           {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Breadcrumbs
//               size="sm"
//               aria-label="breadcrumbs"
//               separator={<ChevronRightRoundedIcon fontSize="sm" />}
//               sx={{ pl: 0 }}
//             >
//               <Link
//                 underline="none"
//                 color="neutral"
//                 href="#some-link"
//                 aria-label="Home"
//               >
//                 <HomeRoundedIcon />
//               </Link>
//               <Link
//                 underline="hover"
//                 color="neutral"
//                 href="#some-link"
//                 fontSize={12}
//                 fontWeight={500}
//               >
//                 Dashboard
//               </Link>
//               <Typography color="primary" fontWeight={500} fontSize={12}>
//                 Orders
//               </Typography>
//             </Breadcrumbs>
//           </Box> */}
//           <Box
//             sx={{
//               display: "flex",
//               mb: 1,
//               gap: 1,
//               flexDirection: { xs: "column", sm: "row" },
//               alignItems: { xs: "start", sm: "center" },
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//               <IconButton variant="soft" color="primary" size="sm">
//                 <ParaglidingIcon />
//               </IconButton>
//               <Typography level="title-lg">Drop Scan</Typography>
//               <ColorSchemeToggle sx={{ ml: "auto" }} />
//             </Box>
//             <Typography level="h2" component="h1">
//               Scroll Airdrop Checker
//             </Typography>
//             <Button color="primary" startDecorator={<WalletIcon />} size="sm">
//               Connect Wallet
//             </Button>

//             <w3m-button />
//           </Box>
//           <Typography level="h3">Adress: 0x... </Typography>
//           <Typography level="h3">Total score: .... </Typography>
//           <LinearProgress
//             determinate
//             // variant="outlined"
//             color="success"
//             size="sm"
//             thickness={32}
//             value={92}
//             sx={{
//               "--LinearProgress-radius": "0px",
//               "--LinearProgress-progressThickness": "24px",
//               boxShadow: "sm",
//               borderColor: "danger.500",
//             }}
//           ></LinearProgress>
//           <DottedConnector />

//           <WalletInfo />
//           {/* <OrderTable /> */}
//           {/* <OrderList /> */}
//         </Box>
//       </Box>
//     </CssVarsProvider>
//   );
// }

export default function EmailExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {/* <CssBaseline /> */}
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
      >
        {/* <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Files
        </Button> */}
      </Stack>
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            overflow: "hidden",
          }),
        }}
      >
        {/* <Layout.Header> */}
        <Header />
        {/* </Layout.Header> */}
        {/* <Layout.SideNav>
          <Navigation />
        </Layout.SideNav> */}
        {/* <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ alignItems: 'center', gap: 1 }}>
              <Typography level="title-lg" textColor="text.secondary" component="h1">
                My inbox
              </Typography>
              <Typography level="title-sm" textColor="text.tertiary">
                5 emails
              </Typography>
            </Box>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' }}
            >
              Compose email
            </Button>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail open={open} onClose={() => setOpen(false)} />
            </FocusTrap>
          </Box>
          <Mails />
        </Layout.SidePane> */}
        <Layout.Main>
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
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <IconButton variant="soft" color="primary" size="sm">
                    <ParaglidingIcon />
                  </IconButton>
                  <Typography level="title-lg">Drop Scan</Typography>
                  <ColorSchemeToggle sx={{ ml: "auto" }} />
                </Box>
                <Typography level="h2" component="h1">
                  Scroll Airdrop Checker
                </Typography>
                <Button
                  color="primary"
                  startDecorator={<WalletIcon />}
                  size="sm"
                >
                  Connect Wallet
                </Button>

                <w3m-button />
              </Box>
              <Typography level="h3">Adress: 0x... </Typography>
              <Typography level="h3">Total score: .... </Typography>
              <LinearProgress
                determinate
                // variant="outlined"
                color="success"
                size="sm"
                thickness={32}
                value={92}
                sx={{
                  "--LinearProgress-radius": "0px",
                  "--LinearProgress-progressThickness": "24px",
                  boxShadow: "sm",
                  borderColor: "danger.500",
                }}
              ></LinearProgress>
              <DottedConnector />

              <WalletInfo />
              {/* <OrderTable /> */}
              {/* <OrderList /> */}
            </Box>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
