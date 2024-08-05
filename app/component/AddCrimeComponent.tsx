"use client";
import { z } from "zod";
import { postCrime } from "./actions/crime-service";
import AddCrimeFormComponent, { FormSchema } from "./FormComponent";
import { useToast } from "@/components/ui/use-toast";
import { ICrime } from "../model/Type";

export const isNotEmptyObject = (obj: {} | undefined) =>
  (obj != null && Object.keys(obj).length) || false;

export default function AddCrimeComponent() {
  const { toast } = useToast();

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
      }
    );
  };
  return <AddCrimeFormComponent onSubmit={onSubmit} />;
}
