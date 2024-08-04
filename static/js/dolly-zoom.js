/* On scrolling, we want frame background to grow out of view while we see more of the img-div background */

document.addEventListener('scroll', function() {
    const frame = document.querySelector('.space-station-frame');
    const image = document.querySelector('.starry-sky');
    const scrollPosition = window.scrollY;
    const initialFrameSize = 110;
    const initialImageSize = 150;
    const maxStickyScroll = 700;
    const minImageBGSize = 95;
    const maxFrameBGSize = 200;

    // Calculate the new sizes based on scroll position
    const newFrameBGSize = initialFrameSize + (scrollPosition / (maxStickyScroll/(maxFrameBGSize-initialFrameSize))); // 100 is initial size
    const newImageBGSize = initialImageSize - (scrollPosition / (maxStickyScroll/(initialImageSize-minImageBGSize))); // 150 is initial size
    
    // Apply the new sizes
    if (scrollPosition <= maxStickyScroll) {
        image.style.backgroundSize = `${newImageBGSize}vw ${newImageBGSize}vh`;
        frame.style.backgroundSize = `${newFrameBGSize+15}vw ${newFrameBGSize}vh`;
    }
    // To ensure render issues don't happen due to scrolling too fast:
    else {
        frame.style.backgroundSize = `${maxFrameBGSize}vw ${maxFrameBGSize}vh`;
        image.style.backgroundSize = `${minImageBGSize}vw ${minImageBGSize}vh`;
    }
});
