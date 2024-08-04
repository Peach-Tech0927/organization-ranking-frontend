import { Button, Container, Typography, Box } from "@mui/material";
import CustomInput from "../../common/CustomInput";
import { FieldValues, UseFormRegister, FormState } from "react-hook-form";

type TProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  loading: boolean;
};

const RegisterForm: React.FC<TProps> = ({
  onSubmit,
  register,
  errors,
  loading,
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={5}
        onSubmit={onSubmit}
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
          登録する
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
