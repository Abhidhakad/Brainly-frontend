import { apiClient } from "./apiClient";

export interface ContentResponse {
  _id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
  public?: boolean;
  createdAt: string;
}

/* FETCH ALl CONTENT */
export const fetchContentApi = async (): Promise<ContentResponse[]> => {
  const res = await apiClient.get("/content");
  return res.data;
};

/* CREATE CONTENT */
export const createContentApi = async (
  title: string,
  link: string,
  description: string,
  tags: string[]
): Promise<ContentResponse> => {
  const res = await apiClient.post("/content", {
    title,
    link,
    description,
    tags,
  });
  return res.data;
};

/* UPDATE CONTENT */
export const updateContentApi = async (
  id: string,
  data: Partial<Omit<ContentResponse, "_id" | "createdAt">>
): Promise<ContentResponse> => {
  const res = await apiClient.put(`/content/${id}`, data);
  return res.data;
};

/* DELETE CONTENT*/
export const deleteContentApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/content/${id}`);
};
