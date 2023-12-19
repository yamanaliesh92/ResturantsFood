import React, { useEffect, useState } from "react";

export default function CountDown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadLine = "may ,22 ,2024";

  const getTime = (deadLine: any) => {
    const time = Date.parse(deadLine) - Date.now();
    setDays(Math.floor(time / (1000 * 24 * 60 * 60)));
    setHours(Math.floor((time / (1000 * 24 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(deadLine), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-[#123b93] font-bold">
      <h1 className="d text-[#ff0000] font-[19px]">the rest time to event:</h1>
      {days} day : {hours} hours / {minutes} minutes / {seconds} second
    </div>
  );
}
