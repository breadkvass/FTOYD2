import { createContext, FC, ReactElement, useEffect, useRef, useState } from "react";
import { Match } from "./types";

type MatchesState = {
    matches: Match[];
    isLoading: boolean;
    isError: boolean;
};

type MatchesActions = {
    setMatches: (matches: Match[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsError: (isError: boolean) => void;
};

type MatchesContextType = {
    state: MatchesState;
    actions: MatchesActions;
};

const MatchesContext = createContext<MatchesContextType>({
    state: {
        matches: [],
        isLoading: false,
        isError: false
    },
    actions: {
        setMatches: () => {},
        setIsLoading: () => {},
        setIsError: () => {}
    }
});

type MatchesContextProviderProps = {
    children: ReactElement;
};

const MatchesContextProvider: FC<MatchesContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<MatchesState>({
        matches: [],
        isLoading: false,
        isError: false
    });

    const ws = useRef<WebSocket | null>(null);

    const setMatches = (matches: Match[]) => {
        setState((prev) => ({ ...prev, matches }));
    };

    const setIsLoading = (isLoading: boolean) => {
        setState((prev) => ({ ...prev, isLoading }));
    };

    const setIsError = (isError: boolean) => {
        setState((prev) => ({ ...prev, isError }));
    };

    useEffect(() => {
        ws.current = new WebSocket("wss://app.ftoyd.com/fronttemp-service/ws");

        ws.current.onopen = () => console.log("WebSocket connected");
        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMatches(data.data);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };
    
        ws.current.onerror = (error) => console.error("WebSocket error:", error);
        ws.current.onclose = () => console.log("WebSocket disconnected");
    
        return () => {
            ws.current?.close();
        };
    }, []);

    return (
        <MatchesContext.Provider value={{ state, actions: { setMatches, setIsLoading, setIsError } }}>
            {children}
        </MatchesContext.Provider>
    );
};

export { MatchesContext, MatchesContextProvider };