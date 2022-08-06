import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"

export const ReserveEModeInfo = () => {
    return (
        <ReserveNormalPaper title="E-Mode info">
            <Stack direction="column" spacing={2}>
                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Max LTV</Typography>
                    <Typography variant="secondary14">Price</Typography>
                </Stack>

                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Liquidation threshold</Typography>
                    <Typography variant="secondary14">97.00%</Typography>
                </Stack>

                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Liquidation penaity</Typography>
                    <Typography variant="secondary14">97.00%</Typography>
                </Stack>
            </Stack>
        </ReserveNormalPaper>
    );
}