import { Pencil, X } from "lucide-react";

interface TodoProps {
  id: number;
}

interface BoardType {
  id: number;
  title: string;
  description?: string[];
}

function Todo({ id }: TodoProps) {
  const getTodos = () => {
    const storageData = JSON.parse(localStorage.getItem("boards") || "[]");
    const currentBoard = storageData.find(
      (board: BoardType) => board.id === id
    );
    return currentBoard?.description || [];
  };

  return (
    <div>
      {getTodos().map((todo: string, index: number) => (
        <div
          key={index}
          className="flex gap-2 p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors w-52"
        >
          <p className="text-gray-700 text-sm break-all w-40">{todo}</p>
          <div className="flex gap-2">
            <Pencil
              size={16}
              className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
            />
            <X
              size={16}
              className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
