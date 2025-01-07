import userApiRequest from "@/services/user.services";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useQueryProfiles = (
  { name }: { name: string },
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: ["Profiles", name],
    queryFn: async () => {
      const response = await userApiRequest.getUserProfile({ name });
      if (response.status === "error") throw new Error(response.data.message);
      return response;
    },
    retry: false,
  });
};
export const useQueryConversation = (
  { receiver_id }: { receiver_id: string },
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: ["Conversation", receiver_id],
    queryFn: async () => {
      const response = await userApiRequest.getConversation({ receiver_id });
      if (response.status === "error") throw new Error(response.data.message);
      return response;
    },
    retry: false,
  });
};
