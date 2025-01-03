import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { useAuth } from "@/context/AuthContext";
import authApiRequest from "@/services/auth.services";
import { TLoginAuth, TRegisterAuth } from "@/types/auth";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export const useAuthenticated = (
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  const { setIsAuthenticated } = useAuth();

  return useQuery<any>({
    ...options,
    queryKey: ["VerifiedUserValidator"],
    queryFn: async () => {
      const response = await authApiRequest.VerifiedUserValidator();

      if (response.status === "error") {
        throw new Error(response.data.message);
      }

      if (response) {
        setIsAuthenticated(true);
      }

      return response;
    },
    retry: false,
  });
};

export const useLoginMutation = (
  options?: UseMutationOptions<any, unknown, TLoginAuth, unknown>
) => {
  const { setIsAuthenticated } = useAuth();
  return useMutation({
    ...options,
    mutationFn: (body: Omit<TLoginAuth, "login">) =>
      authApiRequest.Login({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
      }
    },
  });
};

export const useRegisterMutation = (
  options?: UseMutationOptions<any, unknown, TRegisterAuth, unknown>
) => {
  const { setIsAuthenticated } = useAuth();
  return useMutation({
    ...options,
    mutationFn: (body: Omit<TRegisterAuth, "register">) =>
      authApiRequest.Register({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
      }
    },
  });
};

export const useLoginGoogleMutation = (
  options?: UseMutationOptions<any, unknown, { token: string }, unknown>
) => {
  const { setIsAuthenticated } = useAuth();
  return useMutation({
    ...options,
    mutationFn: (body: Omit<{ token: string }, "google">) =>
      authApiRequest.LoginGoogle({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
      }
    },
  });
};

export const useLogoutMutation = (options?: UseMutationOptions<any>) => {
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    ...options,
    mutationFn: () => authApiRequest.Logout(),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(false);
      }
    },
  });
};
