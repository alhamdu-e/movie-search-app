import React, { createContext, useContext, useState, ReactNode } from "react";

type Token = string | null;

interface AuthContextType {
	token: Token;
	setAuthToken: (newToken: Token) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [token, setToken] = useState<Token>(null);

	const setAuthToken = (newToken: Token) => {
		setToken(newToken);
	};

	return (
		<AuthContext.Provider value={{ token, setAuthToken }}>
			{children}
		</AuthContext.Provider>
	);
}
