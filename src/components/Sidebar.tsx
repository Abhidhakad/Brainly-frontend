import { useState } from "react";
import { Logo } from "../icons/Logo";
import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { TagIcon } from "../icons/TagICons";
import { ListIcon } from "../icons/LinkIcon";
import { CircleX, Menu } from "lucide-react"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const SidebarOptions = ["Twitter","Videos","Documents","Links","Tags"]
  return (
    <div className="h-full fixed top-0 dark:bg-sidebar-50 z-30">
      <div>
        <button
          className="md:hidden [@media(min-width:400px)_and_(max-width:645px)]:mt-4 sm:mt-4 fixed top-2 left-4 z-70 p-1 rounded-md shadow-md
                   transition-colors duration-300 cursor-pointer bg-secondary-500 dark:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CircleX className="h-6 w-6 text-text" /> : <Menu className="h-6 w-6 text-text" />}
        </button>

        {isOpen && (
          <div
            className="
      fixed inset-0 z-30 md:hidden
      bg-black/20 backdrop-blur-sm
      transition-opacity
    "
            onClick={() => setIsOpen(false)}
          />
        )}

      </div>

      <div
        className={`
          fixed top-0 left-0 pt-11 h-full bg-sidebar-50 text-text shadow-2xl z-40
          transition-transform duration-300 ease-in-out
          w-64 px-8 py-8
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >

        <div className="flex items-center space-x-2 text-2xl font-bold font-sans text-[#463DB4]">
          <Logo />
          <h2 className="text-stone-800 dark:text-text font-sans">Second Brain</h2>
        </div>
        <nav className="space-y-2 mt-4">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="Videos" icon={<YoutubeIcon />} />
          <SidebarItem text="Documnets" icon={<DocumentsIcon />} />
          <SidebarItem text="Links" icon={<ListIcon />} />
          <SidebarItem text="Tags" icon={<TagIcon />} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;


