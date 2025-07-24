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

      const acceptorIsUpperclassman: boolean = user.batch < 2025;

      if (acceptorIsUpperclassman) {
        await api({
          url: `networking-kating/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api({
          url: `networking-maba/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setDynamicStatus("sedang_networking");
    } catch (error: any) {
      console.error("Error while creating networking task", error);
    } finally {
      setIsLoading(false);
      router.push(`/networking/${id}`);
    }
  };

  const buttonBaseClasses =
    "min-h-[30px] lg:min-h-[36px] text-sm lg:text-md w-full flex items-center duration-75 justify-center rounded-lg gap-x-1 mx-2 font-semibold";

  const buttonVariantClasses = {
    notConnected: "bg-blue-300 text-white cursor-pointer hover:opacity-80",
    pendingConfirmation:
      "border-yellow-300 border text-yellow-300 pointer-events-none cursor-not-allowed",
    accepted:
      "bg-turquoise-200 text-turquoise-300 pointer-events-none cursor-not-allowed",
    reject:
      "mx-0! ml-1! border-pink-300 border text-pink-300 cursor-pointer hover:bg-pink-100",
    accept:
      "mx-0! mr-1! bg-turquoise-300 text-white cursor-pointer hover:opacity-80",
    complete:
      "border-neutral-dark text-neutral-dark cursor-pointer hover:opacity-80",
  };

  return (
    <div className="flex h-fit w-full flex-col justify-between gap-y-4 rounded-xl bg-white px-3 py-4 shadow-lg shadow-[#D3DAE2] lg:px-4 lg:py-5">
      <div className="flex h-fit items-center justify-center">
        <div className="flex size-[90px] lg:size-[120px]">
          <Image
            src={imgUrl}
            alt=""
            width={100}
            height={100}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex h-fit flex-col items-center justify-start gap-1 text-center">
        <p className="w-full overflow-hidden leading-none font-semibold text-ellipsis whitespace-nowrap md:text-lg">
          {fullname}
        </p>
        <p className="text-neutral-dark w-full overflow-hidden text-xs text-ellipsis whitespace-nowrap md:text-sm">
          {facultyCase(faculty)}, {batch}
        </p>
      </div>

      <div className="flex h-fit items-center justify-center">
        {dynamicStatus == "not_connected" && (
          <button
            className={`${isLoading && "cursor-not-allowed opacity-80"} ${buttonVariantClasses.notConnected} ${buttonBaseClasses}`}
            onClick={follow}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader-button-xs h-[16px] w-[16px]" />
            ) : (
              <>
                <HiPlus className="text-white" />
                <p>Ikuti</p>
              </>
            )}
          </button>
        )}

        {dynamicStatus == "menunggu_konfirmasi" && (
          <button
            className={`${buttonVariantClasses.pendingConfirmation} ${buttonBaseClasses}`}
          >
            <p>Menunggu...</p>
          </button>
        )}

        {dynamicStatus == "meminta_konfirmasi" && (
          <div className="flex w-full flex-row gap-[6px]">
            <button
              className={`${isLoading && "cursor-not-allowed opacity-80"} ${buttonVariantClasses.reject} ${buttonBaseClasses}`}
              onClick={reject}
              disabled={isLoading}
            >
              {isRejectLoading ? (
                <div className="loader-button-xs h-[16px] w-[16px]" />
              ) : (
                <p>Tolak</p>
              )}
            </button>

            <button
              className={`${isLoading && "cursor-not-allowed opacity-80"} ${buttonVariantClasses.accept} ${buttonBaseClasses}`}
              onClick={accept}
              disabled={isLoading}
            >
              {isAcceptLoading ? (
                <div className="loader-button-xs h-[16px] w-[16px]" />
              ) : (
                <p>Terima</p>
              )}
            </button>
          </div>
        )}

        {dynamicStatus == "accepted" && (
          <button
            className={`${isLoading && "cursor-not-allowed opacity-80"} ${buttonVariantClasses.accepted} ${buttonBaseClasses}`}
            onClick={createNetworkingTask}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader-button-sm h-[16px] w-[16px]" />
            ) : (
              <p>Networking</p>
            )}
          </button>
        )}

        {dynamicStatus == "sedang_networking" && (
          <button
            className={`bg-ppmb-blue-700 hover:bg-ppmb-blue-800 flex min-h-[28px] w-full items-center justify-center rounded-lg py-[2px]`}
            onClick={() => router.push(`/networking/${id}`)}
          >
            <p>Networking</p>
          </button>
        )}

        {dynamicStatus == "done" && (
          <button
            className={`${buttonVariantClasses.complete} ${buttonBaseClasses}`}
            onClick={() => router.push(`/networking/${id}`)}
          >
            <p>Selesai</p>
            <HiCheck size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
