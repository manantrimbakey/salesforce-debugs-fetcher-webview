import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { GLOBAL_CSS } from "./App";
import axios from "axios";
import React from "react";
import { SERVER_URL } from "./App";

export default function Main() {
    const [message, setMessage] = React.useState<string>("");

    React.useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/message`);
                setMessage(response.data.message);
            } catch (error) {
                console.error("Error fetching message:", error);
                setMessage("Failed to fetch message");
            }
        };

        fetchMessage();
    }, []);

    return (
        <Paper style={GLOBAL_CSS} elevation={3}>
            <Grid container>
                <Grid size={4}>
                    <h1>Hello World</h1>
                </Grid>
            </Grid>
        </Paper>
    );
}
