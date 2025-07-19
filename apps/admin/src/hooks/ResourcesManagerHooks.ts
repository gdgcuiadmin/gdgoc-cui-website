import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  Resource,
} from "../lib/supabase";

const useResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const data = await getResources();
      return data.data;
    },
  });
};

const useCreateResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

const useUpdateResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) =>
      updateResource(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

const useDeleteResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

export {
  useResources,
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
};
