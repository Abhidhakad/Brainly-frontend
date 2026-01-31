import { create } from "zustand";
import {
    fetchContentApi,
    createContentApi,
    updateContentApi,
    deleteContentApi,
    makeContentVisibilityApi,
    type ContentResponse,
} from "../api/contentApi";


export interface CreateContentInput {
  title: string;
  link: string;
  description: string;
  tags: string[]; 
}


interface ContentState {
    contents: ContentResponse[];
    isLoading: boolean;

    fetchContent: () => Promise<void>;
    createContent: (data: CreateContentInput) => Promise<void>;

    updateContent: (
        id: string,
        data: Partial<Omit<ContentResponse, "_id" | "createdAt" >>
    ) => Promise<void>;

    chnageContentVisibility: (id: string, isPublic: boolean) => Promise<void>;

    deleteContent: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set) => ({
    contents: [],
    isLoading: false,

    fetchContent: async () => {
        set({ isLoading: true });
        try {
            const data = await fetchContentApi();
            set({ contents: data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    createContent: async (data) => {
        set({ isLoading: true });
        try {
            const newContent = await createContentApi(
                data.title,
                data.link,
                data.description,
                data.tags
            );

            set((state) => ({
                contents: [newContent, ...state.contents],
                isLoading: false,
            }));
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    updateContent: async (id, data) => {
        set({ isLoading: true });
        try {
            const updated = await updateContentApi(id, data);

            set((state) => ({
                contents: state.contents.map((item) =>
                    item._id === id ? updated : item
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    chnageContentVisibility: async (id: string, isPublic: boolean) => {

        set({ isLoading: true });

        try {

            await makeContentVisibilityApi(id, isPublic);


            set((state) => ({
                contents: state.contents.map((item) =>
                    item._id === id ? { ...item, public: isPublic } : item
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },


    deleteContent: async (id) => {
        set({ isLoading: true });
        try {
            await deleteContentApi(id);

            set((state) => ({
                contents: state.contents.filter((item) => item._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },
}));
