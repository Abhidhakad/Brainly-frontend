import { apiClient } from "./apiClient";
import { handleApiError } from "../utils/handleApiError";

export interface Tag {
  _id:string;
  tagName:string;
}

export interface ContentResponse {
  _id: string;
  title: string;
  link: string;
  description: string;
  tags: Tag[];
  type:string;
  public?: boolean;
  createdAt: string;
}

interface AllContentResponse {
  data: ContentResponse[];
}

/* Fetch all content */
export const fetchContentApi = async (): Promise<ContentResponse[]> => {
  try {
    const res = await apiClient.get<AllContentResponse>("/content");
    return res.data.data; 
  } catch (error) {
    handleApiError(error, "Failed to fetch content");
    throw error;
  }
};


/* Create content */
export const createContentApi = async (
  title: string,
  link: string,
  description: string,
  tags: string[]
): Promise<ContentResponse> => {
  try {
    const res = await apiClient.post("/content", {
      title,
      link,
      description,
      tags,
    });
    return res.data.data;
  } catch (error) {
    handleApiError(error, "failed to create content");
    throw error;
  }
};

/* Update content */
export const updateContentApi = async (
  id: string,
  data: Partial<Omit<ContentResponse, "_id" | "createdAt">>
): Promise<ContentResponse> => {
  const res = await apiClient.put(`/content/${id}`, data);
  return res.data;
};


// Chnage content visibility
export const makeContentVisibilityApi = async (
  id: string,
  isPublic: boolean
): Promise<void> => {
  try {
    await apiClient.patch(`/content/${id}`, {
      public: isPublic,
    });
  } catch (error) {
    handleApiError(error, "failed to update content visibility");
    throw error;
  }
};


/* Delete content*/
export const deleteContentApi = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/content/${id}`);
  } catch (error) {
    handleApiError(error, "failed to delete content");
    throw error;
  }
};
