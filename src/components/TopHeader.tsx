import { useState } from "react";
import { Share2Icon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { PlusIcon } from "lucide-react";
import CreateContent from "./CreateContent";
import ShareBrain from "./ShareBrain";

const TopHeader = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [shareBrainModelOpen, setShareBrainModelOpen] = useState(false);

  return (
    <>
      <header
        className="max-w-[1250px] top-0 left-0 right-0 bg-bg text-text px-4 pr-16
         pt-4 [@media(min-width:400px)_and_(max-width:800px)]:pt-6 pl-16 pb-4 sm:py-5 border-b border-border
          flex flex-row sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-bold text-2xl sm:text-3xl">
          All Notes
        </h1>

        <div className="flex gap-2">

          {/*  share brain model */}
          <button
            onClick={() => setShareBrainModelOpen(true)}
            className="btn-secondry flex gap-2">
            <Share2Icon />
            <span className="hidden md:inline">Share Brain</span>
          </button>

          {/* create content model */}
          <button
            onClick={() => setModelOpen(true)}
            className="btn-primary flex gap-2"
          >
            <PlusIcon />
            <span className="hidden md:inline">Add Content</span>
          </button>

          {/*  theme toggle */}
          <ThemeToggle />
        </div>
      </header>

      <CreateContent open={modelOpen} onClose={() => setModelOpen(false)} />
      <ShareBrain open={shareBrainModelOpen} onClose={() => setShareBrainModelOpen(false)} />
    </>
  );
};

export default TopHeader;
