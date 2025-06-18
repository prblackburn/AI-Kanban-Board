import type { Task } from "~/types";
import { ColumnHeader } from "./ColumnHeader";
import { TaskCard } from "../tasks/TaskCard";
import { AddTaskForm } from "../tasks/AddTaskForm";

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const doingTasks = tasks.filter(task => task.status === 'doing');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">AI Kanban Board</h1>
      
      <AddTaskForm />
      
      <div className="grid grid-cols-3 gap-6 mt-8">
        {/* To Do Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <ColumnHeader title="To Do" count={todoTasks.length} />
          <div className="space-y-3 mt-4">
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Doing Column */}
        <div className="bg-blue-50 rounded-lg p-4">
          <ColumnHeader title="Doing" count={doingTasks.length} />
          <div className="space-y-3 mt-4">
            {doingTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="bg-green-50 rounded-lg p-4">
          <ColumnHeader title="Done" count={doneTasks.length} />
          <div className="space-y-3 mt-4">
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}