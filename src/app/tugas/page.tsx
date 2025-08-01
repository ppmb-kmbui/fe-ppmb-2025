"use client";

import {
  Background,
  LoadingScreen,
  MultiProgressBar,
  CircularProgressIndicator,
  TaskCard,
} from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { APIResponse } from "@/utils/interface";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineUsers,
} from "react-icons/hi";
import bgCariTeman from "@/assets/background/bg-cari-teman.png";
import { CircularProgressIndicatorProps } from "@/components/progressBar/CircularProgressIndicator";

interface ProgressDetailProps {
  progress: number;
  min: number;
}

interface ProgressRumpunProps {
  SAINTEK: ProgressDetailProps;
  SOSHUM: ProgressDetailProps;
  RIK_VOK: ProgressDetailProps;
}

interface NetworkingAngkatanProgressProps {
  progress: ProgressRumpunProps;
  min: number;
}

interface NetworkingKatingProgressProps {
  progress: {
    2022: ProgressDetailProps;
    2023: ProgressDetailProps;
    2024: ProgressDetailProps;
  };
}

export interface ProgressProps {
  networkingAngkatan: NetworkingAngkatanProgressProps;
  networkingKating: NetworkingKatingProgressProps;
  firstFossibDone: boolean;
  secondFossibDone: boolean;
  insightHuntingDone: boolean;
  mentoringReflectionDone: boolean;
  mentoringVlogDone: boolean;
  kmbuiExplorerDone: boolean;
}

export interface AssignmentProps {
  id: string;
  name: string;
  description: string;
  deadline: Date;
  icon: React.ReactNode;
  isFinished: boolean;
  type: "file" | "link";
  fileFormat?: "image" | "pdf";
  uploadPreset?: string;
  namingFormat?: string;
  template?: string;
  rsvp?: string;
  vbg?: string;
}

const DEFAULT_PROGRESS: ProgressProps = {
  networkingAngkatan: {
    progress: {
      SAINTEK: { progress: 0, min: 0 },
      SOSHUM: { progress: 0, min: 0 },
      RIK_VOK: { progress: 0, min: 0 },
    },
    min: 0,
  },
  networkingKating: {
    progress: {
      "2022": { progress: 0, min: 0 },
      "2023": { progress: 0, min: 0 },
      "2024": { progress: 0, min: 0 },
    },
  },
  firstFossibDone: false,
  secondFossibDone: false,
  insightHuntingDone: false,
  mentoringReflectionDone: false,
  mentoringVlogDone: false,
  kmbuiExplorerDone: false,
};

