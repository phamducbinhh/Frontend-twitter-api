import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import authApiRequest from "@/services/auth.services";
import { useGlobalStore } from "@/stores/state";
import { TLoginAuth, TRegisterAuth } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useVerifiedUserValidator = () => {
  const { setIsLoggedIn } = useGlobalStore();

  return useQuery({
    queryKey: ["VerifiedUserValidator"],
    queryFn: async () => {
      const response = await authApiRequest.VerifiedUserValidator();
      if (response.status === "error") throw new Error(response.data.message);
      setIsLoggedIn(true);
      return response;
    },
    retry: false,
  });
};

export const useLoginMutation = () => {
  const { setIsLoggedIn } = useGlobalStore();

  return useMutation({
    mutationFn: (body: TLoginAuth) => authApiRequest.Login({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsLoggedIn(true);
      }
    },
  });
};

export const useRegisterMutation = () => {
  const { setIsLoggedIn } = useGlobalStore();

  return useMutation({
    mutationFn: (body: TRegisterAuth) => authApiRequest.Register({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsLoggedIn(true);
      }
    },
  });
};

export const useLogoutMutation = () => {
  const { setIsLoggedIn } = useGlobalStore();

  return useMutation({
    mutationFn: () => authApiRequest.Logout(),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsLoggedIn(false);
      }
    },
  });
};
