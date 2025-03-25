import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Clock } from 'lucide-react';

interface iTimePicker{
  onChange: (time:string) => void;
  value: string;
}
const TimePicker = ({onChange,value='00:00'}:iTimePicker) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Generate hours and minutes arrays
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleManualTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove non-numeric characters and limit to 5 characters
    value = value.replace(/[^0-9:]/g, '').slice(0, 5);
    
    // Automatically add : after 2 characters
    if (value.length === 2 && !value.includes(':')) {
      value += ':';
    }
    
    // Validate hours
    const parts = value.split(':');
    let validHour = parts[0] ? 
      Math.min(Math.max(parseInt(parts[0]) || 0, 0), 23)
        .toString()
        .padStart(2, '0') 
      : '';
    
    // Validate minutes
    let validMinute = parts[1] ? 
      Math.min(Math.max(parseInt(parts[1]) || 0, 0), 59)
        .toString()
        .padStart(2, '0')
      : '';
    
    // Combine validated time
    const formattedTime = validHour && validMinute 
      ? `${validHour}:${validMinute}` 
      : value;
    
      onChange(formattedTime);
  };

  const handleTimeSelect = (selectedHour:string, selectedMinute:string) => {
    const newTime = `${selectedHour}:${selectedMinute}`;
    onChange(newTime);
    setIsPopoverOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2 w-[250px]">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input 
              id="time"
              type="text"
              value={value}
              onChange={handleManualTimeChange}
              placeholder="HH:MM"
              className="pl-8"
            />
            <Clock 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" 
              onClick={() => setIsPopoverOpen(true)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <div className="text-center  font-semibold mb-2">Hours</div>
              <div className="h-40 overflow-y-scroll  border rounded">
                {hours.map(hour => (
                  <div 
                    key={hour} 
                    className={`p-2 text-center cursor-pointer hover:bg-gray-100 ${
                      value.startsWith(hour) ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => {
                      const [, minute] = value.split(':');
                      handleTimeSelect(hour, minute);
                    }}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-center font-semibold mb-2">Minutes</div>
              <div className="h-40 overflow-y-auto border rounded">
                {minutes.map(minute => (
                  <div 
                    key={minute} 
                    className={`p-2 text-center cursor-pointer hover:bg-gray-100 ${
                      value.endsWith(minute) ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => {
                      const [hour] = value.split(':');
                      handleTimeSelect(hour, minute);
                    }}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimePicker;