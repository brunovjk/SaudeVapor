import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Connection } from '@metaplex/js';
import { Account } from '@metaplex-foundation/mpl-core';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { Image } from '../../components/atoms';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
        boxShadow: '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
        borderRadius: theme.spacing(2),
        maxWidth: 500,
    },
    padding: {
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(5),
        },
    },
}));
const connection = new Connection('devnet');

export default function Token() {
    const tokenAdr = decodeURI(window.location.pathname.split('/').pop());
    const classes = useStyles();

    const [data, setData] = useState(null);
    const [imageSrc, setImage] = useState(null);

    useEffect(() => {
        const loadImageData = async (uri) => {
            const response = await fetch(uri);
            const { image } = await response.json();
            setImage(image);
        };

        const getMetadata = async () => {
            const metadataPDA = await Metadata.getPDA(tokenAdr);
            const mintAccInfo = await connection.getAccountInfo(metadataPDA);

            const {
                data: { data: metadata },
            } = Metadata.from(new Account(tokenAdr, mintAccInfo));

            await loadImageData(metadata.uri);
            setData(metadata);
        };

        getMetadata();
    }, [tokenAdr]);

    return (
        <>
            {data && (
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item className={classes.padding}>
                        <Image src={imageSrc} alt={data?.name} className={classes.image} />
                    </Grid>
                    <Grid item className={classes.padding}>
                        <div>
                            <h2>Metadata</h2>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
