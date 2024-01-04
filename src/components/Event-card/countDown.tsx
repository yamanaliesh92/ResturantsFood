import React, { useEffect, useState } from "react";
import { IResponseEvent } from "../../redux/api/event.api";

interface IProps {
  data: IResponseEvent;
}

export default function CountDown({ data }: IProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = (deadLine: any) => {
    const time = Date.parse(deadLine) - Date.now();
    setDays(Math.floor(time / (1000 * 24 * 60 * 60)));
    setHours(Math.floor((time / (1000 * 24 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(data.date), 1000);
    return () => clearInterval(interval);
  }, [data.date]);

  return (
    <div className="flex items-center text-[#333] dark:text-white font-bold">
      <h1 className="text-[#333] dark:text-white font-[19px]">
        the rest time to event:
      </h1>
      <h4 className="font-bold  sm:text-[10px] ml-1 text-red-500">
        {(hours === 0 && minutes === 0 && days === 0 && seconds === 0) ||
        (hours < 0 && minutes < 0 && days < 0 && seconds < 0) ? (
          <>
            <h1 className="text-[18px]">{data.name} event is over </h1>
          </>
        ) : (
          <>
            {days} day : {hours} hours / {minutes} minutes / {seconds} second
          </>
        )}
      </h4>
    </div>
  );
}
