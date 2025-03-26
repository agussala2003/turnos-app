import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

function LoginForm({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Intentando iniciar sesión con:", { email, password });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", userCredential.user);
      onLogin();
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.code, error.message);
      alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Iniciar Sesión (Dueño)
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
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Iniciar Sesión
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

export default LoginForm;