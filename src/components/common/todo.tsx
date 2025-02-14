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

  const { boards, addTodo, editTodo, deleteTodo } = useBoardStore();
  const currentBoard = boards.find((board) => board.id === boardId);
  const contents = currentBoard?.contents || [];

  const handelKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    option: "add" | "edit",
    id?: number
  ): void => {
    if (e.key === "Enter" && option === "add") {
      handleAddTodo();
    }
    if (id && e.key === "Enter" && option === "edit") {
      handleEditTodo(id);
    }
  };

  const handleAddTodo = () => {
    if (!todo.trim()) return;
    addTodo(boardId, todo.trim());
    setTodo("");
    setIsOpen(false);
  };

  const handleEditTodo = (todoId: number) => {
    if (!editingTodo.trim()) return;
    editTodo(boardId, todoId, editingTodo.trim());
    setEditingTodo("");
    setOpenDialogId(false);
  };

  return (
    <div>
      {contents.map((item) => (
        <div key={item.id}>
          <div className="flex gap-2 p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors w-52">
            <p className="text-gray-700 text-sm break-all w-40">{item.text}</p>
            <div className="flex gap-2">
              <Pencil
                size={16}
                className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                onClick={() => {
                  setEditingTodo(item.text);
                  setOpenDialogId(item.id);
                }}
              />
              <X
                size={16}
                className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-auto"
                onClick={() => deleteTodo(boardId, item.id)}
              />
            </div>
          </div>

          <Dialog
            open={openDialogId === item.id}
            onOpenChange={(open) => !open && setOpenDialogId(false)}
          >
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
                    onChange={(e) => setEditingTodo(e.target.value)}
                    onKeyDown={(e) => {
                      handelKeyDown(e, "edit", item.id);
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  type="submit"
                  onClick={() => handleEditTodo(item.id)}
                >
                  수정하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                onKeyDown={(e) => handelKeyDown(e, "add")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
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
