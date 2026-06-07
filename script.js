
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinksWrap = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");

menuBtn.addEventListener("click", () => {
  navLinksWrap.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinksWrap.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(window.scrollY / maxScroll) * 100}%`;
  updateActiveNav();
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let active = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) active = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${active}`));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = Number(el.dataset.target);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 24);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

updateActiveNav();
