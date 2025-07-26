"use client";

import { Button, Dropdown, LoadingScreen } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { UserProps } from "@/utils/interface";
import { generateAttendanceCode } from "@/utils/stringUtils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import Select from "react-select";

interface AttendanceProps {
  id: number;
  name: string;
  code: string;
  expires_in: number;
  created_at: string;
  updated_at: string;
}

const AdminPage: React.FC = () => {
  const { token } = useAuth();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [attendances, setAttendances] = useState<AttendanceProps[]>([]);
  const [users, setUsers] = useState<{ label: string; value: string }[]>([]);
  const [userTask, setUserTask] = useState<any>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const { register, handleSubmit, setValue, reset } = useForm();

  const getData = async () => {
    try {
      setIsFetching(true);
      const res = await api({
        url: "api/admin/attendance",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendances(res.data);

      const res2 = await api({
        url: "friends",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res2, "ini data");
      setUsers(
        res2.data.friends
          .filter((friend: UserProps) => friend.batch == 2024)
          .map((friend: UserProps) => ({
            value: friend.id,
            label: friend.fullname,
          })),
      );
    } catch (error: any) {
    } finally {
      setIsFetching(false);
    }
  };

  const getUserSubmission = async () => {
    try {
      const res = await api({
        url: `/api/admin/tasks/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserTask(res.data);
    } catch (error) {}
  };

  const generateAttendance = async () => {
    try {
      const res = await api({
        url: "api/admin/attendance",
        method: "POST",
        data: {
          code: generateAttendanceCode(),
          expires_in: 86400,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendances((oldAttendances) => [...oldAttendances, res.data]);
    } catch (error: any) {
      console.error("Error while generating attendance code", error);
    } finally {
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Kode absensi berhasil disalin!");
      })
      .catch((error) => {
        console.error("Error copying to clipboard", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (id) {
      getUserSubmission();
    }
  }, [id]);

  const handleUserChange = (selectedOption: any) => {
    const newId = selectedOption.value;
    router.push(`/admin?id=${newId}`);
  };
  const onSubmit = async (data: any, id: any, type: string) => {
    try {
      const res = await api({
        url: `/api/admin/score/${id}/${type}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          score: Number(data[type]),
        },
      });
      alert(`Score for ${type} submitted successfully!`);
    } catch (error) {
      console.error(`Error submitting score for ${type}`, error);
    }
  };

  const onSubmitNetworking = async (data: any) => {
    try {
      const res = await api({
        url: `api/admin/score/${id}/networking`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          score: Number(data),
        },
      });
    } catch (error) {
      console.error(`Error submitting score for networking`, error);
    }
  };

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex min-h-screen flex-col gap-10 p-10">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[27px] leading-[1.6] font-semibold">
            Absensi PPMB
          </p>
          <Button label="Buat Absensi" onClick={generateAttendance} />
        </div>

        <div className="scrollbar-hide grid grid-cols-2 items-center gap-5 py-3 pr-3 md:flex md:max-w-[84vw] md:flex-row md:overflow-x-auto lg:max-w-[89vw]">
          {attendances.map((attendance, key) => (
            <div
              key={key}
              className="shadow-custom h-[230px] min-w-[340px] rounded-xl bg-white p-5"
            >
              <div className="flex h-full flex-col">
                <p className="text-xl font-medium">{attendance.name}</p>

                <div className="flex flex-1 items-center justify-center">
                  <p className="text-5xl font-semibold">{attendance.code}</p>
                </div>

                <div className="flex flex-row gap-3">
                  <Button
                    label="Salin"
                    onClick={() => copyToClipboard(attendance.code)}
                    className="w-full"
                  />
                  <button className="text-ppmb-red-500 border-ppmb-red-500 hover:bg-ppmb-red-100 rounded-md border-[2px] p-2">
                    <HiOutlineTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`${attendances.length == 0 ? "flex" : "hidden"} text-neutral-medium w-full text-lg italic`}
        >
          Anda belum pernah membuat kode absensi :(
        </p>
      </div>

      {/* <div className="bg-white flex w-full rounded-lg h-[300px] p-5 overflow-y-auto border-[1px] border-ppmb-100"> */}
      <Select options={users} onChange={handleUserChange} />

      {id && (
        <div>
          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(data, userTask.explorerTask[0].id, "explorer"),
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p>KMBUI Explorer</p>
                {userTask?.explorerTask?.map((e: any, key: number) => (
                  <a
                    key={key}
                    href={e.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 underline"
                  >
                    {e.file_url}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                {userTask?.explorerTask[0]?.ExplorerSubmissionScore[0]
                  ?.score ? (
                  <p className="text-lg font-semibold">
                    Nilai:{" "}
                    {userTask?.explorerTask[0].ExplorerSubmissionScore[0].score}
                  </p>
                ) : (
                  <>
                    <input
                      {...register("explorer")}
                      className="border-ppmb-700 border px-2"
                    />
                    <Button label="Submit" />
                  </>
                )}
              </div>
            </div>
          </form>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(data, userTask?.firstFossibTask.id, "fossib_first"),
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p>Fossib 1</p>
                <a
                  href={userTask?.firstFossibTask?.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 underline"
                >
                  {userTask?.firstFossibTask?.file_url}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                {userTask?.firstFossibTask?.FirstFossibSessionScore[0] ? (
                  <p className="text-lg font-semibold">
                    Nilai:{" "}
                    {userTask?.firstFossibTask.FirstFossibSessionScore[0].score}
                  </p>
                ) : (
                  <>
                    <input
                      {...register("fossib_first")}
                      className="border-ppmb-700 border px-2"
                    />
                    <Button label="submit" />
                  </>
                )}
              </div>
            </div>
          </form>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(data, userTask?.secondFossibTask?.id, "fossib_second"),
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p>Fossib 2</p>
                <a
                  href={userTask?.secondFossibTask?.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 underline"
                >
                  {userTask?.secondFossibTask?.file_url}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  {userTask?.secondFossibTask?.SecondFossibSessionScore[0] ? (
                    <p className="text-lg font-semibold">
                      Nilai:{" "}
                      {userTask?.secondFossibTask?.SecondFossibSessionScore[0]}
                    </p>
                  ) : (
                    <>
                      <input
                        {...register("fossib_second")}
                        className="border-ppmb-700 border px-2"
                      />
                      <Button label="submit" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(
                data,
                userTask?.insightHuntingTask[0]?.id,
                "insight_hunting",
              ),
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p>insight hunting</p>
                {userTask?.insightHuntingTask?.map((ih: any, key: number) => (
                  <a
                    href={ih.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 underline"
                  >
                    {ih.file_url}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                {userTask?.insightHuntingTask[0]
                  ?.InsightHuntingSubmissionScore[0] ? (
                  <p className="text-lg font-semibold">
                    Nilai:{" "}
                    {
                      userTask?.insightHuntingTask[0]
                        ?.InsightHuntingSubmissionScore[0].score
                    }
                  </p>
                ) : (
                  <>
                    <input
                      {...register("insight_hunting")}
                      className="border-ppmb-700 border px-2"
                    />
                    <Button label="submit" />
                  </>
                )}
              </div>
            </div>
          </form>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(
                data,
                userTask?.mentoringReflectionTask?.id,
                "mentoring_reflection",
              ),
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p>mentoring reflection</p>
                <a
                  href={userTask?.mentoringReflectionTask?.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 underline"
                >
                  {userTask?.mentoringReflectionTask?.file_url}
                </a>
              </div>

              <div className="flex items-center space-x-2">
                {userTask?.mentoringReflectionTask?.score ? (
                  <p className="text-lg font-semibold">
                    Nilai: {userTask?.mentoringReflectionTask?.score}
                  </p>
                ) : (
                  <>
                    <input className="border-ppmb-700 border px-2" />
                    <Button label="submit" />
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2"></div>
            </div>
          </form>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(data, userTask?.mentoringVlogTask?.id, "mentoring_vlog"),
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p>mentoring vlog</p>
                <a
                  href={userTask?.mentoringVlogTask?.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 underline"
                >
                  {userTask?.mentoringVlogTask?.file_url}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                {userTask?.mentoringVlogTask?.score ? (
                  <p className="text-lg font-semibold">
                    Nilai: {userTask?.mentoringVlogTask?.score}
                  </p>
                ) : (
                  <>
                    <input className="border-ppmb-700 border px-2" />
                    <Button label="submit" />
                  </>
                )}
              </div>
            </div>
          </form>

          <form onSubmit={handleSubmit((data) => onSubmitNetworking(data))}>
            <div className="flex items-center justify-between">
              <p>networking</p>
              <div className="flex items-center space-x-2">
                {userTask?.networkingTask.score ? (
                  <p>{userTask?.networkingTask.score}</p>
                ) : (
                  <>
                    <input
                      {...register("networking")}
                      className="border-ppmb-700 border px-2"
                    />
                    <Button label="submit" />
                  </>
                )}
              </div>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            {userTask?.networkingTask.map((task: any, key: number) => (
              <div
                key={key}
                className="bg-ppmb-50 flex flex-col rounded-xl p-4"
              >
                <p>
                  {key + 1}. Nama: {task.to.fullname}
                </p>
                <p>Fakultas: {task.to.faculty}</p>
                <p>
                  Dokumentasi:{" "}
                  <a
                    key={key}
                    href={task.img_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 underline"
                  >
                    {task.img_url}
                  </a>
                </p>
                {task.questions.map((question: any, keyy: number) => (
                  <div className="flex flex-col py-2" key={key}>
                    <p className="font-semibold">
                      {question.question.question}
                    </p>
                    <p>{question.answer || "Jawaban kosong"}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-5 text-xl font-semibold">Networking kating</p>

          <div className="flex flex-col gap-4">
            {userTask?.networkingKating.map((task: any, key: number) => (
              <div
                key={key}
                className="bg-ppmb-50 flex flex-col rounded-xl p-4"
              >
                <p>Berkas: {}</p>

                <a
                  key={key}
                  href={task.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 underline"
                >
                  {task.file_url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(AdminPage, "admin");
