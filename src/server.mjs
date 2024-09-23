import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import globalProps from "./global_props.js";
import { exec } from "child_process";
import chalk from "chalk";
import { promisify } from "util";

const app = express();
app.use(express.json());

const execPromise = promisify(exec);

let projectPath = "";
let userId = "";

// Read global_props.json
async function readGlobalProps() {
    return globalProps;
}

// Start server function
async function startServer(port) {
    const globalProps = await readGlobalProps();
    const PORT = port || globalProps.server_port;

    app.use(cors());
    app.use(bodyParser.json());

    async function fetchLogsForCurrentUser() {
        // const command = `sf data query --query "SELECT Id FROM ApexLog WHERE LogUserId='${userId}' ORDER BY LastModifiedDate ASC" --json`;
        const command = `sf data query --query "SELECT Id FROM ApexLog WHERE LogUserId='${'0058I000003VA12'}' ORDER BY LastModifiedDate ASC LIMIT 2000" --json`;
        const options = { cwd: projectPath }; // Set the current working directory to projectPath

        try {
            const { stdout, stderr } = await execPromise(command, options);

            if (stderr) {
                console.error("Error executing command:", stderr);
            }

            if (stdout) {
                const logs = JSON.parse(stdout);

                return logs;
            }
        } catch (err) {
            console.error("Failed to execute command:", err);
        }
    }

    app.post("/updateProjectPath", async (req, res) => {
        // store the project path in this server context
        projectPath = req?.body?.projectPath;

        // get salesforce user record id using the project path
        const salesforceUserRecordId = await getSalesforceUserRecordId(projectPath);
        userId = salesforceUserRecordId;

        res.json({ salesforceUserRecordId });
    });

    app.get(`/logs`, async (_req, res) => {
        let logsJson = await fetchLogsForCurrentUser();
        res.json(logsJson);
    });

    async function getSalesforceUserRecordId(projectPath) {
        let currentUserDetails = await getCurrentUserDetails(projectPath);
        return currentUserDetails;
    }

    async function getCurrentUserDetails(projectPath) {
        const command = `sf org display user --json`;
        const options = { cwd: projectPath }; // Set the current working directory to projectPath

        try {
            const { stdout, stderr } = await execPromise(command, options);

            if (stderr) {
                console.error("Error executing command:", stderr);
            }

            if (stdout) {
                const userDetails = JSON.parse(stdout);

                const currentUserId = userDetails?.result?.id;

                console.log(chalk.green("Current user ID:"), currentUserId); // Green color

                if (!currentUserId) {
                    console.error("Current user not found");
                    return null;
                }

                return currentUserId;
            }
        } catch (err) {
            console.error("Failed to execute command:", err);
        }
    }

    // Start the server and handle potential errors
    const server = app
        .listen(PORT, () => {})
        .on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.error(`Port ${PORT} is already in use. Please choose a different port.`);

                startServer(PORT+1);
            } else {
                console.error(`An error occurred: ${err.message}`);
            }
            process.exit(1);
        })
        .on("close", () => {
            console.log("Server closed");
        })
        .on("listening", () => {
            console.log("Server listening on port", PORT);
            startReactClient();
        });

    let reactProcess = null;

    async function startReactClient() {
        const currentDir = process.cwd();
        // const parentDir = path.dirname(currentDir);
        // Start React app as a child process
        const { spawn } = await import("child_process");
        reactProcess = spawn("npm", ["run", "start"], {
            stdio: "inherit",
            shell: true,
            env: { ...process.env, BROWSER: "none" },
            // cwd: parentDir
            cwd: currentDir,
        });
    }

    // Handle server shutdown
    process.on("SIGINT", () => {
        reactProcess.kill();
        server.close(() => {
            process.exit(0);
        });
    });
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
