"use client"

import { Button, UserCard, Input, SearchBar, Loader, LoadingScreen } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { FriendProps, UserProps } from "@/utils/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineChat } from "react-icons/hi";
import { z } from "zod";

interface QuoteProps {
    quote: string
    fullname: string
    faculty: string
    batch: string
}

const quoteFormSchema = z.object({
    quote: z.string().min(1, { message: "Pesan minimal terdiri dari 1 karakter!" }).max(100, { message: "Pesan maksimal terdiri dari 100 karakter!" })
})

const CariPage: React.FC = () => {
    const [friends, setFriends] = useState<FriendProps[]>([]);
    const [randomQuote, setRandomQuote] = useState<QuoteProps>({} as any);

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isSubmitQuote, setIsSubmitQuote] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const { token } = useAuth(); 
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasFetchedQuote = useRef(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof quoteFormSchema>>({
        resolver: zodResolver(quoteFormSchema),
    })

     const getData = useCallback(async () => {
        try {
            setIsSearching(true);
            const queryString = searchParams.toString();
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
                setIsSearching(false);
            }, 500);
        }
    }, [searchParams, token])

    const getRandomQuote = useCallback(async () => {
        try {
            setIsFetching(true);
            const res = await api({
                method: 'GET',
                url: "api/quotes"
            });
            const { quote, user: { fullname, faculty, batch } } = await res.data;
            setRandomQuote({ quote, fullname, faculty, batch });
        } catch (error: any) {
            console.error("Error in getting random quote");
        } finally {
            setIsFetching(false);
        }
    }, []);

    const handleSubmitQuote = async (data: z.infer<typeof quoteFormSchema>) => {
        try {
            setIsSubmitQuote(true);
            await api({
                method: 'POST',
                url: 'api/quotes',
                data: {
                    quote: data.quote
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            reset();
        } catch (error: any) {
            console.error("Error in submitting quote", error)
        } finally {
            setIsSubmitQuote(false);
        }
    };

    useEffect(() => {
        getData();
    }, [searchParams])

    useEffect(() => {
        if (!hasFetchedQuote.current) {
            getRandomQuote();
            hasFetchedQuote.current = true;
        }
    }, [getRandomQuote]);

    const handleSearch = debounce((query: string) => {
        if (query) {
            router.push(`?name=${query}`)
        } 
        else {
            router.push("/cari");
        }
    }, 300);

    return (
        isFetching ? <LoadingScreen /> :
        <div className="min-h-screen flex flex-col items-center gap-10">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-300 px-[30px] md:px-[100px] flex flex-col py-10 gap-3 items-center w-full">
                <div className="flex text-ppmb-800 justify-center items-center text-xl md:text-3xl lg:text-4xl gap-2 font-semibold">
                    <text className="text-ppmb-000">NETWORKING</text>
                    <text>dengan</text>
                    <text>KMB</text>
                </div>

                <SearchBar handleSearch={handleSearch}/>

                <div className="text-white flex flex-col items-center text-center mt-2 md:mt-4">
                    <text className="font-semibold md:text-lg">"{randomQuote.quote}"</text>
                    <text className="italic text-ppmb-100 font-light text-sm md:text-[16px]">── {randomQuote.fullname}, {randomQuote.faculty} {randomQuote.batch}</text>
                </div>
            </div>

            {isSearching ? 
                <Loader />
                : 
                <>
                    <div className={`${friends.length == 0 ? 'hidden' : 'grid'} grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-7 lg:gap-6 px-3 md:px-5 lg:px-7`}>
                        {friends.map((friend, key) => (
                            <UserCard key={key} {...friend} />
                        ))}
                    </div>

                    <div className={`${friends.length == 0 ? 'flex' : 'hidden'} justify-center items-center italic md:text-2xl text-ppmb-500`}>Tidak ditemukan teman dengan nama tersebut!</div>
                </>
            }

            <div className="flex flex-col items-center gap-[2px] md:gap-1 w-full px-8 lg:px-[100px] mb-10">
                <text className="text-lg md:text-2xl font-semibold">Kirim pesan ke teman-teman kamu!</text>
                <form onSubmit={handleSubmit(handleSubmitQuote)} className="flex gap-2 md:gap-4 items-center w-full justify-center">
                    <Input {...register("quote")} placeholder="Kirim pesanmu!" leftIcon={<HiOutlineChat />} size="lg" error={errors.quote?.message}/>
                    <Button label="Kirim" size="lg" type="submit" disabled={isSubmitQuote} className="self-start"/>
                </form>
            </div>

        </div>
    )
}

export default withAuth(CariPage, 'authenticated');