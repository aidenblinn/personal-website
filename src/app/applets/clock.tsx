import { useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>(getTime(true));

  function getTime(isFirstCall = false) {
    const dateObject = new Date();

    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();

    const timeString =
      /* Hour */ (hour % 12 === 0 ? "12" : (hour % 12).toString()) +
      /* Colon */ ":" +
      /* Minute */ (minute < 10 ? "0" + minute.toString() : minute.toString()) +
      /* AM/PM */ (hour > 11 ? "PM" : "AM");

    if (isFirstCall) {
      const seconds = dateObject.getSeconds();
      setTimeout(() => setTime(getTime()), (60 - seconds) * 1000);
    } else {
      setTimeout(() => setTime(getTime()), 60000);
    }
    return timeString;
  }

  return <p className="text-white">{time}</p>;
}
