"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const ROUTE_ROLES = ["optional", "authenticated", "freshman", "admin"] as const;
// optional = no authentication needed
// authenticated = needs authenticated (general)
// freshman = only for freshman (batch 2024)
// admin = only admin can access

type RouteRole = (typeof ROUTE_ROLES)[number];

const withAuth = (Component: React.FC, requiredRole: RouteRole) => {
    const AuthComponent = () => {
        const { isAuthenticated, isLoading, user, logout, getUser } = useAuth();
        const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
        const router = useRouter();

        const checkAuth = useCallback(() => {
            const token = Cookies.get('token');
      
            if (!token) {
                setIsDataFetched(true);
                isAuthenticated && logout();
                router.push('/signup');
                return;
            }
      
            if (!isAuthenticated) {
                getUser();
                setIsDataFetched(true);
            }
        }, [isAuthenticated, logout, getUser, router]); 

        useEffect(() => {
            checkAuth();
        }, [checkAuth]);

        useEffect(() => {
            console.log("jalan lagi kok");
            if (!isLoading && isDataFetched) {
                console.log("masuk ke !isloading");

                if (!isAuthenticated) { 
                    router.push('/');
                } else {
                    console.log("masuk ke else");
                    
                }
            }

            if (requiredRole == 'admin' && !user.is_admin || requiredRole == 'authenticated' && !isAuthenticated || requiredRole == 'freshman' && user.batch != '2024') {
                router.push('/');
            }

        }, [isLoading, isAuthenticated, router, isDataFetched]);
      
        if (isLoading || !isAuthenticated) {
            return (
                <div className="min-h-screen flex flex-col bg-ppmb- justify-center items-center gap-5 px-[60px]">
                    <Image
                        src={'/image/mascot.png'}
                        alt="mascot"
                        width={600}
                        height={600}
                    />
                    
                    <div className="text-3xl font-semibold text-center">
                        <text>Loading</text>
                        <span className="animate-dots">
                            <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                        </span>
                    </div>
                </div>
            )
        }
        

        return <Component />;
    }
    return AuthComponent;
}

export default withAuth;