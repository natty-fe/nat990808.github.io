const themeToggle = document.querySelector('#themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
}
