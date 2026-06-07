const nav = document.querySelector('.nav');
document.querySelector('.mobile-toggle').addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function createCarousel(id, cardSelector) {
  const carousel = document.getElementById(id);
  if (!carousel) return null;
  const track = carousel.querySelector('.track');
  let index = 0;
  function getStep() {
    const card = track.querySelector(cardSelector);
    return card ? card.getBoundingClientRect().width + 16 : 260;
  }
  function maxIndex() {
    const step = getStep();
    return Math.max(0, Math.ceil((track.scrollWidth - carousel.clientWidth) / step));
  }
  function update() {
    index = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(${-index * getStep()}px)`;
  }
  window.addEventListener('resize', update);
  return { next(){ index += 1; update(); }, prev(){ index -= 1; update(); } };
}
const skills = createCarousel('skillsCarousel', '.skill-card');
const projects = createCarousel('projectsCarousel', '.project-card');

document.querySelectorAll('[data-carousel]').forEach(btn => {
  btn.addEventListener('click', () => {
    const carousel = btn.dataset.carousel === 'skills' ? skills : projects;
    if (!carousel) return;
    btn.dataset.direction === 'left' ? carousel.prev() : carousel.next();
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav a')];
window.addEventListener('scroll', () => {
  const current = sections.findLast(sec => window.scrollY >= sec.offsetTop - 140);
  if (!current) return;
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
});
