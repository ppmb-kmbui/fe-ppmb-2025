"use client"

import { Button, UserCard, Input, SearchBar, Loader } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { UserProps } from "@/utils/interface";
import debounce from "debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineChat, HiSearch } from "react-icons/hi";


// interface UserProps {
//     id?: string,
//     email: string,
//     fullname: string,
//     batch: string,
//     faculty: string,
//     img_url: string
// }

interface QuoteProps {
    quote: string
    fullname: string
    faculty: string
    batch: string
}

interface FriendProps extends UserProps {
    status: "not_connected" | "meminta_konfirmasi" | "menunggu_konfirmasi" | "accepted" | "sedang_networking" | "done"
}

const CariPage: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [friends, setFriends] = useState<FriendProps[]>([]);
    const [randomQuote, setRandomQuote] = useState<QuoteProps>({} as any);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { token } = useAuth(); 
    const searchParams = useSearchParams();
    const router = useRouter();

    const getData = async () => {
        try {
            setIsLoading(true);
            const queryString = new URLSearchParams(searchParams).toString();
            const res = await api({
                method: 'GET',
                url: `api/friends?${queryString}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFriends(await res.data.friends);

        } catch (error: any) {
            console.error("Error in getting friends data")
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 600);
        }
    }

    const handleSearch = debounce((query: string) => {
        if (query) {
            router.push(`?name=${query}`)
        } 
        else {
            router.push("/cari");
        }
    }, 400);

    const getRandomQuote = async () => {
        try {
            const res = await api({
                method: 'GET',
                url: "api/quotes"
            })
            const { quote, user: { fullname, faculty, batch } } = await res.data;
            setRandomQuote({ quote, fullname, faculty, batch });

        } catch (error: any) {
            console.error("Error in getting random quote")
        }
    }

    useEffect(() => {
        getData();
    }, [searchParams]);

    useEffect(() => {
        getRandomQuote();
    }, []);


    console.log(friends, "ini teman");
    console.log(randomQuote, "ini random kuwot")

    return (
        <div className="min-h-screen flex flex-col items-center gap-10">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-300 px-[30px] md:px-[100px] flex flex-col py-10 gap-3 items-center w-full">
                <div className="flex text-ppmb-800 justify-center items-center text-xl md:text-3xl lg:text-4xl gap-2 font-semibold">
                    <text className="text-ppmb-000">NETWORKING</text>
                    <text>dengan</text>
                    <text>KMB</text>
                </div>

                <SearchBar handleSearch={handleSearch}/>

                <div className="text-white flex flex-col items-center text-center mt-2 md:mt-4">
                    <text className="font-semibold md:text-lg">"Semangat buat para maba, jangan lupa networking"</text>
                    <text className="italic text-ppmb-100 font-light text-sm md:text-[16px]">── Salmon floss, Fasilkom 2024</text>
                </div>
            </div>

            {isLoading ? 
                <Loader />
                : 
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-7 lg:gap-6 px-3 md:px-5 lg:px-7">
                        {friends.map((data, key) => (
                            // TODO: Add fixed batch data
                            <UserCard key={key} {...data} batch="2024"/>
                        ))}
                    </div>

                    <div className={`${friends.length == 0 ? 'flex' : 'hidden'} justify-center items-center mt-3 italic md:text-2xl text-ppmb-500`}>Tidak ditemukan teman dengan nama tersebut!</div>
                </>
            }

            <div className="flex flex-col items-center gap-[2px] md:gap-1 w-full px-8 lg:px-[100px] mb-10">
                <text className="text-lg md:text-2xl font-semibold">Kirim pesan untuk teman-teman KMBUI kamu!</text>
                <div className="flex gap-2 md:gap-4 items-center w-full justify-center">
                    <Input icon={<HiOutlineChat />} placeholder="Kirim pesanmu!" setValue={setMessage} type="rounded" />
                    <Button handleClick={() => {}} label="Kirim" variant="lg"/>
                </div>
            </div>

        </div>
    )
}

export default withAuth(CariPage, 'authenticated');