import { useState, useEffect, useRef } from "react";
import ProjectPathResolver from "../ProjectPathResolver/ProjectPathResolver";
import LogViewerScreen from "../LogViewerScreen/LogViewerScreen";

export type GlobalData = {
    screenName: string;
    projectPath: string;
};

export default function Container() {

    let initialized = useRef(false);

    const [globalData, setGlobalData] = useState<GlobalData>({
        screenName: "",
        projectPath: "",
    });

    const [isPathSelectorScreen, setIsPathSelectorScreen] = useState(true);
    const [isLogViewerScreen, setIsLogViewerScreen] = useState(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            
            // code here
        }
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
