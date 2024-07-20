"use client"

import { Header, LoadingScreen, UserCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { FriendProps } from "@/utils/interface";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ConnectionRequestProps {
    connection_request_received: []
    connection_request_send: []
}

const NetworkingPage: React.FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [menungguPersetujuanFriends, setMenungguPersetujuanFriends] = useState<FriendProps[]>([]);
    const [lanjutkanNetworkingFriends, setLanjutkanNetworkingFriends] = useState<FriendProps[]>([]);

    const { token } = useAuth();

    const getData = async () => {
        try {
            setIsFetching(true);
            const res = await api({
                url: "api/friends",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const friends: FriendProps[] = res.data.friends;

            console.log(friends, "ini friends dalem try")

            setMenungguPersetujuanFriends(
                friends.filter(friend => friend.status === "meminta_konfirmasi")
            );

            setLanjutkanNetworkingFriends(
                friends.filter(friend => friend.status === "accepted" || friend.status === "sedang_networking")
            );

        } catch (error: any) {
            console.error("Error while getting networking data");
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    console.log(lanjutkanNetworkingFriends, "lanjut")

    return (
        isFetching ? <LoadingScreen /> :
        <div className="min-h-screen flex flex-col gap-10 pb-10">
            <Header label="Networking" subLabel="KMBUI" />

            <div className="px-5 md:pl-[40px] lg:pl-[60px]">
                <text className="text-[27px] leading-[1.6] font-semibold">Menunggu Persetujuan</text>

                <div className="grid grid-cols-2 md:flex md:flex-row md:overflow-x-auto md:max-w-[84vw] lg:max-w-[89vw] items-center gap-5 scrollbar-hide py-3 pr-3">
                    
                    {menungguPersetujuanFriends.map((friend, key) => (
                        <UserCard key={key} {...friend} />
                    ))}

                    <text className={`${menungguPersetujuanFriends.length == 0 ? "flex" : "hidden"} text-lg italic w-full text-ppmb-500`}>Tidak ada permintaan pertemanan :(</text>
                </div>
            </div>

            <div className="pl-[40px] lg:pl-[60px]">
                <text className="text-[27px] leading-[1.6] font-semibold">Lanjutkan Networking</text>

                <div className="flex flex-row overflow-x-auto max-w-[84vw] lg:max-w-[89vw] items-center gap-5 scrollbar-hide py-3 pr-3">
                    {lanjutkanNetworkingFriends.map((friend, key) => (
                        <UserCard key={key} {...friend}/>
                    ))}

                    <text className={`${lanjutkanNetworkingFriends.length == 0 ? "flex" : "hidden"} text-lg italic w-full text-ppmb-500`}>Tidak ada teman yang bisa di-networking saat ini, silahkan follow teman pada page Cari!</text>
                </div>
            </div>
        </div>
    )
}

export default withAuth(NetworkingPage, 'freshman');