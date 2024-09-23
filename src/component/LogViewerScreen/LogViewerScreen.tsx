import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../../App";

export default function LogViewerScreen() {
    let initialized = useRef(false);
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        const response = await axios.get(`${SERVER_URL}/logs`);
        const data = response.data;
        console.log(data);
    };

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            fetchLogs();
        }
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography align="center" variant="h4">
                    Log Viewer
                </Typography>
            </Grid>
            <Grid size={12}></Grid>
        </Grid>
    );
}
