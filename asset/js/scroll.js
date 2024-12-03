// Nút "Scroll to Top"
const scrollToTopButton = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    scrollToTopButton.classList.toggle('show', window.scrollY > 100);
});
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
