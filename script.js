const topbar = document.getElementById("topbar");
const progress = document.getElementById("pageProgress");
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

mobileToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
  updateActiveNav();
});

const sections = document.querySelectorAll("section[id], main[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav(){
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

/* Reveal */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Skills carousel */
const skillTrack = document.getElementById("skillTrack");
const skillPrev = document.getElementById("skillPrev");
const skillNext = document.getElementById("skillNext");
const skillDots = document.getElementById("skillDots");
let skillPage = 0;

function skillsPerPage(){ return window.innerWidth < 760 ? 4 : 6; }
function skillPages(){ return Math.ceil(document.querySelectorAll(".skill-item").length / skillsPerPage()); }

function drawSkillDots(){
  skillDots.innerHTML = "";
  for(let i=0;i<skillPages();i++){
    const dot = document.createElement("span");
    dot.className = i === skillPage ? "active" : "";
    dot.onclick = () => { skillPage = i; updateSkills(); };
    skillDots.appendChild(dot);
  }
}
function updateSkills(){
  const item = document.querySelector(".skill-item");
  if(!item) return;
  const gap = 13.6;
  const shift = skillPage * skillsPerPage() * (item.offsetWidth + gap);
  skillTrack.style.transform = `translateX(-${shift}px)`;
  drawSkillDots();
}
skillNext.onclick = () => { skillPage = (skillPage + 1) % skillPages(); updateSkills(); };
skillPrev.onclick = () => { skillPage = (skillPage - 1 + skillPages()) % skillPages(); updateSkills(); };
setInterval(() => { skillPage = (skillPage + 1) % skillPages(); updateSkills(); }, 3300);

/* Project carousel */
const projectTrack = document.getElementById("projectTrack");
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const projectPrevSide = document.getElementById("projectPrevSide");
const projectNextSide = document.getElementById("projectNextSide");
const projectDots = document.getElementById("projectDots");
let projectPage = 0;

function cardsVisible(){
  if(window.innerWidth < 760) return 1;
  if(window.innerWidth < 1100) return 3;
  return 7;
}
function projectPages(){
  return Math.ceil(document.querySelectorAll(".project-card").length / cardsVisible());
}
function drawProjectDots(){
  projectDots.innerHTML = "";
  for(let i=0;i<projectPages();i++){
    const dot = document.createElement("span");
    dot.className = i === projectPage ? "active" : "";
    dot.onclick = () => { projectPage = i; updateProjects(); };
    projectDots.appendChild(dot);
  }
}
function updateProjects(){
  const card = document.querySelector(".project-card");
  if(!card) return;
  const shift = projectPage * cardsVisible() * (card.offsetWidth + 16);
  projectTrack.style.transform = `translateX(-${shift}px)`;
  drawProjectDots();
}
function nextProject(){ projectPage = (projectPage + 1) % projectPages(); updateProjects(); }
function prevProject(){ projectPage = (projectPage - 1 + projectPages()) % projectPages(); updateProjects(); }
projectNext.onclick = nextProject;
projectNextSide.onclick = nextProject;
projectPrev.onclick = prevProject;
projectPrevSide.onclick = prevProject;
setInterval(nextProject, 5400);

window.addEventListener("resize", () => {
  skillPage = 0;
  projectPage = 0;
  updateSkills();
  updateProjects();
});

updateActiveNav();
updateSkills();
updateProjects();
