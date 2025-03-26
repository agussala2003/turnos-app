function TimeSelector({ date, reservedTurnos, selectedTime, onTimeSelect, businessData }) {
  const generateTimeSlots = (start, end) => {
    const times = [];
    let [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    while (
      startHour < endHour ||
      (startHour === endHour && startMinute <= endMinute)
    ) {
      times.push(`${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`);
      startMinute += 30;
      if (startMinute >= 60) {
        startMinute = 0;
        startHour += 1;
      }
    }
    return times;
  };

  const availableTimes = businessData
    ? generateTimeSlots(businessData.startTime, businessData.endTime)
    : [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
      ];

  const getAvailableTimes = () => {
    return availableTimes.filter((time) => {
      const dateTime = new Date(date);
      const [hours, minutes] = time.split(":");
      dateTime.setHours(hours, minutes, 0, 0);
      return !reservedTurnos.some(
        (turno) =>
          turno.fecha.toDateString() === dateTime.toDateString() &&
          turno.fecha.getHours() === dateTime.getHours() &&
          turno.fecha.getMinutes() === dateTime.getMinutes()
      );
    });
  };

  return (
    <>
      <p className="text-lg mb-2">Horarios disponibles para {date.toLocaleDateString()}:</p>
      <div className="flex flex-wrap gap-2">
        {getAvailableTimes().map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`p-2 rounded ${
              selectedTime === time
                ? "bg-green-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </>
  );
}

export default TimeSelector;