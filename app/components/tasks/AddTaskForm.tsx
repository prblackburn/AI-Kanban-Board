import { Form, useActionData, useNavigation } from "@remix-run/react";

interface ActionData {
  errors?: {
    title?: string;
  };
}

export function AddTaskForm() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-2xl w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Task
      </h2>
      
      <Form method="post" className="flex flex-col sm:flex-row gap-3">
        <input type="hidden" name="intent" value="create" />
        
        <div className="flex-1">
          <label htmlFor="title" className="sr-only">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
              actionData?.errors?.title 
                ? "border-red-300 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="What needs to be done?"
            autoComplete="off"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-describedby={actionData?.errors?.title ? "title-error" : undefined}
          />
          {actionData?.errors?.title && (
            <p id="title-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {actionData.errors.title}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm whitespace-nowrap ${
            isSubmitting 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Adding...
            </span>
          ) : (
            "Add Task"
          )}
        </button>
      </Form>
    </div>
  );
}