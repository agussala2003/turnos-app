import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function OwnerPanel({ user, reservedTurnos, onCancel, businessData, userData, onUpdateBusiness }) {
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(userData?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  const handleEditUser = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), { fullName, phoneNumber }, { merge: true });
      setEditing(false);
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Hubo un error al editar el usuario. Intentá de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      {/* Contenedor principal */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 md:text-3xl">
          Panel del Dueño
        </h2>

        {/* Sección de información del usuario */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 md:text-xl">
            Información Personal
          </h3>
          {editing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Nombre completo"
                disabled={loading}
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Teléfono"
                disabled={loading}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition duration-300"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditUser}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    "Guardar"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-base text-gray-700 md:text-lg">
                <span className="font-medium">Nombre:</span> {userData?.fullName || "No definido"}
              </p>
              <p className="text-base text-gray-700 md:text-lg">
                <span className="font-medium">Teléfono:</span> {userData?.phoneNumber || "No definido"}
              </p>
              <p className="text-base text-gray-700 md:text-lg">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 md:w-auto"
              >
                Editar Información
              </button>
            </div>
          )}
        </div>

        {/* Sección de negocio (placeholder para futuros cambios) */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 md:text-xl">
            Tu Negocio
          </h3>
          <p className="text-base text-gray-700 md:text-lg">
            <span className="font-medium">Nombre:</span> {businessData?.name || "No configurado"}
          </p>
          <p className="text-base text-gray-700 md:text-lg">
            <span className="font-medium">Días:</span>{" "}
            {businessData?.operatingDays?.join(", ") || "No definidos"}
          </p>
          <p className="text-base text-gray-700 md:text-lg">
            <span className="font-medium">Horario:</span>{" "}
            {businessData?.startTime && businessData?.endTime
              ? `${businessData.startTime} - ${businessData.endTime}`
              : "No definido"}
          </p>
        </div>

        {/* Sección de turnos (placeholder) */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 md:text-xl">
            Turnos Reservados
          </h3>
          <p className="text-sm text-gray-600">
            Próximamente: listado de turnos con opción de cancelar y analizar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OwnerPanel;