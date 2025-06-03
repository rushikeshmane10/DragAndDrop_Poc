import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";

import { IoReorderThreeOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
export function TaskCard({ task, isOverlay, onDelete }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
   <div
  ref={setNodeRef}
  style={style}
  className={cn(
    "bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg  mt-3 mx-3",
    variants({
      dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
    })
  )}
>
  <div className="px-4 py-3 space-y-2">
    <div className="flex items-start justify-between">
    <div className="flex items-center justify-between w-full  px-2 py-2">

  <div className="flex items-center space-x-2">
    <button
      variant="ghost"
      {...attributes}
      {...listeners}
      className="text-gray-400 hover:text-gray-600 cursor-grab"
    >
      <IoReorderThreeOutline className="w-[20px] h-[20px] text-gray-500" />
    </button>

    <div className="flex flex-col space-y-2">
      <div className="text-sm font-medium text-gray-800">
        {task.content}
      </div>
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <span>📅</span>
        <span>2025-05-08 to 2025-05-13</span>
      </div>
      <div className="text-xs text-[#015254] underline cursor-pointer">
        View Schedule
      </div>
    </div>
  </div>

 <div className=" ">
  <button
    variant="ghost"
    size="icon"
    onClick={onDelete}
    className="text-gray-400 hover:text-black"
  >
    ✕
  </button>
  </div>
</div>



    </div>
  </div>
</div>

  );
}
