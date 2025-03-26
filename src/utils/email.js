import emailjs from "@emailjs/browser";

export const sendConfirmationEmail = async (to, dateTime) => {
  const templateParams = {
    to_email: to,
    dateTime: dateTime.toLocaleString(),
  };

  try {
    await emailjs.send(
      "service_ri4bs8e", // Reemplazá con tu Service ID
      "template_3ivm4xt", // Reemplazá con tu Template ID
      templateParams,
      "inR8CgQJms6kwEcME" // Reemplazá con tu Public Key
    );
    console.log("Email enviado a:", to);
  } catch (error) {
    console.error("Error al enviar email:", error);
    throw error;
  }
};