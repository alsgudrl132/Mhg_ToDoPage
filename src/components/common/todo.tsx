interface TodoProps {
  id: number;
}

function Todo({ id }: TodoProps) {
  const getTodos = () => {
    const storageData = JSON.parse(localStorage.getItem("boards") || "[]");
    const currentBoard = storageData.find((board: any) => board.id === id);
    return currentBoard?.desc || [];
  };

  return (
    <div>
      {getTodos().map((todo: string, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <p className="text-gray-700">{todo}</p>
        </div>
      ))}
    </div>
  );
}

export default Todo;
