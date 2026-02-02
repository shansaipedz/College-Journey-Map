// Scroll progress bar
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = progress.toFixed(2) + "%";
});

// Reveal-on-scroll animation
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

// Reflection accordion
const accBtn = document.querySelector(".acc-btn");
const panel = document.getElementById("accPanel");

accBtn.addEventListener("click", () => {
  const expanded = accBtn.getAttribute("aria-expanded") === "true";
  accBtn.setAttribute("aria-expanded", String(!expanded));
  if (expanded) {
    panel.hidden = true;
  } else {
    panel.hidden = false;
  }
});

// Download as HTML (exports the current page as a single HTML file)
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
  const html = "<!doctype html>\n" + document.documentElement.outerHTML;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "addu-journey-map.html";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// Activate timeline dots on scroll
const milestones = document.querySelectorAll(".milestone");

const dotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const dot = entry.target.querySelector(".dot");
      if (!dot) return;

      if (entry.isIntersecting) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  },
  { threshold: 0.4 }
);

milestones.forEach(ms => dotObserver.observe(ms));
