import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,
    SolletExtensionWalletAdapter,
} from '@solana/wallet-adapter-wallets';

import NFTCollection from './NFTCollection';

require('@solana/wallet-adapter-react-ui/styles.css');

const ConnectWalletButton = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default ConnectWalletButton;

function Context({ children }) {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter(),
            new SolletExtensionWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

function Content() {
    return (
        <>
            <NFTCollection />
        </>
    );
}
