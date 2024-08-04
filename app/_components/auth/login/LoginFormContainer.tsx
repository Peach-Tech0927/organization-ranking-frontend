"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import authAPI from "@/app/_api/auth/auth-api";
import LoginForm from "./LoginForm";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "英数字6文字以上入力してください" }),
});

const LoginFormContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authAPI.login(email, password),
    onSuccess: (response) => {
      const token = response.data.token;
      Cookies.set("token", token);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      alert("Login failed: " + error.message);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log("Login failed: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={loading}
    />
  );
};

export default LoginFormContainer;
