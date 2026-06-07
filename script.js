const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.carousel === 'skills' ? 'skills-track' : 'projects-track';
    const track = document.getElementById(id);
    const dir = btn.dataset.dir === 'left' ? -1 : 1;
    track.scrollBy({ left: dir * Math.min(620, track.clientWidth * .75), behavior: 'smooth' });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});
