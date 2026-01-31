import toast from "react-hot-toast";

interface ToastWarningProps {
  message?: string;
  onConfirm: () => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
}

export const showToastWarning = ({
  message = "Are you sure you want to continue?",
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ToastWarningProps) => {
  toast(
    (t) => (
      <div
        className="flex flex-col gap-3 bg-sidebar-50
          text-gray-900 dark:text-gray-100 rounded-xl p-4 shadow-xl
          border border-gray-200 dark:border-gray-700 min-w-[280px]">
        <p className="text-sm font-medium">{message}</p>

        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-800
              hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            {cancelText}
          </button>

          <button
            className="
              px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            onClick={async () => {
              toast.dismiss(t.id);
              await onConfirm();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: "top-center",
      style: {
        background: "transparent", 
        boxShadow: "none",
      },
    }
  );
};
