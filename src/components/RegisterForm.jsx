import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

function RegisterForm({ onRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        role: "client",
        email: user.email,
        createdAt: new Date(),
      });
      onRegister();
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("Error al crear la cuenta. Intentá de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Registrarse (Cliente)
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
        >
          Registrarse
        </button>
        <button
          onClick={onBack}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          Volver a la página principal
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;