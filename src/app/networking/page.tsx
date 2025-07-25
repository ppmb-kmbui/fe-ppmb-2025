"use client";

import { Background, GridView, LoadingScreen, UserCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import {
  APIResponse,
  FriendProps,
  FriendsAPIResponse,
} from "@/utils/interface";
import { JSX, useEffect, useState } from "react";
import Image from "next/image";

import networkingDenganKmb from "@/assets/graphic-elements/networking-dengan-kmb.svg";
import bgCariTeman from "@/assets/background/bg-cari-teman.png";

function SectionTitle({ text }: { text: string }): JSX.Element {
  return (
    <span className="bg-neutral-dark w-fit px-3 py-1 text-sm font-semibold text-white md:text-lg lg:px-5 lg:py-2 lg:text-2xl">
      {text}
    </span>
  );
}

const NetworkingPage: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [menungguPersetujuanFriends, setMenungguPersetujuanFriends] = useState<
    FriendProps[]
  >([]);
  const [lanjutkanNetworkingFriends, setLanjutkanNetworkingFriends] = useState<
    FriendProps[]
  >([]);

  const { token } = useAuth();

  const getData = async () => {
    try {
      setIsFetching(true);
      const res = await api({
        url: "friends",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload: APIResponse<FriendsAPIResponse> = res.data;

      // Account for having no friends yet
      const friends =
        payload.data!.friends == undefined ? [] : payload.data!.friends;

      setMenungguPersetujuanFriends(
        friends.filter((friend) => friend.status === "meminta_konfirmasi"),
      );

      setLanjutkanNetworkingFriends(
        friends.filter(
          (friend) =>
            friend.status === "accepted" ||
            friend.status === "sedang_networking",
        ),
      );
    } catch (error: any) {
      console.error("Error while getting networking data");
    } finally {
      setIsFetching(false);
    }
  };

  const handleAccept = (acceptedFriend: FriendProps) => {
    setMenungguPersetujuanFriends((prev) =>
      prev.filter((friend) => friend.id != acceptedFriend.id),
    );
    setLanjutkanNetworkingFriends((prev) => [
      ...prev,
      { ...acceptedFriend, status: "accepted" },
    ]);
  };

  const handleReject = (rejectedId: number) => {
    setMenungguPersetujuanFriends((prev) =>
      prev.filter((friend) => friend.id != rejectedId),
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-5 overflow-visible lg:gap-10">
      <Background image={bgCariTeman} />

      {/* Networking Logo */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <Image
          src={networkingDenganKmb}
          alt="Networking dengan KMB"
          sizes="100vw"
          height={100}
          width={100}
          className="h-20 w-auto md:h-24 lg:h-32"
        />
      </div>

      {/* Menunggu persetujuan section */}
      <div className="flex flex-col gap-3 overflow-visible px-3 md:px-5 md:pl-[40px] lg:gap-5 lg:pl-[60px]">
        <div className="flex w-full justify-center md:justify-start">
          <SectionTitle text="Menunggu Persetujuan" />
        </div>

        <GridView
          iterable={menungguPersetujuanFriends}
          emptyMessage="Tidak ada permintaan pertemanan :("
        >
          {menungguPersetujuanFriends.map((friend, key) => (
            <UserCard
              key={key}
              {...friend}
              onAccept={() => handleAccept(friend)}
              onReject={() => handleReject(friend.id)}
            />
          ))}
        </GridView>
      </div>

      {/* Lanjutkan networking section */}
      <div className="flex flex-col gap-3 px-3 md:px-5 md:pl-[40px] lg:gap-5 lg:pl-[60px]">
        <div className="flex w-full justify-center md:justify-start">
          <SectionTitle text="Lanjutkan Networking" />
        </div>

        <GridView
          iterable={lanjutkanNetworkingFriends}
          emptyMessage="Tidak ada teman yang bisa di-networking saat ini, silahkan follow
          teman pada page Cari!"
        >
          {lanjutkanNetworkingFriends.map((friend, key) => (
            <UserCard key={key} {...friend} />
          ))}
        </GridView>
      </div>
    </div>
  );
};

export default withAuth(NetworkingPage, "authenticated");
