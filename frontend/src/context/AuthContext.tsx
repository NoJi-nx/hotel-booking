import React, { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";

// define types for state and actions
interface AuthState {
    user: any; 
    loading: boolean;
    error: any; 
}

interface AuthAction {
    type: string;
    payload?: any;
}


const loadUserFromLocalStorage = (): any => {
    const user = localStorage.getItem('user');
    try {
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return null;
    }
};

const initial_state: AuthState = {
    user: loadUserFromLocalStorage(),
    loading: false,
    error: null,
};

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}>({
    state: initial_state,
    dispatch: () => null,
});

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case 'REGISTER_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(AuthReducer, initial_state);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};