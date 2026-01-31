import { useEffect } from "react";
import toast from "react-hot-toast";
import Cards from "./Cards";
import { useContentStore } from "../store/useContentStore";

const Dashboard = () => {
  const fetchContent = useContentStore((state) => state.fetchContent);
  const isLoading = useContentStore((state) => state.isLoading);
  const contents = useContentStore((state) => state.contents);

  useEffect(() => {
    if (contents.length > 0) return;

    fetchContent().catch((error) =>
      toast.error(
        error instanceof Error ? error.message : "Failed to load content",
        { position: "top-center" }
      )
    );
  }, [fetchContent, contents.length]);

  // Loaading
  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-sm opacity-70">
        Loading content…
      </div>
    );
  }

  // when state is empty
  if (!isLoading && contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium">No content yet</p>
        <p className="text-sm opacity-60">
          Start by adding your first note or link
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <Cards />
    </div>
  );
};

export default Dashboard;
