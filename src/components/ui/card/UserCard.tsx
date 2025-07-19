"use client";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/utils/axios";
import { FriendProps } from "@/utils/interface";
import { facultyCase } from "@/utils/stringUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiCheck, HiPlus } from "react-icons/hi";

interface UserCardProps extends FriendProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  fullname,
  faculty,
  batch,
  status,
  imgUrl,
  id,
  onAccept,
  onReject,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
  const [isRejectLoading, setIsRejectLoading] = useState<boolean>(false);
  const [dynamicStatus, setDynamicStatus] = useState<typeof status>(status); // connect response doesnt retrun typeof status, so need to manually change it :)

  const { token, user } = useAuth();

  const follow = async () => {
    try {
      setIsLoading(true);
      await api({
        url: `connect/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDynamicStatus("menunggu_konfirmasi");
    } catch (error: any) {
      console.error("Error while following friend", error);
    } finally {
      setIsLoading(false);
    }
  };

  const accept = async () => {
    try {
      setIsAcceptLoading(true);
      await api({
        url: `connect/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDynamicStatus("accepted");
      onAccept?.();
    } catch (error: any) {
      console.error("Error while accepting friend", error);
    } finally {
      setIsAcceptLoading(false);
    }
  };

  const reject = async () => {
    try {
      setIsRejectLoading(true);
      await api({
        url: `connect/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDynamicStatus("not_connected");
      onReject?.();
    } catch (error: any) {
      console.error("Error while rejecting friend", error);
    } finally {
      setIsRejectLoading(false);
    }
  };

  const createNetworkingTask = async () => {
    try {
      setIsLoading(true);
      await api({
        url: `networking/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDynamicStatus("sedang_networking");
    } catch (error: any) {
      console.error("Error while creating networking task", error);
    } finally {
      setIsLoading(false);
      router.push(`/networking/${id}`);
    }
  };

  const truncateFullname = (fullname: string) => {
    if (fullname.length > 30) {
      return fullname.slice(0, 27) + "...";
    }
    return fullname;
  };

  return (
    // <div className="bg-white flex flex-col justify-between border-blue-300 border-[2px] px-3 py-4 lg:px-4 lg:py-5 rounded-xl min-h-[240px] lg:h-[270px] min-w-[160px] sm:min-w-[200px] sm:max-w-[200px] lg:min-w-[225px] lg:max-w-full shadow-white shadow-custom-sm md:shadow-custom">
    <div className="flex h-[240px] w-full flex-col justify-between rounded-xl border-[2px] border-blue-300 bg-white px-3 py-4 lg:h-[300px] lg:px-4 lg:py-5">
      <div className="flex h-[45%] items-center justify-center">
        <div className="flex h-[80px] w-[80px] md:h-[90px] md:w-[90px]">
          <Image
            src={imgUrl}
            alt=""
            width={95}
            height={95}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      <div className="mt-4 mb-2 flex h-[40%] flex-col items-center justify-start gap-1 text-center">
        <p className="leading-none font-semibold md:text-lg">
          {truncateFullname(fullname)}
        </p>
        <p className="text-neutral-dark text-xs md:text-sm">
          {facultyCase(faculty)}, {batch}
        </p>
      </div>

      <div className="flex h-[15%] items-center justify-center">
        {dynamicStatus == "not_connected" && (
          <button
            className={`${isLoading && "cursor-not-allowed opacity-80"} text-neutral-light mx-2 flex min-h-[28px] w-full items-center justify-center gap-2 rounded-lg bg-blue-300 py-[2px] pr-2 hover:cursor-pointer hover:brightness-150 hover:saturate-50`}
            onClick={follow}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader-button-xs h-[16px] w-[16px]" />
            ) : (
              <>
                <HiPlus className="text-white" />
                <p className="text-sm font-medium lg:text-[16px]">Ikuti</p>
              </>
            )}
          </button>
        )}

        {dynamicStatus == "menunggu_konfirmasi" && (
          <button className="flex min-h-[28px] w-full cursor-not-allowed items-center justify-center rounded-lg border-[2px] border-yellow-300 text-yellow-300 md:mx-2">
            <p className="text-ppmb-warning font-semibold">Menunggu...</p>
          </button>
        )}

        {dynamicStatus == "meminta_konfirmasi" && (
          <div className="flex w-full flex-row gap-[6px]">
            <button
              className={`${isLoading && "cursor-not-allowed opacity-80"} border-ppmb-red-500 flex min-h-[28px] w-full items-center justify-center rounded-lg border-[2px] px-[6px] md:px-2`}
              onClick={reject}
              disabled={isLoading}
            >
              {isRejectLoading ? (
                <div className="loader-button-xs h-[16px] w-[16px]" />
              ) : (
                <p className="text-ppmb-red-500 text-sm font-semibold lg:text-[16px]">
                  Tolak
                </p>
              )}
            </button>

            <button
              className={`${isLoading && "cursor-not-allowed opacity-80"} bg-ppmb-success hover:bg-ppmb-success-dark flex min-h-[28px] w-full items-center justify-center rounded-lg px-3 md:px-4`}
              onClick={accept}
              disabled={isLoading}
            >
              {isAcceptLoading ? (
                <div className="loader-button-xs h-[16px] w-[16px]" />
              ) : (
                <p className="text-sm font-medium text-white lg:text-[16px]">
                  Terima
                </p>
              )}
            </button>
          </div>
        )}

        {dynamicStatus == "accepted" && (
          <button
            className={`${isLoading && "cursor-not-allowed opacity-80"} bg-turquoise-200 text-turquoise-300 flex min-h-[28px] w-full items-center justify-center rounded-lg py-[2px] font-semibold hover:cursor-pointer hover:brightness-75 md:mx-2`}
            onClick={createNetworkingTask}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader-button-sm h-[16px] w-[16px]" />
            ) : (
              <p className="text-ppmb-000 font-medium">Networking</p>
            )}
          </button>
        )}

        {dynamicStatus == "sedang_networking" && (
          <button
            className={`bg-ppmb-blue-700 hover:bg-ppmb-blue-800 flex min-h-[28px] w-full items-center justify-center rounded-lg py-[2px] md:mx-2`}
            onClick={() => router.push(`/networking/${id}`)}
          >
            <p className="text-ppmb-000 font-medium">Networking</p>
          </button>
        )}

        {dynamicStatus == "done" && (
          <button
            className="bg-ppmb-success hover:bg-ppmb-success-dark text-ppmb-000 flex min-h-[28px] w-full items-center justify-center gap-2 rounded-lg py-[2px] pl-2 font-medium md:mx-2"
            onClick={() => router.push(`/networking/${id}`)}
          >
            <p className="font-medium">Selesai</p>
            <HiCheck size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
