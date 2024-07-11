"use client"

import { api } from "@/utils/axios";
import { UserProps } from "@/utils/interface";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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

    const getUser = async (token: string) => {
        // console.log(Cookies.get('token'), "ini token")
        try {
            setIsLoading(true);
            const res = await api({
                method: 'GET',
                url: '/auth/profile',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setIsAuthenticated(true);
            setUser(res.data);
            setToken(token);

        } catch (error: any) {
            setIsAuthenticated(false);
            setUser({});
            setToken('');

        } finally {
            setIsLoading(false);
        }
    }

    const register = async (email: string, fullname: string, password: string, faculty: string, batch: string) => {
        try {
            setIsLoading(true);
            const res = await api({
                method: 'POST',
                url: '/auth/reigster',
                data: { email, fullname, password, faculty, batch }
            });
            router.push("/login");
        } catch (error: any) {
            console.error("Error in register", error);
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

            Cookies.set('token', res.data.token)
            setToken(res.data.token);
            setIsAuthenticated(true);
            getUser(token);
            router.push('/');
        } catch (error: any) {
            console.error("Error in login", error);
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
            Cookies.remove('token');
            router.push('/');
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

    useEffect(() => {
        if (Cookies.get('token')){
            const token = Cookies.get('token') as string;
            getUser(token);
        } else {
            console.log("toke g valid")
        }
    }, [])
    
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

