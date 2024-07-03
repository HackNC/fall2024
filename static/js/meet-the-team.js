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


const getNumberOfVisibleSlides = (slider, slides) => {
    const slideWidth = slides[0].offsetWidth;
    const sliderWidth = slider.offsetWidth;
    return Math.floor(sliderWidth / slideWidth);
};


const nextSlide = (index) => {
    const state = sliderStates[index];
    const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);

    if (state.currentSlide < state.totalSlides - visibleSlides) {
        state.currentSlide++;
        updateSliderPosition(index);
    }
};


const prevSlide = (index) => {
    const state = sliderStates[index];

    if (state.currentSlide > 0) {
        state.currentSlide--;
        updateSliderPosition(index);
    }
};


const updateSliderPosition = (index) => {
    const state = sliderStates[index];
    const slideWidth = state.slides[0].offsetWidth;
    const translateX = -(state.currentSlide * slideWidth);
    state.slider.style.transform = `translateX(${translateX}px)`;
};


const handleResize = (index) => {
    const state = sliderStates[index];
    const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);

    if (state.currentSlide >= state.totalSlides - visibleSlides) {
        state.currentSlide = state.totalSlides - visibleSlides;
    }
    updateSliderPosition(index);

    
    if (visibleSlides < 1) {
        state.slider.parentElement.style.display = 'none';
    } else {
        state.slider.parentElement.style.display = 'block';
    }
};

sliders.forEach((_, index) => {
    updateSliderPosition(index);
    handleResize(index);
});




