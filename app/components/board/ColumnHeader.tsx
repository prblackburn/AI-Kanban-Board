interface ColumnHeaderProps {
  title: string;
  count: number;
}

export function ColumnHeader({ title, count }: ColumnHeaderProps) {
  const getStatusColor = (title: string) => {
    switch (title) {
      case "To Do":
        return "text-gray-700";
      case "Doing":
        return "text-blue-700";
      case "Done":
        return "text-green-700";
      default:
        return "text-gray-700";
    }
  };

  const getBadgeColor = (title: string) => {
    switch (title) {
      case "To Do":
        return "bg-gray-200 text-gray-700";
      case "Doing":
        return "bg-blue-200 text-blue-800";
      case "Done":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (title: string) => {
    switch (title) {
      case "To Do":
        return <div className="w-3 h-3 rounded-full bg-gray-400"></div>;
      case "Doing":
        return <div className="w-3 h-3 rounded-full bg-blue-500"></div>;
      case "Done":
        return <div className="w-3 h-3 rounded-full bg-green-500"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-400"></div>;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className={`text-lg font-semibold flex items-center gap-2 ${getStatusColor(title)}`}>
        {getStatusIcon(title)}
        {title}
      </h2>
      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getBadgeColor(title)}`}>
        {count}
      </span>
    </div>
  );
}