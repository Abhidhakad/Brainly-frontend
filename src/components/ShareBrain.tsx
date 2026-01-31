import { MessageCircle, Instagram, Mail, X, Send, Link as LinkIcon } from "lucide-react";
import { type IProps } from "./CreateContent";

const ShareBrain = ({ open, onClose }: IProps) => {
  const shareUrl = "https://secondbrain.app/brain/123";

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied ✅");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md -translate-y-32 rounded-2xl
          bg-white/80 p-4 shadow-lg backdrop-blur
          dark:bg-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute right-3 top-3 rounded-full p-1
            text-gray-500 hover:bg-gray-200
            transition active:scale-90
            dark:text-gray-400 dark:hover:bg-gray-800
          "
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="mb-4 text-center text-sm sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
          Share your brain 🧠
        </div>

        {/* Share buttons */}
        <div className="mb-4 grid grid-cols-4 gap-4 text-center">
          {/* WhatsApp */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
              )
            }
            className="group flex flex-col items-center gap-1 text-xs sm:text-sm"
          >
            <MessageCircle className="h-6 w-6 text-green-500 group-hover:scale-110" />
            WhatsApp
          </button>

          {/* Telegram */}
          <button
            onClick={() =>
              window.open(
                `https://t.me/share/url?url=${encodeURIComponent(
                  shareUrl
                )}`
              )
            }
            className="group flex flex-col items-center gap-1 text-xs sm:text-sm"
          >
            <Send className="h-6 w-6 text-sky-500 group-hover:scale-110" />
            Telegram
          </button>

          {/* Instagram */}
          <button
            onClick={copyLink}
            className="group flex flex-col items-center gap-1 text-xs sm:text-sm"
          >
            <Instagram className="h-6 w-6 text-pink-500 group-hover:scale-110" />
            Instagram
          </button>

          {/* Email */}
          <button
            onClick={() =>
              (window.location.href = `mailto:?body=${shareUrl}`)
            }
            className="group flex flex-col items-center gap-1 text-xs sm:text-sm"
          >
            <Mail className="h-6 w-6 text-blue-500 group-hover:scale-110" />
            Email
          </button>
        </div>

        {/* input */}
        <div className="flex overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
          <input
            value={shareUrl}
            readOnly
            className="
              flex-1 bg-white/70 px-4 py-2 text-sm
              text-gray-700 outline-none
              dark:bg-gray-800 dark:text-gray-200
            "
          />
          <button
            onClick={copyLink}
            className="
              flex items-center gap-1 px-4
              bg-gray-900 text-sm font-medium text-white
              transition active:scale-95
              dark:bg-gray-700
            "
          >
            <LinkIcon className="h-4 w-4" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareBrain;
