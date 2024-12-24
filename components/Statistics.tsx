"use client";

import { getIPAddressRange } from "@/actions/statistics";
import { useEffect, useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { DateValue } from "@internationalized/date";

const Statistics = () => {
  const [startDate, setStartDate] = useState<DateValue | null>(null);
  const [endDate, setEndDate] = useState<DateValue | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      if (startDate && endDate) {
        const { count } = await getIPAddressRange(
          startDate.toString(),
          endDate.toString()
        );
        setCount(count);
      } else if (!startDate && !endDate) {
        const { count } = await getIPAddressRange();
        setCount(count);
      }
    };

    fetchCount();
  }, [startDate, endDate]);

  const handleEntireRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-muted-foreground text-sm sm:text-[16px]">
        Users who entered registration page: {count}
      </h2>
      <div className="flex items-start xs:items-center gap-4 flex-col xs:flex-row ">
        <div className="flex items-center gap-4 w-full xs:w-auto flex-col small:flex-row">
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            className="max-w-[284px]"
            label="Start Date"
          />
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            className="max-w-[284px]"
            label="End Date"
          />
        </div>
        <button
          onClick={handleEntireRange}
          className="px-2 small:w-auto w-full h-14 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs mb-4 xs:mb-0"
        >
          Entire Time Range
        </button>
      </div>
    </div>
  );
};

export default Statistics;
