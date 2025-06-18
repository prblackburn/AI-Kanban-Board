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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Kanban Board</h1>
          <p className="text-lg text-gray-600">Organize and track your tasks efficiently</p>
        </header>
        
        <div className="mb-8 flex justify-center">
          <AddTaskForm />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
              <ColumnHeader title="To Do" count={todoTasks.length} />
            </div>
            <div className="p-4 space-y-3 min-h-[200px]">
              {todoTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No tasks yet</p>
                </div>
              ) : (
                todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Doing Column */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-100 px-6 py-4">
              <ColumnHeader title="Doing" count={doingTasks.length} />
            </div>
            <div className="p-4 space-y-3 min-h-[200px]">
              {doingTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-blue-300 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No tasks in progress</p>
                </div>
              ) : (
                doingTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-green-50 border-b border-green-100 px-6 py-4">
              <ColumnHeader title="Done" count={doneTasks.length} />
            </div>
            <div className="p-4 space-y-3 min-h-[200px]">
              {doneTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-green-300 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No completed tasks</p>
                </div>
              ) : (
                doneTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}