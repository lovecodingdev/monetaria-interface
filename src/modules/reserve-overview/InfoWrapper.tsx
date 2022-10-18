import { useTheme, Typography, Box } from "@mui/material";
import { ReactNode } from "react";
import borderGradient from "src/layouts/borderGradient";

export const InfoWrapper = ({ children }: { children: ReactNode }) => {
    const theme = useTheme();
    return (
        <Box
            sx={theme => ({
                p: 2, 
            })}
        >
            {children}
        </Box>
    )
}