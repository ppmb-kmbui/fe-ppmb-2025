"use client";

import {
  Button,
  Dropdown,
  FileInput,
  Input,
  LoadingScreen,
} from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { KATING_DATA } from "@/utils/const";
import {
  APIResponse,
  NetworkingAssignmentProps,
  QuestionAnswerProps,
  QuestionProps,
} from "@/utils/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiChatAlt2 } from "react-icons/hi";
import z from "zod";

const networkingKatingFormSchema = z.object({
  katingId: z
    .number()
    .max(375, "ID kating tidak valid!")
    .min(0, "ID kating tidak valid!"),
  answer1: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer2: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer3: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer4: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer5: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer6: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer7: z.string().min(1, "Pertanyaan harus dijawab!"),
  question8: z
    .string()
    .min(1, "Cantumkan pertanyaan tambahan yang kamu tanyakan!"),
  answer8: z.string().min(1, "Pertanyaan harus dijawab!"),
  photo: z.instanceof(File, { message: "Foto tidak boleh kosong!" }),
});

interface NetworkingKatingQuestion {
  id: number;
  question: string;
  groupId: number;
}

const DEFAULT_NETWORKING_ASSINGMENT: NetworkingAssignmentProps = {
  fromId: -1,
  toId: -2,
  is_done: false,
  img_url: "",
  questions: [
    {
      questionId: -1,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -2,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -3,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -4,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -5,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -6,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -7,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
    {
      questionId: -8,
      answer: "",
      question: {
        id: -1,
        question: "",
      },
    },
  ],
};

function NetworkingAssignmentPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [networkingKatingAssignment, setNetworkingKatingAssignment] =
    useState<NetworkingAssignmentProps>(DEFAULT_NETWORKING_ASSINGMENT);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formUploadErrors, setFormUploadErrors] = useState<string>();

  const [batch, setBatch] = useState<"2022" | "2023" | "2024">("2022");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
    control,
  } = useForm<z.infer<typeof networkingKatingFormSchema>>({
    resolver: zodResolver(networkingKatingFormSchema),
    defaultValues: {
      katingId: 0,
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer5: "",
      answer6: "",
      answer7: "",
      question8: "",
      answer8: "",
      photo: undefined,
    },
  });

  const getData = async () => {
    try {
      setIsFetching(true);
      const res: AxiosResponse<APIResponse<NetworkingKatingQuestion[]>> =
        await api({
          url: `networking-kating/question`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      const payload = res.data;

      const networkingKatingQuestions = payload.data!;

      setNetworkingKatingAssignment({
        fromId: user.id,
        toId: getValues().katingId,
        is_done: false,
        img_url: "",
        questions: networkingKatingQuestions.map((question, idx) => {
          return {
            questionId: idx + 1,
            answer: "",
            question: {
              id: question.id,
              question: question.question,
            },
          };
        }),
      } as NetworkingAssignmentProps);
    } catch (error: any) {
      console.log("Error while getting networking assignment");
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmitNetworking = async (
    data: z.infer<typeof networkingKatingFormSchema>,
  ) => {
    setIsSubmitting(true);

    let uploadedPhotoUrl: string = "";
    const formData = new FormData();

    formData.append("file", data.photo);
    formData.append("upload_preset", "networking_kating");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      uploadedPhotoUrl = res.data.url;

      const networkingData = {
        img_url: uploadedPhotoUrl,
        answers: [
          {
            questionId: networkingKatingAssignment.questions[0].questionId,
            answer: data.answer1,
          },
          {
            questionId: networkingKatingAssignment.questions[1].questionId,
            answer: data.answer2,
          },
          {
            questionId: networkingKatingAssignment.questions[2].questionId,
            answer: data.answer3,
          },
          {
            questionId: networkingKatingAssignment.questions[3].questionId,
            answer: data.answer4,
          },
          {
            questionId: networkingKatingAssignment.questions[4].questionId,
            answer: data.answer5,
          },
          {
            questionId: networkingKatingAssignment.questions[5].questionId,
            answer: data.answer6,
          },
          {
            questionId: networkingKatingAssignment.questions[6].questionId,
            answer: data.answer7,
          },
        ],
        secondaryAnswers: {
          question: data.question8,
          answer: data.answer8,
        },
      };

      await api({
        url: `networking-kating/${data.katingId}`,
        method: "POST",
        data: networkingData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      reset();

      setIsSubmitting(false);
      router.push("/networking");
    } catch (err: any) {
      setIsSubmitting(false);
      if (err instanceof AxiosError) {
        const isCloudinaryError = err.config?.url?.includes("cloudinary");
        if (isCloudinaryError) {
          setFormUploadErrors("Upload bukti networking gagal, mohon coba lagi");
        } else {
          // We know the Cloudinary upload succeeded, and thus we need to delete the image
          await axios.delete("/api/images", {
            data: { imgUrl: uploadedPhotoUrl },
          });
        }
      } else {
        setFormUploadErrors("Upload bukti networking gagal, mohon coba lagi");
      }
      console.error("Error while submitting assignment");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log("ini networking assignment", networkingAssignment)

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex h-full flex-col justify-center">
      <div className="flex flex-col-reverse items-center justify-center gap-8 overflow-y-scroll px-10 py-10 md:flex-row md:justify-evenly md:gap-5 md:px-[60px]">
        <form
          onSubmit={handleSubmit(handleSubmitNetworking)}
          className="h-[500px] w-full overflow-y-scroll font-medium"
        >
          <div className="flex h-fit flex-col items-center gap-y-5">
            <div className="sticky top-0 flex min-h-[50px] w-full items-center justify-between bg-pink-200 shadow-md">
              <div className="border-neutral-dark flex h-full basis-1/5 items-center justify-center border-r-2 p-3">
                <select
                  onChange={(e) =>
                    setBatch(e.target.value as "2022" | "2023" | "2024")
                  }
                >
                  {[2022, 2023, 2024].map((batch, key) => {
                    return (
                      <option key={key} value={batch}>
                        {batch}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex grow items-center justify-center p-3">
                <select
                  className="w-full overflow-x-hidden text-ellipsis whitespace-nowrap"
                  onChange={(e) =>
                    setValue("katingId", parseInt(e.target.value))
                  }
                >
                  {KATING_DATA[batch].map((kating, key) => {
                    return (
                      <option key={key} value={kating.id}>
                        {kating.fullname}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <Input
              {...register("answer1")}
              label={networkingKatingAssignment.questions[0].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[0].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer1?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <Input
              {...register("answer2")}
              label={networkingKatingAssignment.questions[1].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[1].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer2?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <Input
              {...register("answer3")}
              label={networkingKatingAssignment.questions[2].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[2].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer3?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <Input
              {...register("answer4")}
              label={networkingKatingAssignment.questions[3].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[3].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer4?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <Input
              {...register("answer5")}
              label={networkingKatingAssignment.questions[4].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[4].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer5?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <Input
              {...register("answer6")}
              label={networkingKatingAssignment.questions[5].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[5].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer6?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <Input
              {...register("answer7")}
              label={networkingKatingAssignment.questions[6].question.question}
              placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[6].answer : "Masukkan jawabanmu di sini"}`}
              icon={<HiChatAlt2 />}
              error={errors.answer7?.message}
              disabled={networkingKatingAssignment.is_done}
            />
            <div className="flex w-full flex-col gap-y-2">
              <h3>Buatlah pertanyaanmu sendiri!</h3>
              <Input
                {...register("question8")}
                placeholder="Tulis pertanyaanmu di sini"
                error={errors.question8?.message}
                disabled={networkingKatingAssignment.is_done}
                color="blue"
              />
              <Input
                {...register("answer8")}
                placeholder={`${networkingKatingAssignment.is_done ? networkingKatingAssignment.questions[7].answer : "Masukkan jawaban mereka di sini"}`}
                error={errors.answer8?.message}
                disabled={networkingKatingAssignment.is_done}
              />
            </div>
            <div className="mt-3 flex">
              <Button
                label="Kumpulkan"
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className={`${networkingKatingAssignment.is_done && "cursor-not-allowed hover:bg-none"}`}
              />
            </div>
          </div>
        </form>

        <Controller
          name="photo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FileInput
              file={value as File | null}
              onChange={(file) => onChange(file)}
              label="Unggah foto kamu"
              description="Unggah dalam bentuk .jpg/.jpeg/.png"
              fileType="image"
              error={errors.photo?.message || formUploadErrors}
              answer={
                networkingKatingAssignment.is_done
                  ? networkingKatingAssignment.img_url
                  : ""
              }
            />
          )}
        />
      </div>
    </div>
  );
}

export default withAuth(NetworkingAssignmentPage, "freshman");
