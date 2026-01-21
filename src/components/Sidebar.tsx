import { useState } from "react";
import { Logo } from "../icons/Logo";
import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { TagIcon } from "../icons/TagICons";
import {ListIcon} from "../icons/LinkIcon";
import { X,Menu } from "lucide-react"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const SidebarOptions = ["Twitter","Videos","Documents","Links","Tags"]
  return (
    <div className="h-full fixed top-0">
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6 text-purple-600" />}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-2xl z-40
          transition-transform duration-300 ease-in-out
          w-64 px-8 py-8 text-black
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
       
        <div className="flex items-center space-x-2 text-2xl font-bold font-sans text-[#463DB4]">
          <Logo />
          <h2 className="text-stone-800 font-sans">Second Brain</h2>
        </div>


        
        <nav className="space-y-2 mt-4">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="Videos" icon={<YoutubeIcon />} />
          <SidebarItem text="Documnets" icon={<DocumentsIcon/>} />
          <SidebarItem text="Links" icon={<ListIcon />} />
          <SidebarItem text="Tags" icon={<TagIcon />} />

        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
