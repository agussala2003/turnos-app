function LandingPage({ onClientClick, onOwnerClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col items-center text-white">
      {/* Contenido principal */}
      <div className="flex-grow flex flex-col justify-center items-center px-4 py-8 w-full max-w-md md:max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4 md:text-5xl">
          Plataforma de Turnos
        </h1>
        <p className="text-base text-center mb-6 md:text-xl md:mb-8 max-w-xs md:max-w-2xl">
          Reservá turnos en tus locales favoritos fácil y rápido desde tu celular.
        </p>
        <button
          onClick={onClientClick}
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold text-base md:text-lg md:px-10 md:py-4 hover:bg-gray-100 transition duration-300 shadow-lg w-full md:w-auto cursor-pointer"
        >
          Ver Locales Disponibles
        </button>
      </div>

      {/* Footer con enlace para dueños */}
      <footer className="w-full py-4 px-4 text-center text-sm opacity-75 md:flex md:justify-between md:items-center md:px-6 md:text-base">
        <span className="block mb-2 md:mb-0">© 2025 Plataforma de Turnos</span>
        <button
          onClick={onOwnerClick}
          className="text-white hover:underline transition duration-300"
        >
          Ingresar como Dueño
        </button>
      </footer>
    </div>
  );
}

export default LandingPage;