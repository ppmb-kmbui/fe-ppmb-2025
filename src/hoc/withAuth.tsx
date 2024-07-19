"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { LoadingScreen } from "@/components";

const ROUTE_ROLES = ["optional", "authenticated", "freshman", "admin"] as const;

type RouteRole = (typeof ROUTE_ROLES)[number];

const withAuth = <P extends object>(Component: React.FC<P>, requiredRole: RouteRole) => {
    const AuthComponent: React.FC<P> = (props) => {
        const { isAuthenticated, isLoading, user, logout, getUser } = useAuth();
        const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
        const router = useRouter();

        const checkAuth = useCallback(() => {
            const token = Cookies.get('token');
      
            if (!token) {
                setIsDataFetched(true);
                if (isAuthenticated) {
                    logout();
                }
                router.push('/signup');
                return;
            }
      
            if (!isAuthenticated) {
                getUser();
            }
            setIsDataFetched(true);
        }, [isAuthenticated, logout, getUser, router]); 

        useEffect(() => {
            checkAuth();
        }, [checkAuth]);



        useEffect(() => {
            if (!isLoading && isDataFetched) {
                if (!isAuthenticated) {
                    router.push('/');
                } else {
                    if ((requiredRole === 'admin' && !user?.isAdmin) || 
                        (requiredRole === 'authenticated' && !isAuthenticated) || 
                        (requiredRole === 'freshman' && user?.batch !== 2024)) {
                        router.push('/');
                    }
                }
            }
        }, [isLoading, isAuthenticated, user, router, isDataFetched, requiredRole]);
        
        if (isLoading || !isAuthenticated) {
            return <LoadingScreen />;
        }
        return <Component {...props}/>;
    }
    return AuthComponent;
}

export default withAuth;