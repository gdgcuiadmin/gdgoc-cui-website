import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEventCertificates,
  createEventCertificate,
  updateEventCertificate,
  deleteEventCertificate,
  EventCertificate,
} from "../lib/db";

export const useCertificates = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const data = await getEventCertificates();
      return data.data;
    },
  });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEventCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<EventCertificate>;
    }) => updateEventCertificate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEventCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};
