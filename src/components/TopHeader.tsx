import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import ThemeToggle from "./ThemeToggle";
import { PlusIcon } from "../icons/PlusIcon";
import CreateContent from "./CreateContent";

const TopHeader = () => {

  const [modelOpen, setModelOpen] = useState<boolean>(false);

  return (
    <header
      className="top-0 left-0 right-0 
        bg-bg text-text
        px-4 sm:px-6
        pt-10 [@media(min-width:400px)_and_(max-width:645px)]:pt-6 pb-4 sm:py-5
        border-b border-border
        flex flex-row sm:flex-row
        items-start sm:items-center
        justify-between
        gap-4
      "
    >
      {/* Title */}
      <h1 className="font-bold text-2xl sm:text-3xl font-sans sm:pl-10 md:pl-6 [@media(min-width:400px)_and_(max-width:645px)]:pl-10">
        All Notes
      </h1>


      <div className="flex flex-wrap sm:items-center gap-2">
        <button className="btn-secondry flex items-center gap-2">
          <ShareIcon size="lg" />
          <span className="hidden md:inline">Share Brain</span>
        </button>

        <button
          onClick={() => setModelOpen(true)}
          className="btn-primary flex items-center gap-2">
          <PlusIcon size="lg" />
          <span className="hidden md:inline">Add Content</span>
        </button>
        <CreateContent open={modelOpen} onClose={() => { setModelOpen(false) }} />

        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopHeader;
