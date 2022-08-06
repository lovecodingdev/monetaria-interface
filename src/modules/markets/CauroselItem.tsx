import react from "react";
import { Box, Typography } from "@mui/material";
import { TokenIcon } from '../../components/primitives/TokenIcon';
import { ComputedReserveData } from '../../hooks/app-data-provider/useAppDataProvider';
import { IncentivesCard } from '../../components/incentives/IncentivesCard';

export const CauroselItem = (props) => {
    // console.log("props:", props);
    return (
        <Box sx={{
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            border: '1px solid #719aad38', 
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.609) 100%)",
        }}>
            <TokenIcon symbol={props.iconSymbol} fontSize="large" />
            <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <Typography variant="subheader1" gutterBottom component="div">
                    {String(props.name).length > 12 ? (props.name.slice(0, 12) + "...") : props.name }
                </Typography>
                <Typography variant="h4" gutterBottom component="p" style={{ display: 'flex', alignItems: 'center' }}>
                    <b>{props.symbol}</b>&nbsp;
                    <font color="#06D8B7">
                        <IncentivesCard
                            value={props.supplyAPY}
                            incentives={props.aIncentivesData || []}
                            symbol={props.symbol}
                            variant="main16"
                            symbolsVariant="secondary16" />
                    </font>
                </Typography>
            </Box>
        </Box>
    )
}