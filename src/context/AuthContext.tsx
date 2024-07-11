"use client"

import { api } from "@/utils/axios";
import { UserProps } from "@/utils/interface";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
    user: UserProps
    token: string
    isAuthenticated: boolean
    isLoading: boolean
    register: (email: string, fullname: string, password: string, faculty: string, batch: string) => void
    login: (email: string, password: string) => void
    logout: () => void
}

export const AuthContext = createContext({
    user: {},
    token: "",
    isAuthenticated: false,
    isLoading: false,
    register: (email: string, fullname: string, password: string, faculty: string, batch: string) => {},
    login: (email: string, password: string) => {},
    logout: () => {},
  } as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProps>({});
    const [token, setToken] = useState<string>('');

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const register = async (email: string, fullname: string, password: string, faculty: string, batch: string) => {
        try {
            setIsLoading(true);
            const res = await api({
                method: 'POST',
                url: '/auth/reigster',
                data: { email, fullname, password, faculty, batch }
            })
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await api({
                method: 'POST',
                url: '/auth/login',
                data: { email, password }
            })

            if (res.status != 200) {
                return;
            }

            Cookies.set('token', res.data.token)
            setToken(res.data.token);
            setIsAuthenticated(true);
            setUser(res.data.user);
            router.push('/');
            
            
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        try{
            setIsLoading(true);
            setIsAuthenticated(false);
            setToken('');
            setUser({});
            // Cookies
        } finally {
            setIsLoading(false);
        }
    }

    const contextValue = {
        token: token,
        user: user,
        isLoading: isLoading,
        isAuthenticated: isAuthenticated,
        register: register,
        login: login,
        logout: logout,
      };
    
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

