document.querySelectorAll('.project-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const nextButton = carousel.querySelector('.carousel-btn.next');
  const prevButton = carousel.querySelector('.carousel-btn.prev');

  let currentIndex = 0;

  function updateCarousel() {
    if (slides.length === 0) return;

    // Самое точное: берём offsetWidth именно текущего слайда
    const slideWidth = slides[currentIndex].offsetWidth;  // без gap/margin
    const offset = -slideWidth * currentIndex;

    track.style.transform = `translateX(${offset}px)`;
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    updateCarousel();
    updateButtons();
  }

  function updateButtons() {
    prevButton.style.opacity = currentIndex === 0 ? '0.4' : '1';
    nextButton.style.opacity = currentIndex === slides.length - 1 ? '0.4' : '1';
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  });

  // Важно при любом изменении размера окна/ориентации
  window.addEventListener('resize', updateCarousel);

  // первый запуск
  updateButtons();
  updateCarousel();
});