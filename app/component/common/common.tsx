import { format } from "date-fns";

export const convertMillisecondsToDate = ({
  date,
  formatStr = "dd-MM-yyyy HH:mm",
}: {
  date: number;
  formatStr?: string;
}) => {
  if (!date) {
    return null;
  }
  return format(new Date(date), formatStr);
};

export const isNotEmptyObject = (obj: {} | undefined) =>
  (obj != null && Object.keys(obj).length) || false;