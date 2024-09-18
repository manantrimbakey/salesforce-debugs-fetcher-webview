import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import globalProps from "./global_props.js";
const app = express();

// Read global_props.json
async function readGlobalProps() {
    return globalProps;
}

// Start server function
async function startServer() {
    const globalProps = await readGlobalProps();
    const PORT = globalProps.server_port;

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/message", (req, res) => {
        const data = { message: "Hello from Node.js backend!" };
        res.json(data);
    });

    // Start the server and handle potential errors
    const server = app
        .listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
        .on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.error(`Port ${PORT} is already in use. Please choose a different port.`);
            } else {
                console.error(`An error occurred: ${err.message}`);
            }
            process.exit(1);
        });
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
