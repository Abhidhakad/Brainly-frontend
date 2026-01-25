import { create } from "zustand";
import { fetchContentApi, createContentApi, type ContentResponse } from "../api/contentApi";

interface ContentState {
    contents: ContentResponse[];
    isLoading: boolean;
    error: string | null;

    fetchContent: () => Promise<void>;
    createContent: (
        data: Omit<ContentResponse, "_id" | "createdAt">
    ) => Promise<void>;
    updateContent: (
        id: string,
        data: Partial<ContentResponse>
    ) => Promise<void>;
    deleteContent: (id: string) => Promise<void>;

    clearError: () => void;
}

export const useContentStore = create<ContentState>((set) => ({
    contents: [],
    isLoading: false,
    error: null,

    fetchContent: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchContentApi();
            set({ contents: data });
        } catch (err: unknown) {
            let message = "Failed to fetch content";
            if (err instanceof Error) {
                message = err.message;
            }
            set({
                error: message,
            });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    createContent: async (data) => {
        set({ isLoading: true, error: null });
        try {
            
            const newContent = await createContentApi(data.title, data.link, data.description, data.tags)

            set((state) => ({
                contents: [newContent, ...state.contents],
            }));

        } catch (err: unknown) {

            let message = "Failed to create content";
            if (err instanceof Error) {
                message = err.message;
            }
            set({
                error: message,
            });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    updateContent: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            set((state) => ({
                contents: state.contents.map((item) =>
                    item._id === id ? { ...item, ...data } : item
                ),
            }));
        } catch (err: unknown) {

            let message = "Failed to update content";
            if (err instanceof Error) {
                message = err.message;
            }
            set({
                error: message,
            });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteContent: async (id) => {
        set({ isLoading: true, error: null });
        try {
            set((state) => ({
                contents: state.contents.filter((item) => item._id !== id),
            }));
        } catch (err: unknown) {
            let message = "Failed to delete content";
            if (err instanceof Error) {
                message = err.message;
            }
            set({
                error: message,
            });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    clearError: () => set({ error: null }),
}));
