import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllTasks, createTask, updateTaskStatus, deleteTask, type Task } from "~/lib/tasks.server";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Kanban Board" },
    { name: "description", content: "Manage your tasks with a simple Kanban board" },
  ];
};

// Loader function - fetches data for the page
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const tasks = getAllTasks();
    return json({ tasks });
  } catch (error) {
    console.error("Error loading tasks:", error);
    throw new Response("Failed to load tasks", { status: 500 });
  }
}

// Action function - handles form submissions
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    switch (intent) {
      case "create": {
        const title = formData.get("title");
        
        if (!title || typeof title !== "string") {
          throw new Response("Task title is required", { status: 400 });
        }
        
        createTask(title);
        return redirect("/");
      }

      case "updateStatus": {
        const taskId = formData.get("taskId");
        const status = formData.get("status");
        
        if (!taskId || !status || typeof taskId !== "string" || typeof status !== "string") {
          throw new Response("Task ID and status are required", { status: 400 });
        }
        
        const id = parseInt(taskId, 10);
        if (isNaN(id)) {
          throw new Response("Invalid task ID", { status: 400 });
        }
        
        if (!["todo", "doing", "done"].includes(status)) {
          throw new Response("Invalid status", { status: 400 });
        }
        
        updateTaskStatus(id, status as "todo" | "doing" | "done");
        return redirect("/");
      }

      case "delete": {
        const taskId = formData.get("taskId");
        
        if (!taskId || typeof taskId !== "string") {
          throw new Response("Task ID is required", { status: 400 });
        }
        
        const id = parseInt(taskId, 10);
        if (isNaN(id)) {
          throw new Response("Invalid task ID", { status: 400 });
        }
        
        deleteTask(id);
        return redirect("/");
      }

      default:
        throw new Response("Invalid action", { status: 400 });
    }
  } catch (error) {
    console.error("Action error:", error);
    
    // If it's already a Response (thrown above), re-throw it
    if (error instanceof Response) {
      throw error;
    }
    
    // For other errors, return a generic error response
    throw new Response("An error occurred while processing your request", { status: 500 });
  }
}

// Main component
export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();
  
  // Filter tasks by status
  const todoTasks = tasks.filter((task: Task) => task.status === "todo");
  const doingTasks = tasks.filter((task: Task) => task.status === "doing");
  const doneTasks = tasks.filter((task: Task) => task.status === "done");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Kanban Board</h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </header>

        {/* Add Task Form */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Add New Task</h2>
          <form method="post" className="flex gap-4">
            <input type="hidden" name="intent" value="create" />
            <input
              type="text"
              name="title"
              placeholder="Enter task title..."
              required
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* To Do Column */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">To Do</h2>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600">
                {todoTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {todoTasks.length === 0 ? (
                <p className="text-gray-500">No tasks yet</p>
              ) : (
                todoTasks.map((task: Task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Doing Column */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Doing</h2>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-600">
                {doingTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {doingTasks.length === 0 ? (
                <p className="text-gray-500">No tasks in progress</p>
              ) : (
                doingTasks.map((task: Task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Done</h2>
              <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-600">
                {doneTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {doneTasks.length === 0 ? (
                <p className="text-gray-500">No completed tasks</p>
              ) : (
                doneTasks.map((task: Task) => (
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

// Task Card Component
function TaskCard({ task }: { task: Task }) {
  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "todo":
        return "doing";
      case "doing":
        return "done";
      case "done":
        return "todo";
      default:
        return "todo";
    }
  };

  const getStatusButtonText = (currentStatus: string) => {
    switch (currentStatus) {
      case "todo":
        return "Start";
      case "doing":
        return "Complete";
      case "done":
        return "Reset";
      default:
        return "Start";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="font-medium text-gray-900">{task.title}</h3>
      <p className="mt-1 text-sm text-gray-500">Created: {formatDate(task.created_at)}</p>
      
      <div className="mt-3 flex gap-2">
        {/* Status Update Button */}
        <form method="post" className="flex-1">
          <input type="hidden" name="intent" value="updateStatus" />
          <input type="hidden" name="taskId" value={task.id} />
          <input type="hidden" name="status" value={getNextStatus(task.status)} />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {getStatusButtonText(task.status)}
          </button>
        </form>

        {/* Delete Button */}
        <form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="taskId" value={task.id} />
          <button
            type="submit"
            onClick={(e) => {
              if (!confirm("Are you sure you want to delete this task?")) {
                e.preventDefault();
              }
            }}
            className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}