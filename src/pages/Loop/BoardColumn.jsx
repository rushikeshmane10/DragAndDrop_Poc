import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import { ScrollArea, ScrollBar } from "../../atoms/scroll-area";


export function BoardColumn({ column, tasks, isOverlay, onDeleteTask }) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };
  const variants = cva(
    "h-[500px] max-h-[500px] w-[350px] max-w-full bg-white shadow-lg rounded-2xl flex flex-col flex-shrink-0 snap-center py-3 border border-gray-200",
    {
      variants: {
        dragging: {
          default: "border-transparent",
          over: "ring-2 ring-primary/50 opacity-40",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : "default",
      })}
    >
      <div
        className="text-lg font-semibold cursor-grab text-gray-800 flex items-center justify-between py-2 pl-4 border-b border-gray-400"
        {...attributes}
        {...listeners}
      >
        <span>{column.title}</span>
      </div>

      <ScrollArea className="pt-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </ScrollArea>
    </div>
  );
}

export function BoardContainer({ children }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-center flex-row justify-center">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
