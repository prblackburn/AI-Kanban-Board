export function AddTaskForm() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-2xl w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Task
      </h2>
      
      <form method="post" className="flex flex-col sm:flex-row gap-3">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="What needs to be done?"
            autoComplete="off"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm whitespace-nowrap"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}