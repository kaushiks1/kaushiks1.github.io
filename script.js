const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

const carouselState = { skills: 0, projects: 0 };
const carouselMap = { skills: '#skillsCarousel .track', projects: '#projectsCarousel .track' };
function moveCarousel(name, direction) {
  const track = document.querySelector(carouselMap[name]);
  if (!track) return;
  const viewport = track.parentElement;
  const first = track.children[0];
  if (!first) return;
  const gap = 18;
  const step = first.getBoundingClientRect().width + gap;
  const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
  carouselState[name] = Math.min(max, Math.max(0, carouselState[name] + (direction === 'right' ? step : -step)));
  track.style.transform = `translateX(-${carouselState[name]}px)`;
}
document.querySelectorAll('[data-carousel]').forEach(btn => {
  btn.addEventListener('click', () => moveCarousel(btn.dataset.carousel, btn.dataset.direction));
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
});
