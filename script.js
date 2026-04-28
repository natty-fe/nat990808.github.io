const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'black') {
  document.body.classList.add('light-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'black' : 'green');
  });
}
