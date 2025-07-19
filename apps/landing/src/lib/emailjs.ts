import emailjs from "@emailjs/browser";

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: "service_6jp64c3", // Replace with your EmailJS service ID
  templateId: "contact_form_template", // Replace with your EmailJS template ID
  publicKey: "yXi9kCs4U6nJvFpSu", // Replace with your EmailJS public key
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Send contact form email
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: "GDG COMSATS Team",
      to_email: "gdsc.cuilahore@gmail.com",
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
    );

    return { success: true, response };
  } catch (error) {
    console.error("EmailJS Error:", error);
    return { success: false, error };
  }
};

// Send auto-reply email to user
export const sendAutoReply = async (userEmail: string, userName: string) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: "GDG COMSATS",
      from_email: "gdsc.cuilahore@gmail.com",
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      "auto_reply_template",
      templateParams,
    );

    return { success: true, response };
  } catch (error) {
    console.error("Auto-reply Error:", error);
    return { success: false, error };
  }
};
