import type { TimeFormatType } from "@/util/types";

export const FormatWorkoutDuration = ({
  timeFormat,
  duration,
}: {
  timeFormat: TimeFormatType;
  duration: number | null;
}) => {
  if (
    (duration && timeFormat === "Hours and minutes") ||
    (duration && timeFormat === "default")
  ) {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);

    if (hours === 0) {
      return (
        <p className="">
          <span className="text-lg font-bold">{minutes}</span> min
        </p>
      );
    }

    return (
      <p className="">
        <span className="text-lg font-bold">{hours}</span> h{" "}
        <span className="text-lg font-bold">{minutes}</span> min
      </p>
    );
  }

  return (
    <p className="">
      <span className="text-lg font-bold">{duration}</span> min
    </p>
  );
};

export const FormatDate = ({
  date,
  withDayOfTheWeek,
  className,
}: {
  date: Date | null;
  withDayOfTheWeek?: boolean;
  className: string;
}) => {
  const formatDate = (date: Date, withDayOfTheWeek?: boolean) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (withDayOfTheWeek) {
      const dayOfTheWeek = date
        .toLocaleString("en", { weekday: "short" })
        .split(" ")[0];

      return `${dayOfTheWeek} ${day}-${month}-${year}`;
    }

    return `${day}-${month}-${year}`;
  };

  if (date && withDayOfTheWeek) {
    return <p className={className}>{formatDate(date, withDayOfTheWeek)}</p>;
  } else if (date) {
    return <p className={className}>{formatDate(date)}</p>;
  }

  return <></>;
};
