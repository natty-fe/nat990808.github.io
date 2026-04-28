const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'black') {
  document.documentElement.dataset.theme = 'black';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isBlack = document.documentElement.dataset.theme === 'black';

    if (isBlack) {
      document.documentElement.dataset.theme = 'green';
      localStorage.setItem('theme', 'green');
      return;
    }

    document.documentElement.dataset.theme = 'black';
    localStorage.setItem('theme', 'black');
  });
}

const searchItems = [
  {
    title: 'Bio',
    description: 'Software Engineer focused on backend, full stack, and AI.',
    href: 'index.html#bio',
    keywords: 'bio about backend full stack ai software engineer profile'
  },
  {
    title: 'Education',
    description: 'BSc Software Engineering at American College of Technology.',
    href: 'index.html#education',
    keywords: 'education degree bsc software engineering american college technology gpa'
  },
  {
    title: 'Experience',
    description: 'AfroChat and Esklate engineering experience.',
    href: 'about.html',
    keywords: 'experience work afrochat esklate backend engineer full stack intern fastapi docker kubernetes'
  },
  {
    title: 'Projects',
    description: 'GulitApp, AI Recommendation System, and Code Execution Platform.',
    href: 'projects.html',
    keywords: 'projects gulitapp bazar ai recommendation code execution platform marketplace'
  },
  {
    title: 'Skills',
    description: 'C++, Go, Java, JavaScript, Python, SQL, FastAPI, React, Docker, Kubernetes.',
    href: 'index.html#experience',
    keywords: 'skills toolkit languages frameworks tools python javascript java fastapi react docker kubernetes redis postgres'
  },
  {
    title: 'Contact',
    description: 'Email, phone, GitHub, and LinkedIn links.',
    href: 'contact.html',
    keywords: 'contact email phone github linkedin nathanfeyisa6 natty-fe'
  }
];

function createSearchOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="searchTitle">
      <div class="search-head">
        <h2 id="searchTitle">Search</h2>
        <button type="button" class="search-close" aria-label="Close search">&times;</button>
      </div>
      <input class="search-input" type="search" placeholder="Search bio, experience, projects..." autocomplete="off">
      <div class="search-results" role="listbox"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

const searchOverlay = createSearchOverlay();
const searchInput = searchOverlay.querySelector('.search-input');
const searchResults = searchOverlay.querySelector('.search-results');
const searchClose = searchOverlay.querySelector('.search-close');
const searchButtons = [...document.querySelectorAll('.top-actions button[aria-label="Search"]')];

function renderSearchResults(query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? searchItems.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
    : searchItems;

  searchResults.innerHTML = matches.length
    ? matches.map((item) => `
        <a class="search-result" href="${item.href}" role="option">
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </a>
      `).join('')
    : '<p class="search-empty">No results found.</p>';
}

function openSearch() {
  searchOverlay.hidden = false;
  document.body.classList.add('search-open');
  renderSearchResults();
  searchInput.value = '';
  searchInput.focus();
}

function closeSearch() {
  searchOverlay.hidden = true;
  document.body.classList.remove('search-open');
}

searchButtons.forEach((button) => button.addEventListener('click', openSearch));
searchClose.addEventListener('click', closeSearch);
searchInput.addEventListener('input', (event) => renderSearchResults(event.target.value));

searchOverlay.addEventListener('click', (event) => {
  if (event.target === searchOverlay) {
    closeSearch();
  }
});

searchResults.addEventListener('click', (event) => {
  if (event.target.closest('.search-result')) {
    closeSearch();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !searchOverlay.hidden) {
    closeSearch();
  }
});
