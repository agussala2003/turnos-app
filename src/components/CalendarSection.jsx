import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimeSelector from "./TimeSelector";

function CalendarSection({ reservedTurnos, onReserve, tileClassName, businessData }) {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientEmail, setClientEmail] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime(null);
  };

  const handleReserve = () => {
    if (!selectedTime) {
      alert("Por favor, seleccioná un horario.");
      return;
    }
    if (!clientEmail) {
      alert("Por favor, ingresá tu email para confirmar el turno.");
      return;
    }
    const selectedDateTime = new Date(date);
    const [hours, minutes] = selectedTime.split(":");
    selectedDateTime.setHours(hours, minutes, 0, 0);
    onReserve(selectedDateTime, clientEmail);
    setSelectedTime(null);
    setClientEmail("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-lg mb-4">Selecciona una fecha para tu turno:</p>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()}
        tileClassName={tileClassName}
        className="mb-6"
      />
      {date && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <TimeSelector
            date={date}
            reservedTurnos={reservedTurnos}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            businessData={businessData}
          />
          <input
            type="email"
            placeholder="Tu email para la confirmación"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-2 mt-4 border rounded"
          />
        </div>
      )}
      <button
        onClick={handleReserve}
        className="mt-6 w-full max-w-xs mx-auto block bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        Reservar Turno
      </button>
    </div>
  );
}

export default CalendarSection;