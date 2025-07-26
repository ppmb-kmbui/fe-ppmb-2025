"use client";

import { GridView, Loader, Modal, SectionTitle, UserCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";
import { api } from "@/utils/axios";

const ProfilPage: React.FC = () => {
  const { user, token } = useAuth();

  const [photo, setPhoto] = useState<File | null>(null);
  const [dynamicPhoto, setDynamicPhoto] = useState<string>(user.imgUrl);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { close, open, isOpen } = useDisclosure();

  const handleFileChange = (file: File | null) => {
    if (file) {
      setPhoto(file);
    } else {
      setPhoto(null);
    }
  };

  // console.log(token)

  // console.log(user.networking_tasks)

  const deleteImageProfile = async () => {
    try {
      await api({
        baseURL: "",
        url: "/api/images",
        method: "DELETE",
        data: {
          imgUrl: user.imgUrl,
        },
      });
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleEditProfile = async () => {
    // Formality
    if (!photo) {
      console.error("No photo selected.");
      return;
    }

    try {
      setIsLoading(true);
      await deleteImageProfile();

      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "ppmb_kmbui");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      const res2 = await api({
        url: "profile",
        method: "PUT",
        data: {
          imgUrl: res.data.url,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDynamicPhoto(res2.data.imgUrl);
    } catch (error: any) {
      console.error("Error while editing profile", error);
    } finally {
      setIsLoading(false);
      close();
    }
  };

  return (
    <div className="flex h-full flex-col gap-5 px-4 py-5 md:gap-10 md:p-6 lg:p-10">
      <Modal
        isOpen={isOpen}
        onClose={close}
        type="image"
        label="Edit foto profile"
        sublabel="Foto harus dalam bentuk .jpg/.jpeg/.png"
        onSubmit={handleEditProfile}
        handleFileChange={handleFileChange}
        file={photo}
      />

      <div className="flex flex-col gap-5 md:flex-row lg:gap-10">
        <div className="shadow-neutral-medium flex h-[160px] w-full flex-row items-center gap-3 rounded-lg bg-white px-5 py-6 shadow-lg md:h-[200px] md:w-[70%] md:gap-5 md:py-8 lg:w-[80%] lg:gap-7 lg:p-8">
          <div className="relative flex h-[95px] w-[95px] md:h-[140px] md:w-[140px]">
            <Image
              src={dynamicPhoto}
              alt={"Logo"}
              width={140}
              height={140}
              className="rounded-full object-cover"
            />

            <button
              className={`${isLoading && "cursor-not-allowed"} absolute right-0 bottom-0 rounded-full border-2 border-blue-300 bg-white p-1 text-blue-300 md:p-2 md:text-[20px]`}
              onClick={open}
              disabled={isLoading}
            >
              {isLoading ? <Loader size="xs" /> : <HiPencil />}
            </button>
          </div>

          {/* <div className="bg-ppmb-800 flex h-full min-w-[2px] rounded-lg"></div> */}

          <div className="flex flex-col">
            <p className="text-h5 text-xl leading-none font-semibold md:text-3xl lg:text-4xl">
              {user?.fullname}
            </p>
            <p className="text-neutral-dark text-sm font-semibold md:text-lg">
              {user.faculty}, {user.batch}
            </p>
            <p className="text-neutral-medium text-sm md:text-lg">
              {user.email}
            </p>
          </div>
        </div>

        <div className="shadow-neutral-medium flex w-full flex-col items-center justify-center rounded-lg bg-white p-3 shadow-lg md:h-[200px] md:w-[30%] md:gap-2 md:p-8 lg:w-[20%]">
          <p className="text-3xl font-medium md:text-5xl lg:text-7xl">
            {user.followers}
          </p>
          <p className="text-sm md:text-xl">pengikut</p>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1 md:gap-3">
        <SectionTitle text="Sudah Berkenalan" />
        <GridView
          iterable={user.networking_tasks}
          emptyMessage="Kamu belum menyelesaikan networking dengan siapa pun :("
        >
          {user.networking_tasks.map((friend, key) => (
            <UserCard key={key} {...friend.to} status="done" />
          ))}
        </GridView>
      </div>
    </div>
  );
};

export default withAuth(ProfilPage, "authenticated");
