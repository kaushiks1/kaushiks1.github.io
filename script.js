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
function updateActiveNav(){
  let current = 'home';
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 140) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

const chatbotButton = document.querySelector('.chatbot-button');
const chatbot = document.querySelector('.chatbot');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotForm = document.querySelector('.chatbot-form');
const chatbotInput = document.querySelector('.chatbot-input');
const chatbotMessages = document.querySelector('.chatbot-messages');

const profileAnswers = [
  { keys:['experience','years'], text:'Kaushik has 5+ years of experience across Retail, Ecommerce, Marketing Analytics and Data Science.' },
  { keys:['skills','tools','stack'], text:'Core stack includes GA4, Adobe Analytics, Adobe CJA, GTM, Tealium, Firebase, SQL, Python, DBT, BigQuery, Snowflake, GCP, Tableau, Power BI, Looker and AI/ML.' },
  { keys:['projects','project'], text:'Featured projects include Customer Segmentation, Marketing Mix Modelling, Product Recommendation Engine, Propensity Model, GA4 Funnel Analysis, A/B Testing Framework, CLV Prediction and Marketing Attribution.' },
  { keys:['contact','email','phone','linkedin'], text:'You can contact Kaushik at kaushiksreddy1@gmail.com, LinkedIn: linkedin/kaushik-somashekar, or phone: +447436876417.' },
  { keys:['education','university','degree'], text:'Education: MSc Data Science from the University of the West of England.' },
  { keys:['impact','revenue','business'], text:'Business impact includes £10M+ revenue impact, 20+ dashboards built, 50+ tracking implementations, 15% campaign uplift and 12% marketing ROI improvement.' }
];
function addMessage(text, type){
  if(!chatbotMessages) return;
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
if(chatbotButton && chatbot){ chatbotButton.addEventListener('click', () => chatbot.classList.toggle('open')); }
if(chatbotClose && chatbot){ chatbotClose.addEventListener('click', () => chatbot.classList.remove('open')); }
if(chatbotForm && chatbotInput){
  chatbotForm.addEventListener('submit', e => {
    e.preventDefault();
    const question = chatbotInput.value.trim();
    if(!question) return;
    addMessage(question, 'user');
    chatbotInput.value = '';
    const q = question.toLowerCase();
    const answer = profileAnswers.find(item => item.keys.some(k => q.includes(k)));
    addMessage(answer ? answer.text : 'I can answer questions about Kaushik’s experience, skills, projects, education, impact and contact details.', 'bot');
  });
}
