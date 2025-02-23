import { useEffect, useRef, useState } from "react";
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDateStore } from "../store/useDateStore";

const Calendar = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  const startDayIndex = firstDayOfMonth.getDay();
  const daysInMonth = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => i + 1
  );

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
      1
    );
    setSelectedDate(newDate);
    setOpen(false);
  };

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 border font-semibold rounded-lg bg-white shadow-md hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 text-primary" />
        {selectedDate ? selectedDate.toDateString() : "Select Date"}
      </button>

      <div
        ref={calendarRef}
        className={`absolute right-0 mt-2 max-w-96 w-80 h-[310px] p-4 bg-white shadow-lg rounded-lg border ${
          open
            ? "z-50 opacity-100 animate-fadeIn"
            : "-z-50 opacity-0 animate-fadeOut"
        } [animation-fill-mode:backwards]`}
      >
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="w-4 h-4 text-white bg-primary p-1.5 rounded-md"
              />
            </button>
            <button onClick={nextMonth}>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-white bg-primary p-1.5 rounded-md"
              />
            </button>
          </div>
        </div>
        <span className="absolute left-0 top-[54px] min-w-full h-[1px] bg-gray-300"></span>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-700">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={"weekday" + day + index} className="text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 mt-2 text-center">
          {/* Empty spots before first day */}
          {Array.from({ length: startDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="text-gray-400"></div>
          ))}

          {/* Render days */}
          {daysInMonth.map((day) => (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`px-2 py-1 rounded-md transition ${
                selectedDate?.toDateString() ===
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                ).toDateString()
                  ? "bg-primary text-white font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
