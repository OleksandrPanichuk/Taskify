"use client";

import { toast } from "sonner";
import { MoreHorizontal, Trash, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Button
} from "@/components/ui";

interface BoardOptionsProps {
  id: string;
};

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className=" pt-3 pb-3 mx-2" 
        side="bottom" 
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button 
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="  text-red-600   hover:text-red-700  transition-all rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm flex items-center gap-x-2"
        >
         <Trash className="w-5 h-5" /> 
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};