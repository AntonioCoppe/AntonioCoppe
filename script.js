document.addEventListener("DOMContentLoaded", () => {
  // Hide any undesired contact popup if present (assumes the element has a class of "contact-popup").
  const contactPopup = document.querySelector('.contact-popup');
  if (contactPopup) {
    contactPopup.style.display = 'none';
  }

  // Animate hero content on page load using GSAP.
  gsap.from(".hero-content", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power2.out"
  });
});