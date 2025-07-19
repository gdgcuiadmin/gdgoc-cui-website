import {
  createTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  TeamMember,
  updateTeamMember,
} from "../lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTeamMembers = () => {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const data = await getAllTeamMembers();
      return data.data;
    },
  });
};

const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
};

const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeamMember> }) =>
      updateTeamMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
};

const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
};

export {
  useCreateTeamMember,
  useDeleteTeamMember,
  useUpdateTeamMember,
  useTeamMembers,
};
