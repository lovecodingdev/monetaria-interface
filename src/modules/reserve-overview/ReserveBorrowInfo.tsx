import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"

export const ReserveBorrowInfo = () => {
    return (
        <ReserveNormalPaper title="Borrow info">
            <Stack direction="column" spacing={2}>
                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Total borrowed</Typography>
                    <Typography variant="secondary14">Pri37554Kce</Typography>
                </Stack>

                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">APY, variable</Typography>
                    <Typography variant="secondary14">1.50%</Typography>
                </Stack>

                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">APY, stable</Typography>
                    <Typography variant="secondary14">5.32%</Typography>
                </Stack>
                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Reserve factor</Typography>
                    <Typography variant="secondary14">5.32%</Typography>
                </Stack>
            </Stack>
        </ReserveNormalPaper>
    );
}