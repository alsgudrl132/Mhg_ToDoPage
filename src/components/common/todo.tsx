import { Pencil, X } from "lucide-react";
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
import { Button } from "../ui/button";
import { useState } from "react";
import { BoardType, DescriptionType } from "@/types/board";

interface OwnProps {
  id: number;
}

function Todo({ id }: OwnProps) {
  const [newDescription, setNewDescription] = useState<string>("");
  const [isOpenTodoDialog, setIsOpenTodoDialog] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  const getStorageData = () => {
    return JSON.parse(localStorage.getItem("boards") || "[]");
  };

  const getIdx = (storageData: BoardType[]) => {
    return storageData.findIndex((board: BoardType) => board.id === id);
  };

  const getTodos = () => {
    const storageData = getStorageData();
    const currentBoard = storageData.find(
      (board: BoardType) => board.id === id
    );
    return currentBoard?.description || [];
  };

  const editDescription = (todo: { id: number; text: string }) => {
    setIsOpenTodoDialog(true);
    setNewDescription(todo.text);
    setSelectedTodoId(todo.id);
  };

  const updateDescription = (e: object) => {
    if (newDescription === "") return;
    if (e && "key" in e && e.key !== "Enter") return;

    const storageData = getStorageData();
    const boardIdx = getIdx(storageData);
    if (!storageData[boardIdx].description) {
      storageData[boardIdx].description = [];
    }
    const todoIdx = storageData[boardIdx].description!.findIndex(
      (desc: DescriptionType) => desc.id === selectedTodoId
    );

    storageData[boardIdx].description[todoIdx].text = newDescription;
    localStorage.setItem("boards", JSON.stringify(storageData));
    setIsOpenTodoDialog(false);
  };

  return (
    <div>
      {getTodos().map((todo: DescriptionType) => (
        <div
          key={todo.id}
          className="flex gap-2 p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors w-52"
        >
          <p className="text-gray-700 text-sm break-all w-40">{todo.text}</p>
          <div className="flex gap-2">
            <Pencil
              size={16}
              className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
              onClick={() => editDescription(todo)}
            />
            <X
              size={16}
              className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-auto"
            />
          </div>
        </div>
      ))}
      <Dialog open={isOpenTodoDialog} onOpenChange={setIsOpenTodoDialog}>
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
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={(e) => updateDescription(e)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
              onClick={updateDescription}
            >
              수정하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Todo;
