import type { Task } from "~/types";
import { Form } from "@remix-run/react";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextStatus = (currentStatus: Task['status']) => {
    switch (currentStatus) {
      case 'todo':
        return 'doing';
      case 'doing':
        return 'done';
      case 'done':
        return 'todo';
      default:
        return 'todo';
    }
  };

  const getStatusButtonText = (currentStatus: Task['status']) => {
    switch (currentStatus) {
      case 'todo':
        return 'Start';
      case 'doing':
        return 'Complete';
      case 'done':
        return 'Restart';
      default:
        return 'Move';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group">
      <div className="mb-3">
        <h3 className="font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
          {task.title}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-gray-500">
            {formatDate(task.created_at)}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Form method="post" className="flex-1">
          <input type="hidden" name="intent" value="updateStatus" />
          <input type="hidden" name="taskId" value={task.id} />
          <input type="hidden" name="status" value={getNextStatus(task.status)} />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            {getStatusButtonText(task.status)}
          </button>
        </Form>

        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="taskId" value={task.id} />
          <button
            type="submit"
            className="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            onClick={(e) => {
              if (!confirm('Are you sure you want to delete this task?')) {
                e.preventDefault();
              }
            }}
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </Form>
      </div>
    </div>
  );
}