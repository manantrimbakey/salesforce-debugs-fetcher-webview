import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { GLOBAL_CSS } from "./App";
import Container from "./component/Container/Container";

const PAPER_CSS = {
    height: "90vh",
    width: "100%",
    display: "inline-block",
    margin: "auto",
}

export default function Main() {
    return (
        <Paper style={PAPER_CSS} elevation={3}>
            <Grid container>
                <Grid size={12} style={GLOBAL_CSS}>
                    <Container />
                </Grid>
            </Grid>
        </Paper>
    );
}
