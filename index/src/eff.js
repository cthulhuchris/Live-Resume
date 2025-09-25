// ------------------------
// Dynamic Footer Email
// ------------------------
function injectContactEmail(selector = "#contact-link") {
  fetch("/index/src/contact.json")
    .then(res => res.json())
    .then(data => {
      const email = data.email;
      const el = document.querySelector(selector);
      if (el) el.innerHTML = `<a href="mailto:${email}">Contact</a>`;
    })
    .catch(err => console.error("Failed to load contact:", err));
}

// ------------------------
// Scroll animations for sections
// ------------------------
function initScrollAnimations() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

// ------------------------
// Initialize all effects after DOM is ready
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  injectContactEmail();
  initScrollAnimations();
});

function adjustSkillBoxes() {
  const boxes = document.querySelectorAll('.skills-box');
  let maxHeight = 0;

  // Reset boxes & text sizes
  boxes.forEach(box => {
    box.style.height = '';
    const text = box.querySelector('.skills-list');
    if (text) text.style.fontSize = '';
  });

  // Find tallest box
  boxes.forEach(box => {
    if (box.offsetHeight > maxHeight) maxHeight = box.offsetHeight;
  });

  // Set all boxes to tallest height
  boxes.forEach(box => box.style.height = maxHeight + 'px');

  // Shrink text to fit (without growing)
  boxes.forEach(box => {
    const text = box.querySelector('.skills-list');
    if (!text) return;

    let fontSize = parseFloat(window.getComputedStyle(text).fontSize);
    const maxFontSize = 18; // Set max font size in pixels
    fontSize = Math.min(fontSize, maxFontSize); 
    text.style.fontSize = fontSize + 'px';

    // Shrink until it fits
    while ((text.scrollHeight > box.clientHeight || text.scrollWidth > box.clientWidth) && fontSize > 6) {
      fontSize -= 1;
      text.style.fontSize = fontSize + 'px';
    }
  });
}
document.addEventListener("DOMContentLoaded", () => injectContactEmail());
window.addEventListener('load', adjustSkillBoxes);
window.addEventListener('resize', adjustSkillBoxes);
