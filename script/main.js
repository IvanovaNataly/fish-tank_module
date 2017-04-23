// Fish-tank project by Ivanova Natalia
// version 3:  ES6, inheritance, Fish, GoldFish and Catfish constructors, aquafun module, ui script is separated

var aquafun = ( function () {
    let $container = document.querySelector(".container");
    let pictureGold = "img/babelfish.png";
    let pictureCat = "img/catfish.png";
    let goldMax = 3;
    let catMax = 7;

    let tankWidth = parseInt(window.getComputedStyle(document.querySelector(".container")).width, 10);
    let tankHeight = parseInt(window.getComputedStyle(document.querySelector(".container")).height, 10);

    let fishArr = [];
    let catfishArr = [];

    let $modal = document.querySelector(".modal-background");
    let styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    let styleSheet = styleEl.sheet;
    styleSheet.insertRule('.container:after {opacity:0.05;}', 0);
    let opacity = parseFloat(window.getComputedStyle(document.querySelector('.container'), ':after').getPropertyValue('opacity')); 

    let onDirtCallback;

    function addFishFunc (event) {
        var fishType = event.currentTarget.className;
        try {
            checkFishType(fishType);
        } catch (e) {
            displayModal(e.message);
        }
    }

    function checkFishType (fishType) {
        if (fishType.includes('add-btn')) {
            fishType = pictureGold;
            addFish(fishType);
        } else {
            fishType = pictureCat;
            addCatfish(fishType);
        }
    }

    function addFish (fishType) {
        if (fishArr.length % 3 == 0 && fishArr.length/catfishArr.length > 3 && fishArr.length) {
           throw new Error("There are too many Goldfish in the tank. Please, add a Catfish.");
        } else {
            var fish = new GoldFish(fishType, $container, tankWidth, tankHeight);  
            fishArr.push(fish);
        }
    }

    function addCatfish (fishType) {
        var count = catfishArr.length / fishArr.length;
        if (count >= catMax) {
            throw new Error("There are too many Catfish in the tank. Please, add a Goldfish.");
        } else {
            var catfish = new Catfish(fishType, $container, tankWidth, tankHeight);    
            catfishArr.push(catfish);
        }
    }

    function displayModal (e) {
        let $error = document.querySelector(".error-msg");
        $modal.style.display = "block";
        $error.textContent = e;
    }

    function closeModal () {
        $modal.style.display = "";
    }

    function feed () {
        let deadArr = [];
        let deadCatfishArr = [];

        for (let i = fishArr.length-1; i >= 0; i--) {
            if (i >= (fishArr.length-goldMax)) {
                fishArr[i].eat();
                dirt();
            } else {
                deadArr.push(fishArr[i]);
                fishArr[i].die();
            }
        }
        fishArr.splice(0, deadArr.length);

        for (let i = catfishArr.length-1; i >= 0; i--) {
            if (opacity >  0.05) {
                catfishArr[i].eat();
                clearing();
            } else {
                deadCatfishArr.push(catfishArr[i]);
                catfishArr[i].die();
            }
        }
        catfishArr.splice(0, deadCatfishArr.length);
    }

    function onDirt(callback){
        onDirtCallback = callback;
    }

    function dirt () {
        if (opacity >= 0.1) {
            displayModal("Your tank is too dirty. All fish are dead. The game is over.");
            while ($container.firstChild) {
                $container.removeChild($container.firstChild);
            }
            fishArr = [];
            catfishArr = [];
            onDirtCallback();
        } else {
            opacity = Math.round((opacity + 0.01)*100)/100; 
            styleSheet.cssRules[0].style.opacity = opacity;   
        }
    }

    function clearing () {
        opacity = Math.round((opacity - 0.01)*100)/100; 
        styleSheet.cssRules[0].style.opacity = opacity;
    }

    function start() {
        addFish();
    }
      
    return {
        start: start,
        addFishFunc: addFishFunc,
        feed: feed,
        dirt: dirt,
        clearing: clearing,
        closeModal: closeModal,
        onDirt: onDirt
    };
})();



//aquafun.start();