/* On scrolling, we want frame background to grow out of view while we see more of the img-div background */

document.addEventListener('scroll', function() {
    const frame = document.querySelector('.space-station-frame');
    const spaceram = document.querySelector('#astronaut-ram');
    const ctrl = document.querySelector('#ctrl-panel');
    const pipes = document.querySelector('#pipes');
    const ID = document.querySelector('#id-card');
    const screen = document.querySelector('#screen');
    const coffee = document.querySelector('#coffee');
    const image = document.querySelector('.starry-sky');
    const ramplanet = document.querySelector('#ram-planet');
    const hacknctext = document.querySelector('#HackNC-text');
    const bannerinfo = document.querySelector('.banner-info')
    const scrollPosition = window.scrollY;

    var initialRamSize; // initialized later
    const initialRamY = -90;

    const initCtrl = 30; // 40vw height
    const initCtrlX = -10;
    
    const initPipe = 40; // 40vw height
    const initPipeX = 10;

    const initID = 15; // 15vw height
    const initIDX = 20;
    const initIDY = -50;

    var initScreen; // initialized later
    const initScreenX = 15;
    const initScreenY = -115;

    var initCoffee; // initialized later
    const initCoffeeX = -170;
    const initCoffeeY  = -150;

    var initPlanet; // initialized later
    var initText; // initialized later

    const initialFrameSize = 110;
    const initialImageSize = 150;
    const maxStickyScroll = 600;
    const minImageBGSize = 95;
    const maxFrameBGSize = 200;

    // make responsive so that at screenwidth: 1350px, the images start out a bit smaller. This adapts animation speed accordingly
    if (window.innerWidth >= 1350) {
        initialRamSize = 40;
        initScreen = 25;
        initCoffee = 7.5;
        initPlanet = 35;
        initText = 35;
    }
    else {
        initialRamSize = 50;
        initScreen = 30; // 30vw height
        initCoffee = 10; // 10vw height 
        initPlanet = 40; // 40vw height
        initText = 40; // 40vw height
    }

    // At 600px and lower, want to keep planet and text at center and no movements. Size updates need to be done regardless so it is done outside in the next if statement
    if (window.innerWidth > 600) {
        const initTextX = 0;
        const initPlanetX = 0;
        const newPlanetX = initPlanetX + (scrollPosition/ (maxStickyScroll/(-15-initPlanetX)))
        const newTextX = initTextX + (scrollPosition/ (maxStickyScroll/(15-initTextX)))
        if (scrollPosition <= maxStickyScroll) {
            ramplanet.style.transform = `translate(${newPlanetX}%, -50%)`;
            hacknctext.style.transform = `translate(${newTextX}%, -70%)`;
        }
        // To ensure render issues don't happen due to scrolling too fast:
        else {
            ramplanet.style.transform = `translate(-15%, -50%)`;
            hacknctext.style.transform = `translate(15%, -70%)`;
        }
    }
        
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

    const newScreen = initScreen + (scrollPosition / (maxStickyScroll/(80-initScreen)))
    const newScreenX = initScreenX + (scrollPosition/ (maxStickyScroll/(240-initScreenX)))
    const newScreenY = initScreenY + (scrollPosition/ (maxStickyScroll/(35-initScreenY)))

    const newCoffee = initCoffee + (scrollPosition / (maxStickyScroll/(60-initCoffee)))
    const newCoffeeX = initCoffeeX + (scrollPosition/ (maxStickyScroll/(1000-initCoffeeX)))
    const newCoffeeY = initCoffeeY + (scrollPosition/ (maxStickyScroll/(700-initCoffeeY)))
    
    const newPlanet = initPlanet + (scrollPosition / (maxStickyScroll/(50-initPlanet)))
    const newText = initText + (scrollPosition / (maxStickyScroll/(45-initText)))
    
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
        screen.style.height = `${newScreen}vw`; // keep as vw
        screen.style.transform = `translate(${newScreenX}%, ${newScreenY}%)`;
        coffee.style.height = `${newCoffee}vw`; // keep as vw
        coffee.style.transform = `translate(${newCoffeeX}%, ${newCoffeeY}%)`;
        ramplanet.style.height = `${newPlanet}vw`; // keep as vw
        hacknctext.style.height = `${newText}vw`; // keep as vw
        bannerinfo.style.opacity = `0`;
        bannerinfo.style.visibility = `hidden`;
    }
    // To ensure render issues don't happen due to scrolling too fast:
    else {
        frame.style.backgroundSize = `${maxFrameBGSize}vw ${maxFrameBGSize}vh`;
        image.style.backgroundSize = `${minImageBGSize}vw ${minImageBGSize}vh`;
        spaceram.style.width = `300vw`;
        spaceram.style.transform = `translate(-50%, 500%)`;
        ctrl.style.height = `100vw`; // keep as vw
        ctrl.style.transform = `translate(-300%, -50%)`;
        pipes.style.height = `100vw`; // keep as vw
        pipes.style.transform = `translate(400%, -50%)`;
        ID.style.height = `80vw`; // keep as vw
        ID.style.transform = `translate(-350%, 300%)`;
        screen.style.height = `80vw`; // keep as vw
        screen.style.transform = `translate(240%, 35%)`;
        coffee.style.height = `60vw`; // keep as vw
        coffee.style.transform = `translate(1000%, 700%)`;
        ramplanet.style.height = `50vw`; // keep as vw
        hacknctext.style.height = `45vw`; // keep as vw
        bannerinfo.style.opacity = 1;
        bannerinfo.style.visibility = 'visible';
    }
});