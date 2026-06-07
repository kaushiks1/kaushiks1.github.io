const progress = document.getElementById("progress");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
  updateActiveNav();
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let active = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) active = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${active}`);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Skills carousel */
const skillTrack = document.getElementById("skillTrack");
const skillDots = document.getElementById("skillDots");
const skillPrev = document.getElementById("skillPrev");
const skillNext = document.getElementById("skillNext");
let skillPage = 0;

function skillsVisible() {
  return window.innerWidth < 640 ? 3 : 6;
}

function skillPages() {
  return Math.ceil(document.querySelectorAll(".skill-item").length / skillsVisible());
}

function drawSkillDots() {
  skillDots.innerHTML = "";
  for (let i = 0; i < skillPages(); i++) {
    const d = document.createElement("span");
    d.className = i === skillPage ? "active" : "";
    d.onclick = () => {
      skillPage = i;
      updateSkills();
    };
    skillDots.appendChild(d);
  }
}

function updateSkills() {
  const item = document.querySelector(".skill-item");
  if (!item) return;
  skillTrack.style.transform = `translateX(-${skillPage * skillsVisible() * (item.offsetWidth + 16)}px)`;
  drawSkillDots();
}

skillNext.onclick = () => {
  skillPage = (skillPage + 1) % skillPages();
  updateSkills();
};

skillPrev.onclick = () => {
  skillPage = (skillPage - 1 + skillPages()) % skillPages();
  updateSkills();
};

setInterval(() => {
  skillPage = (skillPage + 1) % skillPages();
  updateSkills();
}, 3200);

/* Project carousel */
const projectTrack = document.getElementById("projectTrack");
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const projectDots = document.getElementById("projectDots");
let projectPage = 0;

function projectsVisible() {
  if (window.innerWidth < 700) return 1;
  if (window.innerWidth < 1050) return 2;
  return 4;
}

function projectPages() {
  return Math.ceil(document.querySelectorAll(".project-card").length / projectsVisible());
}

function drawProjectDots() {
  projectDots.innerHTML = "";
  for (let i = 0; i < projectPages(); i++) {
    const d = document.createElement("span");
    d.className = i === projectPage ? "active" : "";
    d.onclick = () => {
      projectPage = i;
      updateProjects();
    };
    projectDots.appendChild(d);
  }
}

function updateProjects() {
  const card = document.querySelector(".project-card");
  if (!card) return;
  projectTrack.style.transform = `translateX(-${projectPage * projectsVisible() * (card.offsetWidth + 16)}px)`;
  drawProjectDots();
}

function nextProject() {
  projectPage = (projectPage + 1) % projectPages();
  updateProjects();
}

function prevProject() {
  projectPage = (projectPage - 1 + projectPages()) % projectPages();
  updateProjects();
}

projectNext.onclick = nextProject;
projectPrev.onclick = prevProject;

setInterval(nextProject, 5200);

window.addEventListener("resize", () => {
  skillPage = 0;
  projectPage = 0;
  updateSkills();
  updateProjects();
});

updateActiveNav();
updateSkills();
updateProjects();
