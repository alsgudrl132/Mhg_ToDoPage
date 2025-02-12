import { Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

function Todo() {
  return (
    <div>
      <div className="flex gap-2 p-3 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition-colors w-52">
        <p className="text-gray-700 text-sm break-all w-40">할일</p>
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
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Todo 수정</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Todo
              </Label>
              <Input id="name" placeholder="Todo 내용" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
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
