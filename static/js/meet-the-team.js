document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    const sliderStates = {};

    sliders.forEach((sliderContainer, index) => {
        console.log(`Initializing slider ${index}`);
        const slider = sliderContainer.querySelector('.slide-group');
        const slides = sliderContainer.querySelectorAll('.slider-item');
        const nextButton = sliderContainer.querySelector('.slider-nav.next');
        const prevButton = sliderContainer.querySelector('.slider-nav.prev');

        if (!slider) console.error(`Slider inner not found for slider ${index}`);
        if (!nextButton) console.error(`Next button not found for slider ${index}`);
        if (!prevButton) console.error(`Prev button not found for slider ${index}`);

        sliderStates[index] = {
            currentSlide: 0,
            totalSlides: slides.length,
            slider: slider,
            slides: slides
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                /* console.log(`Next clicked for slider ${index}`); */
                nextSlide(index);
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                /* console.log(`Prev clicked for slider ${index}`); */
                prevSlide(index);
            });
        }

        window.addEventListener('resize', () => handleResize(index));
    });

    const getNumberOfVisibleSlides = (slider, slides) => {
        if (slides.length === 0) return 0;
        const slideWidth = slides[0].offsetWidth;
        const sliderWidth = slider.offsetWidth;
        return Math.floor(sliderWidth / slideWidth);
    };

    const nextSlide = (index) => {
        const state = sliderStates[index];
        const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);

        if (state.currentSlide < state.totalSlides - visibleSlides) {
            state.currentSlide++;
            updateSliderPosition(index, visibleSlides);
        }
    };

    const prevSlide = (index) => {
        const state = sliderStates[index];
        const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);

        if (state.currentSlide > 0) {
            state.currentSlide--;
            updateSliderPosition(index, visibleSlides);
        }
    };

    const updateSliderPosition = (index, visibleSlides) => {
        const state = sliderStates[index];
        if (state.slides.length === 0) return;

        const slideWidth = state.slides[0].offsetWidth;
        const sliderWidth = state.slider.offsetWidth;
        console.log((sliderWidth/slideWidth) - visibleSlides)
        if (state.currentSlide == state.totalSlides - visibleSlides){
            const translateX = -(state.totalSlides*slideWidth - sliderWidth);
            /*console.log(`Slider ${index} translateX: ${translateX}px`);*/
            state.slider.style.transform = `translateX(${translateX}px)`;
        }
        else{
            const translateX = -(state.currentSlide * slideWidth);
            /*console.log(`Slider ${index} translateX: ${translateX}px`);*/
            state.slider.style.transform = `translateX(${translateX}px)`;
        }
    };

    const handleResize = (index) => {
        const state = sliderStates[index];
        const visibleSlides = getNumberOfVisibleSlides(state.slider, state.slides);

        if (state.currentSlide >= state.totalSlides - visibleSlides) {
            state.currentSlide = Math.max(0, state.totalSlides - visibleSlides);
        }
        updateSliderPosition(index);
        state.slider.parentElement.style.display = 'block';
    };

    sliders.forEach((_, index) => {
        updateSliderPosition(index);
        handleResize(index);
    });
});






