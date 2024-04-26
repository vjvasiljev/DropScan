import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Tooltip from "@mui/joy/Tooltip";
import Button from "@mui/joy/Button";
import InfoTooltip from "./InfoTooltip";

import ToDoStatus from "./ToDoStatus";

export default function BasicTable() {
  return (
    <>
      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Current Balance
              <InfoTooltip
                title={"Total balance including Ethereum and stablecoins."}
              />
            </th>
            <th>ETH(Ξ)</th>
            <th>USD($)</th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Get to Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total asset value</td>
            <td>Ξ0.5 ETH</td>
            <td>$1500 USD</td>
            <td>Top 15%</td>
            <td>
              <ToDoStatus
                title={"Add Ξ0.3 ETH"}
                tooltip={
                  "Add this amount to your wallet to rank within the top 10% of global crypto wallets."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <br></br>

      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Transaction Volume
              <InfoTooltip
                title={
                  "This metric represents the total volume of money that has been transacted through this account on the blockchain, reflecting its financial throughput."
                }
              />
            </th>
            <th>ETH(Ξ)</th>
            <th>USD($)</th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total money flow through this account</td>
            <td>Ξ10.47 ETH</td>
            <td>$32457 USD</td>
            <td>Top 21%</td>
            <td>
              <ToDoStatus
                title={"Add Ξ5.54 ETH"}
                tooltip={
                  "Increase your transaction volume by this amount to rank within the top 10% of accounts."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <br></br>

      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Total Transaction Count
              <InfoTooltip
                title={"Total transactions for the connected address."}
              />
            </th>
            <th>Total</th>
            <th>Successfull</th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Transaction count for this address</td>
            <td>145</td>
            <td>135</td>
            <td>Top 9%</td>
            <td>
              <ToDoStatus title={"Completed"} variant={"success"} />

              {/* <ToDoStatus
                title={"Add 17 trxs"}
                tooltip={
                  "Do this many more transactions to rank this account in the top 10%."
                }
                variant={"danger"}
              /> */}
            </td>
          </tr>
        </tbody>
      </Table>

      <br></br>
      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Unique Smart Contracts Utilized
              <InfoTooltip
                title={"Total unique smart contracts interacted with"}
              />
            </th>
            <th>Total</th>
            <th></th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total unique smart contracts</td>
            <td>34</td>
            <td></td>
            <td>Top 12%</td>
            <td>
              <ToDoStatus
                title={"Add 6 contracts"}
                tooltip={
                  "Interact with this many more smart contracts to rank in the top 10% of global crypto wallets."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <br></br>
      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Unique Days
              <InfoTooltip
                title={
                  "Unique days this address interacted with the blockchain."
                }
              />
            </th>
            <th>Total</th>
            <th></th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unique days this address was active on</td>
            <td>17</td>
            <td></td>
            <td>Top 40%</td>
            <td>
              <ToDoStatus
                title={"Add 6 days"}
                tooltip={
                  "Interact with the blockchain on this many more unique days to rank in the top 10%."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <br></br>

      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Unique Weeks
              <InfoTooltip
                title={
                  "Unique weeks this address interacted with the blockchain."
                }
              />
            </th>
            <th>Total</th>
            <th></th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unique weeks this address was active on</td>
            <td>12</td>
            <td></td>
            <td>Top 31%</td>
            <td>
              <ToDoStatus
                title={"Add 2 weeks"}
                tooltip={
                  "Interact with the blockchain on this many more unique weeks to rank in the top 10%."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <br></br>

      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Unique Months
              <InfoTooltip
                title={
                  "Unique months this address interacted with the blockchain."
                }
              />
            </th>
            <th>Total</th>
            <th></th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unique month this address was active on</td>
            <td>4</td>
            <td></td>
            <td>Top 47%</td>
            <td>
              <ToDoStatus
                title={"Add 6 months"}
                tooltip={
                  "Interact with the blockchain on this many more unique months to rank in the top 10%."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <br></br>

      <Table aria-label="basic table" variant="outlined">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              Gas Fees Spent
              <InfoTooltip
                title={
                  "This metric displays the total amount of gas fees spent by this account for transactions on the blockchain."
                }
              />
            </th>
            <th>ETH(Ξ)</th>
            <th>USD($)</th>
            <th>Top %</th>
            <th style={{ width: "20%" }}>Top 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total gas fees expended</td>
            <td>Ξ0.07 ETH</td>
            <td>$14.45 USD</td>
            <td>Top 71%</td>
            <td>
              <ToDoStatus
                title={"Spend Ξ0.15 ETH"}
                tooltip={
                  "Increase your spending on gas fees by this amount to elevate your account into the top 10% of all users."
                }
                variant={"danger"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
