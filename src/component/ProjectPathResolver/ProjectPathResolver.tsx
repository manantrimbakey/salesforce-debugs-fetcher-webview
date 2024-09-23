import React, { useState } from "react";
import { Input, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GlobalData } from "../Container/Container";
import { SERVER_URL } from "../../App";
import axios from "axios";
interface ProjectPathResolverProps {
    globalData: GlobalData;
}

/**
 * ProjectPathResolver is a component that allows the user to enter the project path and submit it to the server.
 * @param {GlobalData} globalData - The global data object that contains the project path.
 * @param {Function} routeToNextScreen - A function that routes to the next screen.
 * @returns 
 */
export default function ProjectPathResolver({
    globalData,
    routeToNextScreen,
}: {
    globalData: GlobalData;
    routeToNextScreen: Function;
}) {
    const [projectPath, setProjectPath] = useState<string>(globalData.projectPath || "");

    const handleSubmit = async () => {
        // do a post request to the server to update the project path
        let response = await axios.post(`${SERVER_URL}/updateProjectPath`, { projectPath });
        // handle the response with success and error messages
        if (response.status === 200) {
            globalData.projectPath = projectPath;
            routeToNextScreen({ currentScreen: "pathSelector", nextScreen: "logViewer" });
            console.log("Project path updated successfully");
        } else {
            console.log("Failed to update project path");
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Input
                        type="text"
                        placeholder="Enter project path"
                        onChange={(e) => setProjectPath(e.target.value)}
                        fullWidth
                    ></Input>
                </Grid>
                <Grid size={4}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
