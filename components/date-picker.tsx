import React, { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { dayjs } from "@/lib/dayjs";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  className?: string;
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
}

const DatePicker = ({
  className,
  onSelect,
  date,
  minDate = dayjs().add(1, "day").toDate(),
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-56 justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? dayjs(date).format("L") : <span>Select date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={onSelect}
          selected={date}
          initialFocus
          fromDate={minDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
