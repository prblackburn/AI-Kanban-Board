import type { Task } from "~/types";

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-500 mb-3">
        Created: {formatDate(task.createdAt)}
      </p>
      
      <div className="flex justify-between items-center">
        <form method="post" className="inline">
          <input type="hidden" name="intent" value="updateStatus" />
          <input type="hidden" name="taskId" value={task.id} />
          <input type="hidden" name="status" value={getNextStatus(task.status)} />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors"
          >
            {getStatusButtonText(task.status)}
          </button>
        </form>

        <form method="post" className="inline">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="taskId" value={task.id} />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition-colors"
            onClick={(e) => {
              if (!confirm('Are you sure you want to delete this task?')) {
                e.preventDefault();
              }
            }}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}