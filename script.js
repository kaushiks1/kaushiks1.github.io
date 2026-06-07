
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const progressBar = document.getElementById("progressBar");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / maxScroll) * 100}%`;
  updateActiveLink();
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let active = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) active = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${active}`);
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

updateActiveLink();
