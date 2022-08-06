import { Paper, useTheme, Typography } from "@mui/material";
import borderGradient from "src/layouts/borderGradient";

interface ReserveNormalPaperInterface {
    title?: string;
}

export const ReserveNormalPaper: React.FC<ReserveNormalPaperInterface> = ({ title, children }) => {
    const theme = useTheme();
    return (
        <Paper
            sx={theme => ({
                p: 4, 
                ...borderGradient
            })}
        >
            <Typography variant='h4' color="text.secondary" style={{
                marginBottom: '10px', 
                fontWeight: "bold"
            }}>{title}</Typography>
            {children}
        </Paper>
    )
}