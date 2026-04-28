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
