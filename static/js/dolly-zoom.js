/* On scrolling, we want frame background to grow out of view while we see more of the img-div background */

document.addEventListener('scroll', function() {
    const frame = document.querySelector('.space-station-frame');
    const spaceram = document.querySelector('#astronaut-ram');
    const ctrl = document.querySelector('#ctrl-panel');
    const pipes = document.querySelector('#pipes');
    const ID = document.querySelector('#id-card');
    const image = document.querySelector('.starry-sky');
    const scrollPosition = window.scrollY;

    const initialRamSize = 50;
    const initialRamY = -90

    const initCtrl = 40; // 40vw height
    const initCtrlX = 0;
    
    const initPipe = 40; // 40vw height
    const initPipeX = 10;

    const initID = 15; // 15vw height
    const initIDX = 20;
    const initIDY = -50;

    const initialFrameSize = 110;
    const initialImageSize = 150;
    const maxStickyScroll = 700;
    const minImageBGSize = 95;
    const maxFrameBGSize = 200;

    // Calculate the new sizes based on scroll position
    const newFrameBGSize = initialFrameSize + (scrollPosition / (maxStickyScroll/(maxFrameBGSize-initialFrameSize))); // 100 is initial size
    const newImageBGSize = initialImageSize - (scrollPosition / (maxStickyScroll/(initialImageSize-minImageBGSize))); // 150 is initial size

    const newRamSize = initialRamSize + (scrollPosition / (maxStickyScroll/(300-initialRamSize))); // 300 final size since we want closer objects to seem to increase in size faster
    const newRamY = initialRamY + (scrollPosition/ (maxStickyScroll/(500-initialRamY)))

    const newCtrl = initCtrl + (scrollPosition / (maxStickyScroll/(100-initCtrl)))
    const newCtrlX = initCtrlX + (scrollPosition/ (maxStickyScroll/(-300-initCtrlX)))

    const newPipe = initPipe + (scrollPosition / (maxStickyScroll/(100-initPipe)))
    const newPipeX = initPipeX + (scrollPosition/ (maxStickyScroll/(400-initPipeX)))

    const newID = initID + (scrollPosition / (maxStickyScroll/(80-initID)))
    const newIDX = initIDX + (scrollPosition/ (maxStickyScroll/(-350-initIDX)))
    const newIDY = initIDY + (scrollPosition/ (maxStickyScroll/(300-initIDY)))

    // Apply the new sizes
    if (scrollPosition <= maxStickyScroll) {
        image.style.backgroundSize = `${newImageBGSize}vw ${newImageBGSize}vh`;
        frame.style.backgroundSize = `${newFrameBGSize+15}vw ${newFrameBGSize}vh`;
        spaceram.style.width = `${newRamSize}vw`;
        spaceram.style.transform = `translate(-50%, ${newRamY}%)`;
        ctrl.style.height = `${newCtrl}vw`; // keep as vw
        ctrl.style.transform = `translate(${newCtrlX}%, -50%)`;
        pipes.style.height = `${newPipe}vw`; // keep as vw
        pipes.style.transform = `translate(${newPipeX}%, -50%)`;
        ID.style.height = `${newID}vw`; // keep as vw
        ID.style.transform = `translate(${newIDX}%, ${newIDY}%)`;
    }
    // To ensure render issues don't happen due to scrolling too fast:
    else {
        frame.style.backgroundSize = `${maxFrameBGSize}vw ${maxFrameBGSize}vh`;
        image.style.backgroundSize = `${minImageBGSize}vw ${minImageBGSize}vh`;
        spaceram.style.width = `300vw`;
        ctrl.style.height = `100vw`; // keep as vw
        ctrl.style.transform = `translate(-300%, -50%)`;
        pipes.style.height = `100vw`; // keep as vw
        pipes.style.transform = `translate(400%, -50%)`;
    }
});
