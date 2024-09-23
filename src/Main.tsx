import Grid from "@mui/material/Grid2";
import { GLOBAL_CSS } from "./App";
import Container from "./component/Container/Container";
import { Box, LinearProgress } from "@mui/material";
import { useState } from "react";

export function toggleIsLoading(isLoading: boolean) {
    window.dispatchEvent(new CustomEvent("isLoading", { detail: { isLoading } }));
}

export default function Main() {

    const [isLoading, setIsLoading] = useState(false);
    window.addEventListener("isLoading", (event: any) => {
        setIsLoading(event.detail.isLoading);
    });

    return (
        <>
            {isLoading && <LinearProgress />}
            <Box>
                <Grid container>
                    <Grid size={12} style={GLOBAL_CSS}>
                        <Container />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
