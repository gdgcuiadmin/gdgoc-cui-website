import {
  createGalleryImage,
  deleteGalleryImage,
  GalleryImage,
  getGalleryImages,
  updateGalleryImage,
} from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useGalleryImages = () => {
  return useQuery({
    queryKey: ["galleryImages"],
    queryFn: async () => {
      const data = await getGalleryImages();
      return data.data;
    },
  });
};

const useCreateGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryImages"] });
    },
  });
};

const useUpdateGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<GalleryImage> }) =>
      updateGalleryImage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryImages"] });
    },
  });
};

interface DeleteParams {
  id: string;
  fileName: string;
}

// Custom hook for deleting a gallery image
const useDeleteGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, fileName }: DeleteParams) => deleteGalleryImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryImages"] });
    },
  });
};

export {
  useGalleryImages,
  useCreateGalleryImage,
  useDeleteGalleryImage,
  useUpdateGalleryImage,
};

export type { DeleteParams };
