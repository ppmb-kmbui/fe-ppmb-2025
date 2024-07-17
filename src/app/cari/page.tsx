"use client"

import { Button, UserCard, Input, SearchBar, Loader } from "@/components";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import debounce from "debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineChat, HiSearch } from "react-icons/hi";


interface UserProps {
    id?: string,
    email: string,
    fullname: string,
    batch: string,
    faculty: string,
    img_url: string
}

const CariPage: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [friends, setFriends] = useState<UserProps[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const getData = async () => {
        try {
            setIsLoading(true);
            const queryString = new URLSearchParams(searchParams).toString();

            const res = await api({
                method: 'GET',
                url: `api/friends?${queryString}`
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
    }, 400)

    useEffect(() => {
        getData();
    }, [searchParams]);

    // console.log(friends);

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
                            <UserCard key={key} {...data}/>
                        ))}
                    </div>

                    <div className={`${friends.length == 0 ? 'flex' : 'hidden'} justify-center items-center mt-3 italic md:text-2xl text-ppmb-500`}>Tidak ditemukan teman dengan nama tersebut!</div>
                </>
            }

            <div className="flex flex-col items-center gap-[2px] md:gap-1 w-full px-8 lg:px-[100px]">
                <text className="text-lg md:text-2xl font-semibold">Kirim pesan untuk teman-teman KMBUI kamu!</text>
                <div className="flex gap-2 md:gap-4 items-center w-full justify-center">
                    <Input icon={<HiOutlineChat />} placeholder="Kirim pesanmu!" setValue={setMessage} type="rounded" />
                    <Button handleClick={() => {}} label="Kirim" variant="lg"/>
                </div>
            </div>

        </div>
    )
}

export default withAuth(CariPage, 'freshman');