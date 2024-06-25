// script.js

const slider = document.querySelector('.slider-inner');
const prev = document.querySelector('.slider-nav.prev');
const next = document.querySelector('.slider-nav.next');

// Set initial slide to 1
let currentSlide = 1;

// Total number of slides
const totalSlides = slider.childElementCount;

// Function to go to next slide
const nextSlide = () => {
  // If current slide is not the last slide
  if (currentSlide !== totalSlides) {
    // Increment current slide
    currentSlide++;
    // Update slider position
    slider.style.transform = `translateX(-${(currentSlide - 1) * 100}%)`;
  }
};

// Function to go to previous slide
const prevSlide = () => {
  // If current slide is not the first slide
  if (currentSlide !== 1) {
    // Decrement current slide
    currentSlide--;
    // Update slider position
    slider.style.transform = `translateX(-${(currentSlide - 1) * 100}%)`;
  }
};

// Add event listeners to previous and next buttons
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

// Set interval to automatically go to next slide every 5 seconds
setInterval(nextSlide, 5000);
