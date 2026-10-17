const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Verrouillage du bouton pendant l'envoi
  submitBtn.disabled = true;
  formStatus.textContent = "Envoi en cours...";
  formStatus.style.color = "";

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur réseau (${response.status})`);
    }

    formStatus.textContent = "Message envoyé avec succès !";
    formStatus.style.color = "#4ade80"; // Vert
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = "Échec de l'envoi. Réessaie plus tard.";
    formStatus.style.color = "#f87171"; // Rouge
  } finally {
    submitBtn.disabled = false;
  }
});
