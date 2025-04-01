import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { useAuthStore } from "@/store/auth-store";

import useAuthMutation from "./actions";
import LoginFormContent from "./FormContent";
import { LoginFormType, LoginSchema } from "./schema";

const LoginForm = () => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const { setToken } = useAuthStore();
  const { mutate,isPending } = useAuthMutation({
    onSuccess: (res) => {
      setToken(res?.accessToken);
      window.location.replace("/dashboard");
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <LoginFormContent isPending={isPending} />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
