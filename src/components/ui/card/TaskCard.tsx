"use client";

import {
  HiDownload,
  HiOutlineCalendar,
  HiOutlineCursorClick,
} from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";
import { Modal } from "@/components";
import { AssignmentProps, ProgressProps } from "@/app/tugas/page";
import axios, { AxiosResponse } from "axios";
import { api } from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "@/utils/stringUtils";
import { ModalData } from "../Modal";

interface TaskProps extends AssignmentProps {
  setProgress: Dispatch<SetStateAction<ProgressProps>>;
}

export const TaskCard: React.FC<TaskProps> = ({
  id,
  name,
  description,
  deadline,
  icon,
  type,
  fileFormat,
  namingFormat,
  uploadPreset,
  isFinished,
  template,
  vbg,
  rsvp,
  setProgress,
}) => {
  const [url, setUrl] = useState<string>("");
  const { user, token } = useAuth();
  const { open, isOpen, close } = useDisclosure(false);

  const handleSubmit = async (data: ModalData) => {
    if (data) {
      // console.log("ini id", id);
      // console.log("ini type", type)
      if (data.type === "file") {
        // console.log("haiiii2")
        let cloudinarySuccessRes;
        try {
          const form = new FormData();
          form.append("file", data.file);
          form.append("upload_preset", data.uploadPreset);

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            form,
          );

          cloudinarySuccessRes = res;

          switch (id) {
            case "insight-hunting":
              await api({
                url: "/tasks/insight-hunting",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  file_url: res.data.url,
                },
              });
              setProgress((oldProgress) => ({
                ...oldProgress,
                insightHuntingDone: true,
              }));
              break;

            case "fossib":
              await api({
                url: "tasks/fossib/first",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  description: user.id.toString(),
                  file_url: res.data.url,
                },
              });
              setProgress((oldProgress) => ({
                ...oldProgress,
                firstFossibDone: true,
              }));
              break;

            case "fossib-2":
              await api({
                url: "tasks/fossib/second",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  description: "",
                  file_url: res.data.url,
                },
              });
              setProgress((oldProgress) => ({
                ...oldProgress,
                secondFossibDone: true,
              }));
              break;

            case "mentoring-sr":
              await api({
                url: "tasks/mentoring/reflection",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  description: "",
                  file_url: res.data.url,
                },
              });
              setProgress((oldProgress) => ({
                ...oldProgress,
                mentoringReflectionDone: true,
              }));
              break;

            case "kmbui-explorer":
              await api({
                url: "tasks/explorer",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  img_url: res.data.url,
                },
              });
              setProgress((oldProgress) => ({
                ...oldProgress,
                kmbuiExplorerDone: true,
              }));
              break;
          }

          if (res.status == 200) {
            close();
          }
        } catch (error) {
          console.error("Error uploading PDF:", error);

          if (!!cloudinarySuccessRes) {
            await api({
              method: "DELETE",
              baseURL: "",
              url: "api/images",
              headers: { Authorization: `Bearer ${token}` },
              data: {
                img_url: cloudinarySuccessRes.data.url,
              },
            });
          }
        }
      } else if (data.type === "link") {
        if (id == "mentoring-v") {
          try {
            const res = await api({
              url: "tasks/mentoring/vlog",
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                file_url: data.link,
              },
            });
            setProgress((oldProgress) => ({
              ...oldProgress,
              mentoringVlogDone: true,
            }));
            close();
          } catch (err: any) {
            console.error("Error submitting assignment link");
          }
        }
      }
    } else {
      console.error(
        `No data passed to form submission for task "${name}" (id: ${id}, type: ${type}). Expected ModalData object but received:`,
        data,
      );
    }
  };

  useEffect(() => {
    if (isFinished) {
      let endpoint: string = "";
      switch (id) {
        case "insight-hunting":
          endpoint = "tasks/insight-hunting";
          break;
        case "kmbui-explorer":
          endpoint = "tasks/explorer";
          break;
        case "fossib":
          endpoint = "tasks/fossib/first";
          break;
        case "mentoring-v":
          endpoint = "tasks/mentoring";
          break;
        default:
          console.error("You have an illegal task");
      }

      api({
        method: "GET",
        url: endpoint,
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (!!res.data?.data?.file_url) {
          setUrl(res.data.data.file_url);
        } else if (!!res.data?.data?.vlog?.file_url) {
          setUrl(res.data.data.vlog.file_url);
        } else {
          setUrl(res.data.data.img_url);
        }
      });
    }
  }, [isFinished]);

  const isOverdue = new Date() >= new Date(deadline);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={close}
        type={type}
        label={`Kumpul berkas ${name}`}
        uploadPreset={uploadPreset}
        fileFormat={fileFormat}
        onSubmit={handleSubmit}
        sublabel={namingFormat}
      />
      <div
        className={`${isOverdue && !isFinished && "opacity-70"} border-neutral-dark flex w-full flex-col gap-2 rounded-lg border-2 bg-white p-3 shadow-md md:p-4`}
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-row items-start gap-2 md:gap-[10px]">
            <div className="flex rounded-full bg-blue-300 p-[6px] text-xl text-[16px] text-white md:text-[24px]">
              {icon}
            </div>
            <p className="text-lg font-bold text-black md:text-xl">{name}</p>
          </div>

          <div className="flex flex-row gap-2">
            {rsvp && (
              <a
                href={rsvp}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex md:hidden`}
              >
                <button className="hover:bg-neutral-light flex items-center gap-[6px] rounded-lg border-[2px] border-black px-3 py-[2px] pl-[16px] text-[13px] font-medium text-black md:text-sm">
                  <p>RSVP</p>
                  <HiOutlineCursorClick size={17} />
                </button>
              </a>
            )}

            <div
              className={`${isOverdue && !isFinished ? "text-neutral-dark bg-orange-200" : "text-neutral-dark bg-blue-200"} flex max-w-fit flex-row items-center gap-2 rounded-xl px-3 py-1 pr-3 text-sm md:text-[16px]`}
            >
              <HiOutlineCalendar />
              <p className="font-medium">{formatDate(deadline)}</p>
            </div>
          </div>
        </div>

        <div className="bg-ppmb-200 mt-[2px] min-h-[1px]" />

        <div className="flex text-sm md:text-[16px]">
          <p>{description}</p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-end gap-2 lg:mt-3">
          {!isFinished && (
            <>
              {rsvp && (
                <a
                  href={rsvp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden md:flex`}
                >
                  <button className="border-neutral-dark text-neutral-dark hover:bg-neutral-light flex cursor-pointer items-center gap-[6px] rounded-lg border-[2px] px-3 py-[2px] pl-[16px] text-[13px] font-medium md:text-sm">
                    <p>RSVP</p>
                    <HiOutlineCursorClick size={17} />
                  </button>
                </a>
              )}

              {vbg && (
                <a href={vbg} target="_blank" rel="noopener noreferrer">
                  <button className="border-neutral-dark text-neutral-dark hover:bg-neutral-light flex cursor-pointer items-center gap-[6px] rounded-lg border-[2px] px-3 py-[2px] pl-[16px] text-[13px] font-medium md:text-sm">
                    <p>VBG</p>
                    <HiDownload />
                  </button>
                </a>
              )}

              {template && (
                <a href={template} target="_blank" rel="noopener noreferrer">
                  <button className="border-neutral-dark text-neutral-dark hover:bg-neutral-light flex cursor-pointer items-center gap-[6px] rounded-lg border-[2px] px-3 py-[2px] pl-[16px] text-[13px] font-medium md:text-sm">
                    <p>Template</p>
                    <HiDownload />
                  </button>
                </a>
              )}

              <button
                className="flex min-h-[27.5px] min-w-[80px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-300 px-5 py-[2px] text-[13px] text-white hover:bg-blue-200 md:text-sm"
                onClick={open}
              >
                <p>Submit</p>
              </button>
            </>
          )}

          {isFinished && (
            <>
              <button
                className="flex min-h-[27.5px] min-w-[80px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-300 px-5 py-[2px] text-[13px] text-white hover:bg-blue-200 md:text-sm"
                onClick={open}
              >
                <p>Kumpul ulang</p>
              </button>

              <a
                className="flex min-h-[27.5px] min-w-[80px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-300 px-5 py-[2px] text-[13px] text-white hover:bg-blue-200 md:text-sm"
                href={url}
                target="_blank"
              >
                Lihat submisi
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};
