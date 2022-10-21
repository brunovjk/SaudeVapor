import { useEffect, useState } from 'react';
import { Connection } from '@metaplex/js';
import { Account } from '@metaplex-foundation/mpl-core';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

import { Image } from '../../atoms';
import { Box, CircularProgress } from '@material-ui/core';

const connection = new Connection('devnet');

export default function ImageToken({ tokenAddress }) {
    const [data, setData] = useState(null);
    const [imageSrc, setImage] = useState(null);

    useEffect(() => {
        const loadImageData = async (uri) => {
            const response = await fetch(uri);
            const { image } = await response.json();
            setImage(image);
        };

        const getMetadata = async () => {
            if (tokenAddress) {
                try {
                    const metadataPDA = await Metadata.getPDA(tokenAddress);
                    const mintAccInfo = await connection.getAccountInfo(metadataPDA);

                    const {
                        data: { data: metadata },
                    } = Metadata.from(new Account(tokenAddress, mintAccInfo));

                    await loadImageData(metadata.uri);
                    setData(metadata);
                } catch (error) {
                    console.log(error);
                    getMetadata(); // Looping error, need to fix it
                }
            }
        };

        getMetadata();
    }, [tokenAddress]);

    return (
        <>
            {data ? (
                <Box component="a" href={`/token/${tokenAddress}`}>
                    <Image src={imageSrc} alt={data?.name} />
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}
