"use client";

import { Button, UserCard, Input, Loader, LoadingScreen } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import {
  APIResponse,
  FriendProps,
  FriendsAPIResponse,
  UserProps,
} from "@/utils/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "debounce";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineChat, HiSearch } from "react-icons/hi";
import { z } from "zod";

import bgCariTeman from "@/assets/background/bg-cari-teman.png";
import cariTemanKmb from "@/assets/graphic-elements/cari-teman-kmb.svg";

interface QuoteProps {
  quote: string;
  user: {
    fullname: string;
    faculty: string;
    batch: string;
  };
}

const quoteFormSchema = z.object({
  quote: z
    .string()
    .min(1, { message: "Pesan minimal terdiri dari 1 karakter!" })
    .max(100, { message: "Pesan maksimal terdiri dari 100 karakter!" }),
});

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
  });

  const getData = useCallback(async () => {
    try {
      setIsSearching(true);
      const queryString = searchParams.toString();
      const res = await api({
        method: "GET",
        url: `friends?${queryString}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload: APIResponse<FriendsAPIResponse> = res.data;

      if (payload.data!.friends == undefined) {
        setFriends([]);
      } else {
        setFriends(payload.data!.friends!);
      }
    } catch (error: any) {
      console.error("Error in getting friends data");
    } finally {
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  }, [searchParams, token]);

  const getRandomQuote = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await api({
        method: "GET",
        url: "quotes",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload: QuoteProps = res.data;

      setRandomQuote(payload);
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
        method: "POST",
        url: "quotes",
        data: {
          quote: data.quote,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
    } catch (error: any) {
      console.error("Error in submitting quote", error);
    } finally {
      setIsSubmitQuote(false);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  useEffect(() => {
    if (!hasFetchedQuote.current) {
      getRandomQuote();
      hasFetchedQuote.current = true;
    }
  }, [getRandomQuote]);

  const handleSearch = debounce((query: string) => {
    if (query) {
      // Take note that this is a relative path to /cari?name=${query}
      router.push(`?name=${query}`);
    } else {
      // While this is an absolute path
      router.push("/cari");
    }
  }, 300);

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex min-h-screen flex-col items-center gap-4 md:gap-5 lg:gap-8">
      <Image
        src={bgCariTeman}
        width={0}
        height={0}
        sizes="100vw"
        alt="bg"
        className="fixed top-0 -z-50 h-auto w-full opacity-50"
      />
      <div className="flex w-full flex-col items-center gap-3 px-[30px] py-10 md:px-[100px]">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={cariTemanKmb}
            alt="Networking dengan KMB"
            sizes="100vw"
            height={100}
            width={100}
            className="h-10 w-auto md:h-14 lg:h-18"
          />
        </div>

        <div className="w-3/4 max-w-[700px]">
          <Input
            id="search-bar"
            placeholder="Cari temanmu!"
            leftIcon={<HiSearch />}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="mt-2 flex flex-col items-center text-center text-white md:mt-4">
          {randomQuote && (
            <>
              <span className="text-neutral-dark font-semibold md:text-lg">
                "{randomQuote.quote}"
              </span>
              <span className="text-neutral-dark text-sm font-light italic md:text-[16px]">
                {randomQuote.user.fullname}, {randomQuote.user.faculty}{" "}
                {randomQuote.user.batch}
              </span>
            </>
          )}
        </div>
      </div>

      {isSearching ? (
        <Loader />
      ) : (
        <>
          <div
            className={`${friends.length == 0 ? "hidden" : "grid"} w-full grow grid-cols-2 gap-3 px-3 md:grid-cols-4 md:gap-7 md:px-5 lg:grid-cols-6 lg:gap-6 lg:px-8`}
          >
            {friends.map((friend, key) => (
              <UserCard key={key} {...friend} />
            ))}
          </div>

          <div
            className={`${friends.length == 0 ? "flex" : "hidden"} items-center justify-center italic md:text-2xl`}
          >
            Tidak ditemukan teman dengan nama tersebut!
          </div>
        </>
      )}

      <div className="my-10 flex w-full flex-col items-center gap-2 px-8 lg:px-[100px]">
        <span className="text-lg font-semibold md:text-2xl">
          Kirim pesan ke teman-teman kamu!
        </span>
        <form
          onSubmit={handleSubmit(handleSubmitQuote)}
          className="flex w-full items-center justify-center gap-2 md:gap-4"
        >
          <Input
            {...register("quote")}
            placeholder="Kirim pesanmu!"
            leftIcon={<HiOutlineChat />}
            size="lg"
            error={errors.quote?.message}
          />
          <Button
            label="Kirim"
            size="lg"
            type="submit"
            disabled={isSubmitQuote}
            className="self-start"
          />
        </form>
      </div>
    </div>
  );
};

export default withAuth(CariPage, "authenticated");
