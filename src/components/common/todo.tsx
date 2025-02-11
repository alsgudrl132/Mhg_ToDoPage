import React from "react";

interface TodoProps {
  desc: string;
}

function Todo({ desc }: TodoProps) {
  return (
    <div>
      <div className="flex items-center justify-between p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors">
        <p className="text-gray-700">1</p>
      </div>
    </div>
  );
}

export default Todo;
