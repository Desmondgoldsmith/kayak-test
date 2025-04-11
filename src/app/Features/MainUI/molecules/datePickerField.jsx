import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'iconsax-react';
import { format } from 'date-fns';

const DatePickerField = ({ label, value, onChange, name, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1 mt-4">
      <label className="text-[#3D3D3D]">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal border-gray-300 rounded-md h-10",
              !value && "text-gray-400"
            )}
          >
            {value ? format(new Date(value), "dd/MM/yyyy") : placeholder}
            <CalendarIcon size="18" color="#757575" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : null}
            onSelect={(date) => onChange(name, date ? date.toISOString() : null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;