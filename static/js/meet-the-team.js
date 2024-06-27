// script.js

//const prev = document.querySelector('.slider-nav.prev');
//const next = document.querySelector('.slider-nav.next');
const sliders = document.querySelectorAll('.slider');
const sliderStates = {};

// Initialize state for each slider
sliders.forEach((sliderContainer, index) => {
  const slider = sliderContainer.querySelector('.slider-inner');
  const slides = sliderContainer.querySelectorAll('.slider-item');
  sliderStates[index] = {
    currentSlide: 0,
    totalSlides: slides.length,
    slider: slider,
    slides: slides
  };
  
  // Event listeners for next and previous buttons
  sliderContainer.querySelector('.next').addEventListener('click', () => nextSlide(index));
  sliderContainer.querySelector('.prev').addEventListener('click', () => prevSlide(index));
  
  // Handle window resize
  window.addEventListener('resize', () => handleResize(index));
});

// Function to get number of visible slides
const getNumberOfVisibleSlides = (slider,slides) => {
  const slideWidth = slides[0].offsetWidth;
  const sliderWidth = slider.offsetWidth;
  return Math.floor(sliderWidth / slideWidth);
};

// Function to go to the next slide
const nextSlide = (index) => {
  const state = sliderStates[index];
  const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);
  
  if (state.currentSlide < state.totalSlides - visibleSlides) {
    state.currentSlide++;
    console.log("moved")
    console.log(state,visibleSlides)
    updateSliderPosition(index);
  }
};

// Function to go to the previous slide
const prevSlide = (index) => {
  const state = sliderStates[index];
  
  if (state.currentSlide > 0) {
    state.currentSlide--;
    console.log("moved back")
    updateSliderPosition(index);
  }
};

// Function to update the slider position
const updateSliderPosition = (index) => {
  const state = sliderStates[index];
  state.slider.style.transform = `translateX(-${(state.currentSlide) * 100 / state.totalSlides}%)`;
};

// Function to handle window resize
const handleResize = (index) => {
  const state = sliderStates[index];
  const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);
  
  if (state.currentSlide >= state.totalSlides - visibleSlides) {
    state.currentSlide = state.totalSlides - visibleSlides;
    updateSliderPosition(index);
  }
};

// Initialize slider positions
sliders.forEach((_, index) => updateSliderPosition(index));

/*
// Function to go to previous slide
const prevSlide = () => {
  // If current slide is not the first slide
  if (currentSlide !== 1) {
    // Decrement current slide
    currentSlide--;
    // Update slider position
    slider.style.transform = `translateX(-${(currentSlide) * 100/totalSlides}%)`;
  }
};

// Add event listeners to previous and next buttons
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

// Set interval to automatically go to next slide every 5 seconds
//setInterval(nextSlide, 5000);

console.log()
*/