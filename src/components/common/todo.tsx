import { Pencil, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useBoardStore } from "@/store/useBoardStore";

interface TodoListProps {
  boardId: number;
}

function Todo({ boardId }: TodoListProps) {
  const [todo, setTodo] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<string>("");
  const [openDialogId, setOpenDialogId] = useState<number | boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { boards, addTodo, editTodo, deleteTodo, dragTodoStart, dragTodoEnd } =
    useBoardStore();
  const currentBoard = boards.find((board) => board.id === boardId);
  const contents = currentBoard?.contents || [];

  const handleTodoDragStart = (e: React.DragEvent, idx: number) => {
    e.stopPropagation();
    setIsDragging(true);
    dragTodoStart(idx, boardId);
    setIsDragging(false);
  };

  const handleTodoDragEnd = (e: React.DragEvent, idx: number) => {
    e.stopPropagation();
    setIsDragging(false);
    setDragOver(false);
    dragTodoEnd(idx, boardId);
  };

  const handleTodoDragOver = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!dragOver) setDragOver(true);
  };

  const handleTodoDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    setDragOver(false);
  };

  const handleEmptyAreaDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(false);
    dragTodoEnd(contents.length, boardId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    option: "add" | "edit",
    id?: number
  ): void => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && option === "add") {
      handleAddTodo();
    }
    if (id && e.key === "Enter" && option === "edit") {
      handleEditTodo(id);
    }
  };

  const handleAddTodo = () => {
    if (!todo.trim()) {
      alert("투두 내용을 입력해주세요.");
      return;
    }
    addTodo(boardId, todo.trim());
    setTodo("");
    setIsOpen(false);
    alert("새로운 투두가 추가되었습니다.");
  };

  const handleEditTodo = (todoId: number) => {
    if (!editingTodo.trim()) {
      alert("투두 내용을 입력해주세요.");
      return;
    }
    editTodo(boardId, todoId, editingTodo.trim());
    setEditingTodo("");
    setOpenDialogId(false);
    alert("투두가 수정되었습니다.");
  };

  const handleDeleteTodo = (todoId: number) => {
    if (window.confirm("정말로 이 투두를 삭제하시겠습니까?")) {
      deleteTodo(boardId, todoId);
      alert("투두가 삭제되었습니다.");
    }
  };

  return (
    <div
      onDragOver={handleTodoDragOver}
      onDragLeave={handleTodoDragLeave}
      onDrop={handleEmptyAreaDrop}
      className={`min-h-[50px] p-2 ${dragOver ? "bg-gray-100 rounded-lg" : ""}`}
    >
      {contents.map((item, idx) => (
        <div key={item.id}>
          <div
            className={`flex gap-2 p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors w-full sm:w-52 cursor-move
             ${
               isDragging
                 ? "opacity-50 border-2 border-dashed border-gray-300"
                 : ""
             }`}
            draggable={true}
            onDragStart={(e) => handleTodoDragStart(e, idx)}
            onDragEnd={(e) => handleTodoDragEnd(e, idx)}
            onDragOver={handleTodoDragOver}
            onDragLeave={handleTodoDragLeave}
            onDrop={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDragOver(false);
              dragTodoEnd(idx, boardId);
            }}
          >
            <p className="text-gray-700 text-sm break-all flex-1">
              {item.text}
            </p>
            <div className="flex gap-2 ml-2">
              <Dialog
                open={openDialogId === item.id}
                onOpenChange={(open) => {
                  setOpenDialogId(open ? item.id : false);
                  if (open) {
                    setEditingTodo(item.text);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Pencil
                    size={16}
                    className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Todo 수정</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Todo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Todo 내용"
                        className="col-span-3"
                        value={editingTodo}
                        maxLength={300}
                        onChange={(e) => setEditingTodo(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "edit", item.id)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      type="button"
                      onClick={() => handleEditTodo(item.id)}
                    >
                      수정하기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <X
                size={16}
                className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                onClick={() => handleDeleteTodo(item.id)}
              />
            </div>
          </div>
        </div>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
          >
            <Plus className="mr-2 h-4 w-4" /> Todo 추가
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Todo 추가</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Todo
              </Label>
              <Input
                id="name"
                placeholder="새 Todo 이름"
                className="col-span-3"
                maxLength={300}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "add")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handleAddTodo}
            >
              추가하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Todo;
