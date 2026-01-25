import type { ReactElement } from 'react';

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
}

export function SidebarItem({ text, icon }: SidebarItemProps) {
  return (
    <div
      className="
        group
        flex items-center gap-3
        py-2 px-4
        rounded-lg
        text-sm font-medium text-gray-700 dark:text-sidebar-text
        hover:bg-sidebar-hover-bg
        transition-colors duration-200 ease-in-out
        cursor-pointer
        max-w-full
      "
    >
      <div className="transition-colors duration-200">
        {icon}
      </div>
      <span className="truncate">{text}</span>
    </div>
  );
}
