"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks";
import { format } from "date-fns"
import { Badge } from "@/components/ui"

interface CardItemProps {
  data: Card;
  index: number;
};

export const CardItem = ({
  data,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();
  
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className=" border-2 border-transparent hover:border-black dark:hover:border-neutral-300 dark:bg-neutral-900 py-2 px-3  bg-white rounded-md shadow-sm"
        >
        <div className="truncate text-sm">
          {data.title}
        </div>
          <>
						{data.startDate ? (
							data.endDate ? (
								<Badge variant={'outline'}>
									{format(data.startDate, 'LLL dd, y')} -{' '}
									{format(data.endDate, 'LLL dd, y')}
								</Badge>
							) : (
								<Badge variant="outline">
                  {format(data.startDate, 'LLL dd, y')}
                </Badge>
							)
						) : (
							<></>
						)}
					</>
        </div>
      )}
    </Draggable>
  );
};