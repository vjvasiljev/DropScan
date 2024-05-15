import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

function ConnectedAddress({ onAddressChange }) {
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (address) {
      onAddressChange(address); // This will call the parent function whenever the address changes
    }
  }, [address, onAddressChange]);

  return null; // Return null if there's nothing to render
}

export default ConnectedAddress;
