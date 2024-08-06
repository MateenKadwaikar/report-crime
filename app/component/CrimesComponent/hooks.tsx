import { ICrime } from "../../model/Type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { convertMillisecondsToDate } from "../common/common";
import { MoreHorizontal, Trash, ReceiptTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertComponent from "../CommonComponent/AlertComponent";
import { useState } from "react";
import { deleteCrime } from "../actions/crime-service";

export function Hooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const onDeleteHandler = (value: number) => {
    if (!value) {
      return;
    }
    setSelectedId(value);
    setIsOpen(true);
  };
  const onCancelHandler = () => {
    setIsOpen(false);
  };
  const onContinueHandler = async () => {
    await deleteCrime(selectedId).then((response) => {
      setIsOpen(false);
      console.log(response);
    });
  };
  const columns: ColumnDef<ICrime>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "createdat",
      header: "Created At",
      cell: ({ row }) => {
        return convertMillisecondsToDate({ date: +row?.original?.createdat });
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const { original } = row || {};
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex justify-evenly items-start w-full">
                    <span>
                      <ReceiptTextIcon size={16} />
                    </span>
                    <span>Details</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant={"destructive"}
                    className="flex justify-evenly items-start w-full"
                    onClick={() => onDeleteHandler(original?.id)}
                  >
                    <span>
                      <Trash size={16} />
                    </span>
                    <span>Delete</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isOpen ? (
              <AlertComponent
                isOpen={isOpen}
                onContinueHandler={onContinueHandler}
                onCancelHandler={onCancelHandler}
              />
            ) : null}
          </>
        );
      },
    },
  ];

  return { columns };
}
