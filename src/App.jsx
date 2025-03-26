import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { db, auth } from "./utils/firebase";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import LoginForm from "./components/LoginForm";
import OwnerPanel from "./components/OwnerPanel";
import OwnerSetup from "./components/OwnerSetup";
import LandingPage from "./components/LandingPage";

function App() {
  const [reservedTurnos, setReservedTurnos] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (!userDoc.exists()) {
            console.log("Usuario no encontrado en Firestore, debe cargar informacion por ser su primer inicio de sesion.");
            navigate("/owner/setup");
            return;
          }
  
          const userData = userDoc.data();
          setUserData(userData);

          if (userData) {
            const businessDocRef = doc(db, "businesses", currentUser.uid);
            const businessDoc = await getDoc(businessDocRef);
            const businessData = businessDoc.data();
            setBusinessData(businessData);
            navigate("/owner");
          }
        } catch (error) {
          console.error("Error al cargar datos de usuario:", error);
        }
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [navigate]);
  
  useEffect(() => {
    const fetchReservedTurnos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "turnos"));
        const turnos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          fecha: new Date(doc.data().fecha),
        }));
        setReservedTurnos(turnos);
      } catch (error) {
        console.error("Error al cargar turnos:", error);
      }
    };
    fetchReservedTurnos();
  }, []);

  const handleCancel = async (turnoId, turnoFecha) => {
    try {
      await deleteDoc(doc(db, "turnos", turnoId));
      setReservedTurnos(reservedTurnos.filter((t) => t.id !== turnoId));
      alert(`Turno del ${turnoFecha.toLocaleString()} cancelado con éxito.`);
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      alert("Hubo un error al cancelar el turno.");
    }
  };

  const handleLogin = () => {
    navigate("/owner");
  };

  const handleSetupComplete = (businessData) => {
    setBusinessData(businessData);
    navigate("/owner");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage onClientClick={() => navigate("/client")} onOwnerClick={() => navigate("/owner/login")} />} />
      <Route path="/owner/login" element={<LoginForm onLogin={handleLogin} isOwner={true} onBack={() => navigate("/")} />} />
      <Route path="/owner/setup" element={<OwnerSetup user={user} userData={userData} onSetupComplete={handleSetupComplete} />} />
      <Route path="/owner" element={<OwnerPanel user={user} reservedTurnos={reservedTurnos} businessData={businessData} userData={userData} onCancel={handleCancel} />} />
    </Routes>
  );
}

export default App;