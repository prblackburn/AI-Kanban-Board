interface ColumnHeaderProps {
  title: string;
  count: number;
}

export function ColumnHeader({ title, count }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-full">
        {count}
      </span>
    </div>
  );
}