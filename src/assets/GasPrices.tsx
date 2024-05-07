// src/components/GasPrices.js

import React, { useState, useEffect } from 'react';
import { fetchGasPrices } from '../api/etherscan';

function GasPrices() {
  const [gasInfo, setGasInfo] = useState(null);

  useEffect(() => {
    fetchGasPrices().then(data => {
      setGasInfo(data.result);
    });
  }, []);

  if (!gasInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Ethereum Gas Prices</h1>
      <p>Safe Gas Price: {gasInfo.SafeGasPrice} Gwei</p>
      <p>Propose Gas Price: {gasInfo.ProposeGasPrice} Gwei</p>
      <p>Fast Gas Price: {gasInfo.FastGasPrice} Gwei</p>
    </div>
  );
}

export default GasPrices;
