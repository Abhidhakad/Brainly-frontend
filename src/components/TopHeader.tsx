import Button from "./ui/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import CreateContent from "./CreateContent";
import { useState } from "react";

const TopHeader = () => {
  const [modelOpen,setModelOpen] = useState<boolean>(false);
  
  return (
    <div className="w-full px-4 pl-30 bg-white sm:px-6 md:px-10 py-8 sm:py-10 max-w-5xl mx-auto flex sm:flex-row items-start sm:items-center flex-wrap justify-between gap-6 sm:gap-0 sm:ml-60">
      
      <h1 className="font-bold text-2xl sm:text-3xl text-stone-800 font-sans">All Notes</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          styles="h-12"
          title="Share Brain"
          varient="secondry"
          startIcon={<ShareIcon size="lg" />}
        />
        <Button
          size="lg"
          styles="h-12 transition-all"
          title="Add Content"
          varient="primary"
          endIcon={<PlusIcon size="lg" />}
          onClick={()=>{setModelOpen(true)}}
        />
        <CreateContent open={modelOpen} onClose={()=>{
          setModelOpen(false);
        }}/>

      </div>
    </div>
  );
};

export default TopHeader;
