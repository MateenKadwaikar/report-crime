"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ICrime, IDropdownLocation, ILocation } from "../model/Type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { getLocations } from "./actions/location-service";
import { cn } from "@/lib/utils";
import { z } from "zod";

export const FormSchema = z.object({
  title: z.string({
    required_error: "This is a required field",
  }),
  location: z.number({
    required_error: "This is a required field",
  }),
  notes: z.string({
    description: "Please type description",
  }),
});
type Props = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  locations: IDropdownLocation[];
};

export default function AddCrimeFormComponent({
  onSubmit,
  locations,
}: Readonly<Props>) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form?.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 py-4">
          <FormField
            control={form?.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full">Location</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? locations?.find(
                              (location) => location?.label === value
                            )?.label
                          : "Select location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search location" />
                        <CommandEmpty>No Location found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {locations?.map((location) => (
                              <CommandItem
                                disabled={false}
                                key={location?.value}
                                value={location?.value.toString()}
                                onSelect={(currentValue) => {
                                  setValue(location?.label);
                                  form.setValue("location", location?.value);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === location?.label
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {location?.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 py-4">
          <FormField
            control={form?.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
