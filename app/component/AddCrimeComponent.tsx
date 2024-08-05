"use client";
import { z } from "zod";
import { postCrime } from "./actions/crime-service";
import AddCrimeFormComponent, { FormSchema } from "./FormComponent";
import { useToast } from "@/components/ui/use-toast";
import { ICrime, IDropdownLocation, ILocation } from "../model/Type";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getLocations } from "./actions/location-service";
import { isNotEmptyObject } from "./common/common";


export default function AddCrimeComponent() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState<IDropdownLocation[]>([]);

  const getLocaton = async () => {
    await getLocations().then((response) => {
      const data: IDropdownLocation[] = response?.map((item: ILocation) => ({
        value: item?.id,
        label: item?.name,
      }));
      setLocations(data);
    });
  };

  useEffect(() => {
    getLocaton();
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await postCrime(data).then(
      (res: { crimeLists: ICrime; message: string }) => {
        if (!isNotEmptyObject(res?.crimeLists)) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: res?.message,
          });
        }
        toast({
          title: res?.message,
        });
        setIsOpen(false);
      }
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={(value: boolean) => setIsOpen(value)}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}> 
          Add Crime
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add Crime</DialogTitle>
        <AddCrimeFormComponent onSubmit={onSubmit} locations={locations}/>
      </DialogContent>
    </Dialog>
  )
}
