"use client";
import { Button, Container, Typography, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import authAPI from "@/app/_api/auth/auth-api";
import { useRouter } from "next/navigation";
import CustomInput from "../common/CustomInput";
import { useState } from "react";
import { AuthRegisterResponse } from "@/app/type/auth";

const schema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "英数字6文字以上入力してください" }),
  githubId: z.string().min(1, { message: "GitHub IDを入力してください" }),
});

const Register = () => {
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
    onSuccess: (response: AxiosResponse<AuthRegisterResponse>) => {
      const token = response.data.token;
      Cookies.set("token", token);
      router.push("/login-success");
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
    // TODO: refactor to presentational components in other branch
    <Container maxWidth="sm">
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={5}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <CustomInput
          id="name"
          label="ユーザー名"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <CustomInput
          id="email"
          label="メールアドレス"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <CustomInput
          id="password"
          label="パスワード"
          type="password"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <CustomInput
          id="githubId"
          label="GitHub ID"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
