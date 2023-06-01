import type { FunctionComponent } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

export type ClockProps = {
  className?: string;
  timezone: string;
};

export const Clock: FunctionComponent<ClockProps> = ({
  className,
  timezone,
}) => {
  const getTime = useCallback(() => {
    const formatter = new Intl.DateTimeFormat([], {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return formatter.formatToParts(new Date());
  }, [timezone]);

  const [timeParts, setTimeParts] = useState(getTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeParts(getTime());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={`aspect-square relative rounded-full ${className}`}>
      <Hand type="hour" time={timeParts} />
      <Hand type="minute" time={timeParts} />
      <Hand time={timeParts} type="second" />
    </div>
  );
};

type HandType = "hour" | "minute" | "second";

type HandProps = {
  type: HandType;
  time: Intl.DateTimeFormatPart[];
};

const handClassNames = {
  hour: "bg-gray-12 h-[60%] w-full",
  minute: "bg-gray-12 h-[90%] w-full",
  second: "bg-accent h-[95%] w-full",
};

const getPart = (
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
) => {
  const part = parts.find((p) => p.type === type);
  if (!part) throw new Error(`Part ${type} not found`);
  return Number(part.value);
};

const rotationDeg: Record<
  HandType,
  (time: Intl.DateTimeFormatPart[]) => number
> = {
  hour: (time) => getPart(time, "hour") * 30 + getPart(time, "minute") * 0.5,
  minute: (time) => getPart(time, "minute") * 6 + getPart(time, "hour") * 360,
  second: (time) =>
    getPart(time, "second") * 6 +
    getPart(time, "minute") * 360 +
    getPart(time, "hour") * 360 * 60,
};

const Hand: FunctionComponent<HandProps> = ({ type, time }) => {
  const transform = `rotate(${rotationDeg[type](time)}deg)`;

  return (
    <div
      className="h-[50%] w-[1px] ease-linear transiton-transform duration-1000 absolute left-1/2 origin-bottom -translate-x-1/2 flex items-end justify-center"
      style={{ transform }}
    >
      <div className={handClassNames[type]} />
    </div>
  );
};
