import { createContext, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Match } from './types';

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
      const matchesRef = useRef<Match[]>([]);
      const [, forceRender] = useState({});
    
      useEffect(() => {
        ws.current = new WebSocket('wss://app.ftoyd.com/fronttemp-service/ws');
    
        ws.current.onopen = () => {
          console.log('Connected to WebSocket');
        };
    
        ws.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            matchesRef.current = data.data;
            setMatches(matchesRef.current);
            forceRender({});
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            setIsError(true);
          }
        };
    
        ws.current.onclose = () => {
          console.log('WebSocket closed');
        };
    
        return () => {
          ws.current?.close();
        };
      }, [matchesRef]);

    const setMatches = (matches: Match[]) => {
        setState((prev) => ({ ...prev, matches }));
    };

    const setIsLoading = (isLoading: boolean) => {
        setState((prev) => ({ ...prev, isLoading }));
    };

    const setIsError = (isError: boolean) => {
        setState((prev) => ({ ...prev, isError }));
    };

    return (
        <MatchesContext.Provider value={{ state, actions: { setMatches, setIsLoading, setIsError } }}>
            {children}
        </MatchesContext.Provider>
    );
};

export { MatchesContext, MatchesContextProvider };