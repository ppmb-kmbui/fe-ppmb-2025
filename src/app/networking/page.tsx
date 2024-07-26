"use client"

import { Header, LoadingScreen, UserCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { FriendProps } from "@/utils/interface";
import { useEffect, useState } from "react";

const NetworkingPage: React.FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
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

    const handleAccept = (acceptedFriend: FriendProps) => {
        setMenungguPersetujuanFriends(prev => prev.filter(friend => friend.id != acceptedFriend.id));
        setLanjutkanNetworkingFriends(prev => [...prev, {...acceptedFriend, status: "accepted"}])
    }

    const handleReject = (rejectedId: number) => {
        setMenungguPersetujuanFriends(prev => prev.filter(friend => friend.id != rejectedId));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        isFetching ? <LoadingScreen /> :
        <div className="min-h-screen flex flex-col gap-5 md:gap-8 lg:gap-10 pb-10">
            <Header label="Networking" subLabel="KMBUI" />

            <div className="px-3 md:px-5 md:pl-[40px] lg:pl-[60px] flex flex-col gap-1 lg:gap-3">
                <text className="text-2xl lg:text-[27px] leading-[1.6] font-semibold">Menunggu Persetujuan</text>

                <div className={`${menungguPersetujuanFriends.length == 0 ? "hidden" : "grid md:flex"} grid-cols-2 sm:grid-cols-3 md:flex-row md:overflow-x-auto md:max-w-[84vw] lg:max-w-[89vw] items-center gap-3 lg:gap-5 scrollbar-hide lg:pr-3`}>
                    {menungguPersetujuanFriends.map((friend, key) => (
                        <UserCard {...friend} onAccept={() => handleAccept(friend)} onReject={() => handleReject(friend.id)}/>
                    ))}
                </div>

                <text className={`${menungguPersetujuanFriends.length == 0 ? "flex" : "hidden"} lg:text-lg italic w-full text-ppmb-500`}>Tidak ada permintaan pertemanan :(</text>
            </div>

            <div className="px-3 md:px-5 md:pl-[40px] lg:pl-[60px] flex flex-col gap-1 lg:gap-3">
                <text className="text-2xl lg:text-[27px] leading-[1.6] font-semibold">Lanjutkan Networking</text>

                <div className={`${lanjutkanNetworkingFriends.length == 0 ? "hidden" : "grid md:flex"} gap-3 lg:gap-5 grid-cols-2  md:flex-row md:overflow-x-auto md:max-w-[84vw] lg:max-w-[89vw] items-center scrollbar-hide lg:pr-3`}>
                    {lanjutkanNetworkingFriends.map((friend, key) => (
                        <UserCard key={key} {...friend}/>
                    ))}
                    
                </div>

                <text className={`${lanjutkanNetworkingFriends.length == 0 ? "flex" : "hidden"} lg:text-lg italic w-full text-ppmb-500`}>Tidak ada teman yang bisa di-networking saat ini, silahkan follow teman pada page Cari!</text>                
            </div>
        </div>
    )
}

export default withAuth(NetworkingPage, 'freshman');