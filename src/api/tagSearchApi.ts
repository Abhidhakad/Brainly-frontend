import { apiClient } from "./apiClient";

export interface TagResponse {
  _id: string;
  tagName: string;
}

// search tags
export const tagSearchApi = async (
  searchStr: string
): Promise<TagResponse[]> => {
  const res = await apiClient.get("/search-tag", {
    params: { searchStr },
  });

  return res.data;
};
