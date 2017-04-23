class Fish {
    constructor (imageUrl, $container) {
        this.$container = $container;
        this.imageUrl = imageUrl;
        this.$fishImg = this.createFishImg(this.imageUrl);
    }

    createFishImg (imageUrl) {
        let $fishImg = document.createElement("img");
        $fishImg.setAttribute("src", imageUrl);
        $fishImg.className = 'fish';
        $fishImg.style.width = "80px"; 
        $fishImg.style.height = "80px"; 
        this.$container.appendChild($fishImg);
        return $fishImg;
    }

    swim () {
        this.$fishImg.style.top = this.topOffset;
        this.$fishImg.style.right = this.rightOffset; 
       
        setInterval (() => {
            let right = parseInt(this.$fishImg.style.right, 10);

            if (right >= (this.tankWidth-(parseInt(this.$fishImg.style.width,10))) && this.$fishImg.className === 'fish') {
                this.$fishImg.className = 'fish-back';
            } else if (right <= 50 && this.$fishImg.className === 'fish-back') {
                this.$fishImg.className = 'fish';
            } else if (this.$fishImg.className.includes('fish-dead')) {
                return;
            }

            if (this.$fishImg.className === 'fish-back') {
                this.$fishImg.style.right = (right - this.fishSpeed) + "px";
            } else {
                this.$fishImg.style.right = (right + this.fishSpeed) + "px";
            }
        },50) 
    }

    eat () {
        let width = parseInt(this.$fishImg.style.width,10);
        let height = parseInt(this.$fishImg.style.height,10);
        let top = parseInt(this.$fishImg.style.top, 10);
        if (width < 160) {
            this.$fishImg.style.width = (width + 20) + "px";
            this.$fishImg.style.height = (height + 20) + "px";
            this.$fishImg.style.top = (top - this.shiftTop) + "px";
        }
    }

    die () {
        this.$fishImg.classList.add("fish-dead");
        setTimeout(() => { 
            this.$container.removeChild(this.$fishImg); 
        }, 6000);
    }
};

class GoldFish extends Fish {
     constructor (imageUrl, $container, tankWidth, tankHeight) {
        super(imageUrl, $container);
        this.tankWidth = tankWidth;
        this.tankHeight = tankHeight;

        let maxTop = tankHeight - 160 - 5; // tank's height - max fish height - padding;
        this.topOffset = Math.floor(Math.random() * (maxTop - 50 + 1)) + 50 + "px";
        this.rightOffset = "50px";
        let maxSpeed = 20;
        this.fishSpeed = Math.floor(Math.random() * (maxSpeed - 1)) + 1;
        this.shiftTop = 0;

        super.swim();
    }
}

class Catfish extends Fish{
    constructor (imageUrl, $container, tankWidth, tankHeight) {
        super(imageUrl, $container);
        this.tankWidth = tankWidth;
        this.tankHeight = tankHeight;

        let maxTop = tankHeight - 80; // tank's height - max catfish height;
        this.topOffset = maxTop + "px";
        this.rightOffset = Math.floor(Math.random() * ((this.tankWidth - 80 - 10) + 1)) + "px"; // tank's width -  catfish width - padding;
        let maxSpeed = 5;
        this.fishSpeed = Math.floor(Math.random() * (maxSpeed - 1)) + 1;
        this.shiftTop = 12;

        super.swim();
    }

}
