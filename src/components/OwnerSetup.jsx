import { useState } from "react";
import { db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

function OwnerSetup({ user, onSetupComplete }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [operatingDays, setOperatingDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const daysOfWeek = [
    "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
  ];

  const handleDayToggle = (day) => {
    setOperatingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!fullName || !phoneNumber || !businessName || operatingDays.length === 0) {
      alert("Por favor, completá todos los campos requeridos.");
      return;
    }
    try {
      const userData = {
        fullName,
        phoneNumber,
        role: "owner",
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      
      const businessData = {
        name: businessName,
        operatingDays,
        startTime,
        endTime,
        ownerId: user.uid,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "businesses", user.uid), businessData);
      
      onSetupComplete(businessData);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Hubo un error al guardar los datos. Intentá de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Configurar tu perfil y local
        </h2>
        
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="tel"
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Nombre del local"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="mb-2">Días de operación:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => handleDayToggle(day)}
              className={`p-2 rounded ${
                operatingDays.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <div>
            <label className="block mb-1">Hora de inicio:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Hora de fin:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Guardar Datos
        </button>
      </div>
    </div>
  );
}

export default OwnerSetup;
