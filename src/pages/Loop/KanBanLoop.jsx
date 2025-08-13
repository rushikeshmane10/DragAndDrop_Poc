import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import { KANBANHEADER, KANBANTASKS } from "../../constants/KanbanConstant";

function hasDraggableData(item) {
  return item?.data?.current?.type;
}

export function CmxLoop() {
  const [columns, setColumns] = useState(KANBANHEADER);
  const [tasks, setTasks] = useState(KANBANTASKS);
  const [openModal, setOpenModal] = useState(true);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor)
  );

  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;
    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === active.id
      );
      const overColumnIndex = columns.findIndex((col) => col.id === over.id);
      if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    if (!isActiveATask) return;

    const activeTask = activeData.task;

    if (isOverATask) {
      const overTask = overData.task;

      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        const activeIndex = updatedTasks.findIndex((t) => t.id === active.id);
        const overIndex = updatedTasks.findIndex((t) => t.id === over.id);

        if (activeIndex === -1 || overIndex === -1) return tasks;

        if (activeTask.columnId !== overTask.columnId) {
          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            columnId: overTask.columnId,
          };
        }

        return arrayMove(updatedTasks, activeIndex, overIndex);
      });
    }

    if (isOverAColumn) {
      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        const activeIndex = updatedTasks.findIndex((t) => t.id === active.id);

        if (activeIndex === -1) return tasks;

        updatedTasks[activeIndex] = {
          ...updatedTasks[activeIndex],
          columnId: over.id,
        };

        return updatedTasks;
      });
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <BoardContainer>
          <SortableContext items={columnsId}>
            {columns.map((col) => {
              const columnTasks = useMemo(
                () => tasks.filter((task) => task.columnId === col.id),
                [tasks, col.id]
              );

              return (
                <BoardColumn
                  key={col.id}
                  column={col}
                  tasks={columnTasks}
                  onDeleteTask={handleDeleteTask}
                />
              );
              
            })}
          </SortableContext>
        </BoardContainer>
      </DndContext>
    </>
  );
}
