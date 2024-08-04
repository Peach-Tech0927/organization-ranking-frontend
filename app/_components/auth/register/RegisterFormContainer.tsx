"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { AxiosResponse } from "axios";
import authAPI from "@/app/_api/auth/auth-api";
import { AuthRegisterResponse } from "@/app/type/auth";
import RegisterForm from "./RegisterForm";

const schema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "英数字6文字以上入力してください" }),
  githubId: z.string().min(1, { message: "GitHub IDを入力してください" }),
});

const RegisterFormContainer = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      githubId: "",
    },
    resolver: zodResolver(schema),
  });

  const createMutation = useMutation({
    mutationFn: ({
      username,
      email,
      password,
      githubId,
    }: {
      username: string;
      email: string;
      password: string;
      githubId: string;
    }) => authAPI.register(username, email, password, githubId),
    onSuccess: (response) => {
      const token = response.data.token;
      Cookies.set("token", token);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      alert("Registration failed: " + error.message);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await createMutation.mutateAsync({
        username: data.name,
        email: data.email,
        password: data.password,
        githubId: data.githubId,
      });
    } catch (error) {
      console.log("Registration failed: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={loading}
    />
  );
};

export default RegisterFormContainer;
