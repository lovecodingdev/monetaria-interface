import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"

export const ReserveDetail = () => {
    return (
        <ReserveNormalPaper title="Detail">
            <Stack direction="column" spacing={2}>
                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Price</Typography>
                    <Typography variant="secondary14">$0.06</Typography>
                </Stack>

                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Suppliers</Typography>
                    <Typography variant="secondary14">11113</Typography>
                </Stack>

                <Stack direction='row' justifyContent={'space-between'} style={{
                    width: "100%"
                }}>
                    <Typography variant="secondary14">Borrowers</Typography>
                    <Typography variant="secondary14">517</Typography>
                </Stack>
            </Stack>
        </ReserveNormalPaper>
    );
}