import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllTasks, createTask, updateTaskStatus, deleteTask, type Task } from "~/lib/tasks.server";
import { KanbanBoard } from "~/components/board/KanbanBoard";

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
  
  return <KanbanBoard tasks={tasks} />;
}

