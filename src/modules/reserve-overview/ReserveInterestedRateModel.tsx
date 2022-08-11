import { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import ReactApexChart from 'react-apexcharts';
// import { DifferencePercetage } from "./"
import dynamic from 'next/dynamic'

const DynamicReactApexChartNoSSR = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)

export const ReserveInterestedRateModel = () => {
    console.log('OKOKK');
    const [options] = useState({
        chart: {
            type: 'area',
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            show: false,
            categories: ['Utilizaation(%)', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            tickAmount: 10,
        },
        yaxis: {
            tickAmount: 3.
        },
    });
    const [series] = useState([{
        name: 'Sales',
        data: [20, 34, 200, 10, 213, 121, 20, 222, 105, 140]
    }]);
    return (
        <ReserveNormalPaper title="Interested Tate Model">
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: "10px" }}>
                            <Typography variant={"secondary8"}>Net APY</Typography>
                            <span>
                                <FormattedNumber
                                    value={60.56}
                                    variant="h3"
                                    symbol={'usd'}
                                />
                                {/* <DifferencePercetage /> */}
                            </span>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: "10px" }}>
                            <Typography variant={"secondary8"}>Borrow Balance</Typography>
                            <FormattedNumber
                                value={25.56}
                                variant="h3"
                                symbol={'usd'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: "10px" }}>
                            <Typography variant={"secondary8"}>Supply Balance</Typography>
                            <FormattedNumber
                                value={60.56}
                                variant="h3"
                                symbol={'usd'}
                            />
                        </Box>
                    </Box>

                </Stack>
            </Stack>
            <Box sx={{
                position: 'relative'
            }}>
                <Typography variant={"secondary8"} style={{
                    position: 'absolute',
                    left: '43px',
                    top: '19px',
                    fontSize: '14px'
                }}>APY %</Typography>
                <DynamicReactApexChartNoSSR options={options} series={series} type={"area"} height={200} />
            </Box>
        </ReserveNormalPaper>
    );
}