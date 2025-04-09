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

//   // Apply scroll-triggered animations to each section on the page.
//   document.querySelectorAll("section").forEach((section) => {
//     gsap.from(section, {
//       scrollTrigger: {
//         trigger: section,
//         start: "top 80%"
//       },
//       duration: 1,
//       y: 30,
//       opacity: 0,
//       ease: "power2.out"
//     });
//   });
// });
