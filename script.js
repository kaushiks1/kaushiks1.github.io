const header = document.getElementById("header");
const progress = document.getElementById("progress");
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("navList");

hamburger?.addEventListener("click", () => navList.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => navList.classList.remove("open")));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
  updateActiveNav();
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
function updateActiveNav(){
  let current = "home";
  sections.forEach(section => {
    if(window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Skills carousel */
const skillsTrack = document.getElementById("skillsTrack");
const skillPrev = document.getElementById("skillPrev");
const skillNext = document.getElementById("skillNext");
const skillDots = document.getElementById("skillDots");
let skillPage = 0;
function skillsPerPage(){ return window.innerWidth < 760 ? 4 : 6; }
function totalSkillPages(){ return Math.ceil(document.querySelectorAll(".skill").length / skillsPerPage()); }
function drawSkillDots(){
  skillDots.innerHTML = "";
  for(let i=0;i<totalSkillPages();i++){
    const dot = document.createElement("span");
    dot.className = i === skillPage ? "active" : "";
    dot.onclick = () => { skillPage = i; updateSkills(); };
    skillDots.appendChild(dot);
  }
}
function updateSkills(){
  const item = document.querySelector(".skill");
  if(!item) return;
  const gap = 13.6;
  skillsTrack.style.transform = `translateX(-${skillPage * skillsPerPage() * (item.offsetWidth + gap)}px)`;
  drawSkillDots();
}
skillNext.onclick = () => { skillPage = (skillPage + 1) % totalSkillPages(); updateSkills(); };
skillPrev.onclick = () => { skillPage = (skillPage - 1 + totalSkillPages()) % totalSkillPages(); updateSkills(); };
setInterval(() => { skillPage = (skillPage + 1) % totalSkillPages(); updateSkills(); }, 3300);

/* Project carousel */
const projectTrack = document.getElementById("projectTrack");
const prevProject = document.getElementById("prevProject");
const nextProject = document.getElementById("nextProject");
const prevSide = document.getElementById("prevSide");
const nextSide = document.getElementById("nextSide");
const projectDots = document.getElementById("projectDots");
let projectPage = 0;
function visibleCards(){
  if(window.innerWidth < 760) return 1;
  if(window.innerWidth < 1100) return 3;
  return 7;
}
function totalProjectPages(){ return Math.ceil(document.querySelectorAll(".project-card").length / visibleCards()); }
function drawProjectDots(){
  projectDots.innerHTML = "";
  for(let i=0;i<totalProjectPages();i++){
    const dot = document.createElement("span");
    dot.className = i === projectPage ? "active" : "";
    dot.onclick = () => { projectPage = i; updateProjects(); };
    projectDots.appendChild(dot);
  }
}
function updateProjects(){
  const card = document.querySelector(".project-card");
  if(!card) return;
  projectTrack.style.transform = `translateX(-${projectPage * visibleCards() * (card.offsetWidth + 16)}px)`;
  drawProjectDots();
}
function goNext(){ projectPage = (projectPage + 1) % totalProjectPages(); updateProjects(); }
function goPrev(){ projectPage = (projectPage - 1 + totalProjectPages()) % totalProjectPages(); updateProjects(); }
nextProject.onclick = goNext; nextSide.onclick = goNext; prevProject.onclick = goPrev; prevSide.onclick = goPrev;
setInterval(goNext, 5400);

window.addEventListener("resize", () => {
  skillPage = 0;
  projectPage = 0;
  updateSkills();
  updateProjects();
});
updateActiveNav();
updateSkills();
updateProjects();
