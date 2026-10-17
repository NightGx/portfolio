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

// --- MODAL DE PRÉVISUALISATION DES PROJETS ---
const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const modalCloseBtn = projectModal ? projectModal.querySelector(".modal-close") : null;

if (projectModal) {
  // Ouvrir le modal lors du clic sur "Voir le projet"
  document.addEventListener("click", (e) => {
    const link = e.target.closest(".btn-project-link");
    if (!link) return;

    e.preventDefault();

    const card = link.closest(".project-card");
    if (!card) return;

    const title = card.querySelector("h3").textContent;
    const desc = link.getAttribute("data-modal-desc") || card.querySelector(".project-desc").textContent;
    const imgSrc = link.getAttribute("href");

    modalTitle.textContent = title;
    modalImg.setAttribute("src", imgSrc);
    modalImg.setAttribute("alt", title);
    modalDesc.textContent = desc;

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Empêcher le défilement de la page en arrière-plan
  });

  // Fermer le modal
  const closeModal = () => {
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  // Fermer en cliquant sur l'arrière-plan
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  // Fermer avec la touche Échap (Escape)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeModal();
    }
  });
}

