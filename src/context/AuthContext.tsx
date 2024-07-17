"use client"

import { api } from "@/utils/axios";
import { DEFAULT_USER } from "@/utils/const";
import { UserProps } from "@/utils/interface";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: UserProps
    token: string
    isAuthenticated: boolean
    isLoading: boolean
    register: (email: string, batch: string, fullname: string, password: string, faculty: string, imgUrl: string) => void
    login: (email: string, password: string) => void
    logout: () => void
    getUser: () => void
}

export const AuthContext = createContext({
    user: DEFAULT_USER,
    token: "",
    isAuthenticated: false,
    isLoading: false,
    register: (email: string, batch: string, fullname: string, password: string, faculty: string, imgUrl: string) => {},
    login: (email: string, password: string) => {},
    logout: () => {},
  } as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProps>(DEFAULT_USER);
    const [token, setToken] = useState<string>('');

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const getUser = async (token: string = Cookies.get('token') as string) => {
        try {
            setIsLoading(true);
            console.log(token);
            const res = await api({
                method: 'GET',
                url: 'api/auth/profile',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setIsAuthenticated(true);
            setUser(res.data);
            setToken(token);

        } catch (error: any) {
            setIsAuthenticated(false);
            setUser(DEFAULT_USER);
            setToken('');

        } finally {
            setIsLoading(false);
        }
    }

    const register = async (email: string, batch: string, fullname: string, password: string, faculty: string, imgUrl: string) => {
        try {
            setIsLoading(true);
            const res = await api({
                method: 'POST',
                url: 'api/auth/register',
                data: { email, batch, fullname, password, faculty, imgUrl }
            });
            router.push("/login");
        } catch (error: any) {
            console.error("[Auth context] error in register", error);
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await api({
                method: 'POST',
                url: 'api/auth/login',
                data: { email, password }
            });

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
            setUser(DEFAULT_USER);
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
        getUser: getUser
    };

    useEffect(() => {
        if (Cookies.get('token')){
            const token = Cookies.get('token') as string;
            getUser(token);
        } else {
            console.log("token g valid")
        }
    }, [])
    
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}