const TugasPage: React.FC = () => {
  const { token } = useAuth();

  const [progress, setProgress] = useState<ProgressProps>(DEFAULT_PROGRESS);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const getData = async () => {
    try {
      setIsFetching(true);
      const res: AxiosResponse<APIResponse<ProgressProps>> = await api({
        url: "tasks",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload: APIResponse<ProgressProps> = res.data!;
      setProgress(payload.data!);
    } catch (error: any) {
      console.error("Error while fetching assignment's progress: ", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const DATA_PROGRESS: CircularProgressIndicatorProps[] = [
    {
      label: "Mentoring",
      color: "blue",
      currentProgress: progress.mentoringVlogDone ? 1 : 0,
      target: 1,
    },
    {
      label: "Insight Hunting",
      color: "pink",
      currentProgress: progress.insightHuntingDone ? 1 : 0,
      target: 1,
    },
    {
      label: "Foster Sibling",
      color: "orange",
      currentProgress: progress.firstFossibDone ? 1 : 0,
      target: 1,
    },
    {
      label: "KMBUI Explorer",
      color: "turquoise",
      currentProgress: progress.kmbuiExplorerDone ? 1 : 0,
      target: 1,
    },
  ];

  const ASSIGNMENTS: AssignmentProps[] = [
    {
      id: "insight-hunting",
      name: "Insight Hunting",
      description:
        "Melalui Insight Hunting, diharapkan maba mendapatkan wawasan dari narasumber yang berpengalaman di beberapa kategori yang diminati.",
      deadline: new Date(2025, 8, 16),
      icon: <HiOutlineLightBulb />,
      isFinished: progress.insightHuntingDone,
      namingFormat: "[Nama Lengkap]_[Fakultas]_InsightHunting.pdf",
      type: "file",
      fileFormat: "pdf",
      uploadPreset: "insight_hunting",
      rsvp: "https://forms.gle/jmi9QQuKB6rRhtdw8",
      template: "http://ristek.link/TemplateInsightHuntingPPMB2025",
    },
    {
      id: "fossib",
      name: "Fossib: Sharing Insight dan Fun Activity",
      description:
        "Maba dan kakak asuh melakukan sharing bersama untuk dapat saling mengenal dan bertukar wawasan mengenai kehidupan perkuliahan.",
      deadline: new Date(2025, 9, 6),
      icon: <HiOutlineUsers />,
      isFinished: progress.firstFossibDone,
      namingFormat: "[Nama Lengkap]_[Fakultas]_Fossib.pdf",
      type: "file",
      fileFormat: "pdf",
      uploadPreset: "fossib",
      template: "http://ristek.link/TemplateFossibPPMB2025",
    },
    {
      id: "mentoring-v",
      name: "Mentoring: Vlog",
      description:
        "Vlog berisi  cuplikan kegiatan selama mentoring dengan durasi maksimal 3 menit, dikumpulkan oleh ketua kelompok.",
      deadline: new Date(2025, 9, 6),
      icon: <HiOutlineDocumentText />,
      isFinished: progress.mentoringVlogDone,
      type: "link",
    },
    {
      id: "kmbui-explorer",
      name: "KMBUI Explorer",
      description:
        "Maba mengikuti paling sedikit 1 proker yang diadakan oleh KMBUI agar lebih mengenali KMBUI dan nilai-nilai Buddhis.",
      deadline: new Date(2025, 9, 6),
      icon: <HiOutlineUsers />,
      isFinished: progress.kmbuiExplorerDone,
      namingFormat: "[Nama Lengkap]_[Fakultas]_KMBUIExplorer",
      type: "file",
      fileFormat: "image",
      uploadPreset: "kmbui_explorer",
      template: "http://ristek.link/TemplateKMBUIExplorerPPMB2025",
    },
  ];

  const PROGRESS_ANGKATAN = [
    {
      name: "2022",
      progress: progress.networkingKating.progress[2022].progress,
      min: progress.networkingKating.progress[2022].min,
    },
    {
      name: "2023",
      progress: progress.networkingKating.progress[2023].progress,
      min: progress.networkingKating.progress[2023].min,
    },
    {
      name: "2024",
      progress: progress.networkingKating.progress[2024].progress,
      min: progress.networkingKating.progress[2024].min,
    },
    {
      name: "2025",
      progress:
        progress.networkingAngkatan.progress.SAINTEK.progress +
        progress.networkingAngkatan.progress.SOSHUM.progress +
        progress.networkingAngkatan.progress.RIK_VOK.progress,
      min: progress.networkingAngkatan.min,
    },
  ];

  const PROGRESS_RUMPUN = [
    {
      name: "SAINTEK",
      progress: progress.networkingAngkatan.progress.SAINTEK.progress,
      min: progress.networkingAngkatan.progress.SAINTEK.min,
    },
    {
      name: "SOSHUM",
      progress: progress.networkingAngkatan.progress.SOSHUM.progress,
      min: progress.networkingAngkatan.progress.SOSHUM.min,
    },
    {
      name: "RIK_VOK",
      progress: progress.networkingAngkatan.progress.RIK_VOK.progress,
      min: progress.networkingAngkatan.progress.RIK_VOK.min,
    },
  ];

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex min-h-screen max-w-screen flex-col items-center gap-5 py-10 lg:gap-10">
      <Background image={bgCariTeman} />

      {/* This is so that the child can grow properly */}
      <div className="flex w-full">
        <div className="mx-8 flex w-1/4 grow flex-col justify-center overflow-clip rounded-xl bg-white shadow-lg lg:mx-[60px] xl:mx-[80px]">
          <p className="w-full bg-linear-to-r/oklab from-purple-200 via-purple-300 to-purple-200 p-3 text-center text-2xl font-semibold lg:text-[27px] lg:leading-[1.6]">
            Progress Tugas
          </p>

          <div className="flex flex-col items-center justify-between gap-5 p-10 lg:flex-row lg:gap-10">
            <div className="w-full lg:basis-2/3">
              <MultiProgressBar
                progressData={PROGRESS_ANGKATAN}
                networkingRumpun={PROGRESS_RUMPUN}
              />
            </div>
            <div className="grid h-fit w-full grid-cols-2 justify-items-center gap-5 md:grid-cols-4 lg:basis-1/3 lg:grid-cols-2">
              {DATA_PROGRESS.map((data, key) => (
                <div key={key} className="size-32 lg:size-44">
                  <CircularProgressIndicator {...data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-10 px-8 md:grid-cols-2 lg:gap-[80px] lg:px-[60px] xl:px-[80px]">
        <div className="flex flex-col gap-2 overflow-clip rounded-xl bg-white shadow-xl">
          <p className="w-full bg-linear-to-r/oklab from-blue-100 via-blue-200 via-50% to-blue-100 p-3 text-center text-2xl font-semibold lg:text-[27px] lg:leading-[1.6]">
            Belum Dikerjakan
          </p>

          {ASSIGNMENTS.filter((assignment) => !assignment.isFinished).length >
            0 && (
            <div className="flex w-full flex-col gap-5 px-8 py-5">
              {ASSIGNMENTS.map((assignment, key) => (
                <div
                  key={key}
                  className={`${assignment.isFinished == true && "hidden"}`}
                >
                  <TaskCard {...assignment} setProgress={setProgress} />
                </div>
              ))}
            </div>
          )}

          <p
            className={`${ASSIGNMENTS.filter((assignment) => !assignment.isFinished).length != 0 && "hidden"} text-neutral-medium text-center text-lg italic`}
          >
            Selamat kamu sudah menyelesaikan semua tugas!
          </p>
        </div>

        <div className="flex h-fit flex-col overflow-clip rounded-xl bg-white shadow-xl">
          <p className="from-turquoise-100 via-turquoise-200 to-turquoise-100 w-full bg-linear-to-r/oklab via-50% p-3 text-center text-2xl font-semibold lg:text-[27px] lg:leading-[1.6]">
            Sudah Dikumpulkan
          </p>

          {ASSIGNMENTS.filter((assignment) => assignment.isFinished).length >
            0 && (
            <div className="flex w-full flex-col gap-5 px-8 py-5">
              {ASSIGNMENTS.map((assignment, key) => (
                <div
                  key={key}
                  className={`${assignment.isFinished == false && "hidden"}`}
                >
                  <TaskCard {...assignment} setProgress={setProgress} />
                </div>
              ))}
            </div>
          )}

          <p
            className={`${ASSIGNMENTS.filter((assignment) => assignment.isFinished).length > 0 && "hidden"} text-neutral-medium px-8 py-5 text-center text-lg italic`}
          >
            Kamu belum menyelesaikan tugas apa pun :(
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(TugasPage, "freshman");
