"use client";

import { Button, FileInput, Input, LoadingScreen } from "@/components";
// import { Header } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { APIResponse } from "@/utils/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiChatAlt2 } from "react-icons/hi";
import { z } from "zod";
import { NetworkingAssignmentProps } from "@/utils/interface";

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
        id: -2,
        question: "",
      },
    },
    {
      questionId: -3,
      answer: "",
      question: {
        id: -3,
        question: "",
      },
    },
    {
      questionId: -4,
      answer: "",
      question: {
        id: -4,
        question: "",
      },
    },
  ],
};

const networkingMabaFormSchema = z.object({
  answer1: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer2: z.string().min(1, "Pertanyaan harus dijawab!"),
  answer3: z.string().min(1, "Pertanyaan harus dijawab!"),
  question4: z
    .string()
    .min(1, "Cantumkan pertanyaan tambahan yang kamu tanyakan!"),
  answer4: z.string().min(1, "Pertanyaan harus dijawab!"),
  photo: z.instanceof(File, { error: "Foto tidak boleh kosong!" }),
});

function NetworkingAssignmentPage() {
  const { userId } = useParams();
  const { token } = useAuth();
  const router = useRouter();

  const [networkingMabaAssignment, setNetworkingMabaAssignment] =
    useState<NetworkingAssignmentProps>(DEFAULT_NETWORKING_ASSINGMENT);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<z.infer<typeof networkingMabaFormSchema>>({
    resolver: zodResolver(networkingMabaFormSchema),
  });

  const getData = async () => {
    try {
      setIsFetching(true);
      const res: AxiosResponse<APIResponse<any>> = await api({
        url: `${process.env.API_BASE_URL}/networking-maba/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = res.data;

      setNetworkingMabaAssignment(payload.data);
    } catch (error: any) {
      console.log("Error while getting networking assignment");
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmitNetworking = async (
    data: z.infer<typeof networkingMabaFormSchema>,
  ) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", data.photo);
      formData.append("upload_preset", "networking_evidence");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      const uploadedPhotoUrl = res.data.url;
      await api({
        url: `${process.env.API_BASE_URL}/networking-maba/${userId}`,
        method: "PUT",
        data: {
          img_url: uploadedPhotoUrl,
          answers: [
            {
              questionId: networkingMabaAssignment.questions[0].questionId,
              answer: data.answer1,
            },
            {
              questionId: networkingMabaAssignment.questions[1].questionId,
              answer: data.answer2,
            },
            {
              questionId: networkingMabaAssignment.questions[2].questionId,
              answer: data.answer3,
            },
          ],
          secondaryAnswers: {
            question: data.question4,
            answer: data.answer4,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
    } catch (error: any) {
      console.error("Error while submitting assignment");
    } finally {
      setIsSubmitting(false);
      router.push("/networking");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log("ini networking assignment", networkingAssignment)

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex h-full min-h-screen flex-col">
      {/* <Header label="Networking" /> */}
      <div className="flex h-full flex-col-reverse items-center justify-center gap-8 px-10 py-10 md:flex-row md:justify-evenly md:gap-5 md:px-[60px]">
        <form
          onSubmit={handleSubmit(handleSubmitNetworking)}
          className="font-montserrat flex h-full w-full flex-col items-center justify-center gap-5 font-medium"
        >
          <Input
            {...register("answer1")}
            label={networkingMabaAssignment.questions[0].question.question}
            placeholder={`${networkingMabaAssignment.is_done ? networkingMabaAssignment.questions[0].answer : "Masukkan jawabanmu di sini"}`}
            icon={<HiChatAlt2 />}
            error={errors.answer1?.message}
            disabled={networkingMabaAssignment.is_done}
          />
          <Input
            {...register("answer2")}
            label={networkingMabaAssignment.questions[1].question.question}
            placeholder={`${networkingMabaAssignment.is_done ? networkingMabaAssignment.questions[1].answer : "Masukkan jawabanmu di sini"}`}
            icon={<HiChatAlt2 />}
            error={errors.answer2?.message}
            disabled={networkingMabaAssignment.is_done}
          />
          <Input
            {...register("answer3")}
            label={networkingMabaAssignment.questions[2].question.question}
            placeholder={`${networkingMabaAssignment.is_done ? networkingMabaAssignment.questions[2].answer : "Masukkan jawabanmu di sini"}`}
            icon={<HiChatAlt2 />}
            error={errors.answer3?.message}
            disabled={networkingMabaAssignment.is_done}
          />
          <Input
            {...register("answer4")}
            label={networkingMabaAssignment.questions[3].question.question}
            placeholder={`${networkingMabaAssignment.is_done ? networkingMabaAssignment.questions[3].answer : "Masukkan jawabanmu di sini"}`}
            icon={<HiChatAlt2 />}
            error={errors.answer4?.message}
            disabled={networkingMabaAssignment.is_done}
          />

          <div className="mt-3 flex">
            <Button
              label="Kumpulkan"
              type={`${networkingMabaAssignment.is_done ? "reset" : "submit"}`}
              size="lg"
              disabled={isSubmitting}
              className={`${networkingMabaAssignment.is_done && "cursor-not-allowed hover:bg-none"}`}
            />
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
              error={errors.photo?.message}
              answer={
                networkingMabaAssignment.is_done
                  ? networkingMabaAssignment.img_url
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
