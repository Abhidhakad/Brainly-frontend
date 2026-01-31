import { create } from "zustand";
import { tagSearchApi, type TagResponse } from "../api/tagSearchApi";

interface TagState {
  tags: TagResponse[];
  isLoading: boolean;

  searchTag: (query: string) => void;
  clearTags: () => void;
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  isLoading: false,
  

  searchTag: (query) => {
    // clearing previous debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // if query too short → clear results
    if (query.trim().length < 2) {
      set({ tags: [], isLoading: false });
      return;
    }

    debounceTimer = setTimeout(async () => {
      set({ isLoading: true });

      try {
        const data = await tagSearchApi(query);
        set({ tags: data, isLoading: false });
      } catch (err) {
        set({
          isLoading: false,
        });
        throw err;
      }
    }, 400);
  },

  clearTags: () => set({ tags: [] }),
}));
