import { useState, useEffect, useRef } from "react";
import { SERVER_URL } from "../../App";
import axios from "axios";
import ProjectPathResolver from "../ProjectPathResolver/ProjectPathResolver";
import LogViewerScreen from "../LogViewerScreen/LogViewerScreen";

export type GlobalData = {
    screenName: string;
    projectPath: string;
};

export default function Container() {
    const [data, setData] = useState(null);

    let initialized = useRef(false);

    const [globalData, setGlobalData] = useState<GlobalData>({
        screenName: "",
        projectPath: "",
    });

    const [isPathSelectorScreen, setIsPathSelectorScreen] = useState(true);
    const [isLogViewerScreen, setIsLogViewerScreen] = useState(false);

    useEffect(() => {
        // const fetchMessage = async () => {
        //     try {
        //         if (!initialized.current) {
        //             initialized.current = true;

        //             console.log("rendered once");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching message:", error);
        //         // setData(null);
        //     }
        // };

        // fetchMessage();
    }, []);

    const routeToNextScreen = (params: { currentScreen: string; nextScreen: string }) => {
        setGlobalData({ ...globalData, screenName: params.nextScreen });
        if (params.nextScreen === "pathSelector") {
            setIsPathSelectorScreen(true);
            setIsLogViewerScreen(false);
        } else if (params.nextScreen === "logViewer") {
            setIsLogViewerScreen(true);
            setIsPathSelectorScreen(false);
        }
    };

    return (
        <div>
            {isPathSelectorScreen && (
                <ProjectPathResolver globalData={globalData} routeToNextScreen={routeToNextScreen} />
            )}
            {isLogViewerScreen && <LogViewerScreen />}
        </div>
    );
}
