class Duck {
    // Variables
    #type; // Type of duck, from 0 to 2
    #character; // Character to type when dead
    #position; // Position of duck, as in % from top and left of parent;
    #$wrapper; // DOM element of duck wrapper as JQuery
    #$duck_div; // DOM element of duck as JQuery
    #$sign_div; // DOM element of the sign as JQuery
    #direction; // The angle in radians of the movement
    #state; // 0 if spawning, 1 if alive, 2 if escaping, 3 if dead
    #credentialManager;

    // Settings
    #boundaryX = [0,87]; // Max percentage that the duck can go in the X direction
    #boundaryY= [0,60]; // Max percentage that the duck can go in the Y direction
    #boundaryScreenX = [-15,100]; // Max percentage that the duck can go before being removed
    #boundaryScreenY= [-25,70]; // Max percentage that the duck can go in the Y direction
    #rarity = [0.8, 0.18, 0.02]; // Rarity of each type of duck
    #lifespan = [10*30, 5*30, 3*30]; // Calls before escaping, per rarity
    #delayBeforeFalling = 30; // Delay in tick before falling
    #speed = [2, 3, 5]; // Speed of the duck, expressed as how many % change every frame
    #spawnY = 70; // Height of the spawn zone, as % from top
    #spawnX = [5,80]; // Min and max of spawn width, in %
    #maxChar = 37 // Max number of character

    constructor(parent, credentialManager) {
        this.#credentialManager = credentialManager;
        // Determine type of duck
        let rarity = Math.random();
        if (rarity < this.#rarity[0])
            this.#type=0;
        else if (rarity < this.#rarity[0]+this.#rarity[1])
            this.#type=1;
        else
            this.#type=2;

        // Determine char of duck
        switch (this.#type) {
            case 1:
                this.#character = '36'; // We use 36 for changing between username and password
                break;
            case 2:
                this.#character = '37'; // We use 37 for backspace
                break;
            default:
                this.#character = Math.round(Math.random()*(this.#maxChar-2));
                break;
        }

        // Determine spawn position
        let spawnX=Math.floor(Math.random()*(this.#spawnX[1]-this.#spawnX[0])+this.#spawnX[0]);
        this.#position=[spawnX,this.#spawnY];

        // Create element
        var wrapper = document.createElement('div');
        this.#$wrapper = $(wrapper);
        $(wrapper).addClass('duck-wrapper');
        $(wrapper).css('left', this.#position[0]+"%");
        $(wrapper).css('top', this.#position[1]+"%");

        var sign_div = document.createElement('div');
        this.#$sign_div = $(sign_div);
        $(sign_div).addClass('sign').addClass('tiled');
        $(sign_div).css('background-position-x', this.#character*100/this.#maxChar+'%')

        var duck_div = document.createElement('div');
        this.#$duck_div = $(duck_div);
        $(duck_div).addClass('duck')
                    .addClass('tiled')
                    .addClass('alive')
                    .attr('direction','N');
        switch (this.#type) {
            case 0:
                $(duck_div).addClass('duck-black');
                break;
            case 1:
                $(duck_div).addClass('duck-blue');
                break;
            case 2:
                $(duck_div).addClass('duck-red');
                break;
        }

        $(duck_div).on('click', this.killDuck.bind(this));

        wrapper.appendChild(sign_div);
        wrapper.appendChild(duck_div);
        parent.appendChild(wrapper);

        // Starting settings
        this.#state = 0;
        this.#direction=Math.round(Math.random()*240-30)*Math.PI/180;
    }

    makeAMove() {
        switch (this.#state) {
            case 0:
                // Duck is spawning, it will only go up until leaves spawnzone
                this.moveToPos(this.calculatePosition(Math.PI/2));
                this.checkIfOutOfSpawn();
                return true;
            case 1:
                // Duck is alive, it will move to a valid position
                this.moveToPos(this.calculateValidPosition());
                this.#lifespan[this.#type]--;
                if (this.#lifespan[this.#type]<0)
                    this.#state=2; // Duck is leaving
                return true;
            case 2:
                // Duck is leaving, it will only move north;
                this.moveToPos(this.calculatePosition(Math.PI/2));
                return this.isInScreen();
            case 3:
                // Duck is dead, it will only move south after the delay run out;
                if (this.#delayBeforeFalling==0) {
                    this.moveToPos(this.calculatePosition(Math.PI*1.5));
                    return this.isInScreen();
                }
                else
                    this.#delayBeforeFalling--;
                return true;
        }
    }

    calculatePosition(angle) {
        var newPosition = [];
        newPosition[0] = this.#position[0]+Math.cos(angle)*this.#speed[this.#type];
        newPosition[1] = this.#position[1]-Math.sin(angle)*this.#speed[this.#type];
        return newPosition;
    }

    calculateValidPosition() {
        let position = this.calculatePosition(this.#direction);
        while (!this.isPositionValid(position)) {
            this.#direction=Math.round(Math.random()*240-30)*Math.PI/180;
            position = this.calculatePosition(this.#direction);
        }
        return position;
    }

    isPositionValid(position) {
        if ((position[0]>this.#boundaryX[0]) &&
            (position[0]<this.#boundaryX[1]) &&
            (position[1]>this.#boundaryY[0]) &&
            (position[1]<this.#boundaryY[1]))
            return true;
        return false;
    }

    moveToPos(position) {
        this.#position[0]=position[0];
        this.#position[1]=position[1];
        this.#$wrapper.css('left', this.#position[0]+"%");
        this.#$wrapper.css('top', this.#position[1]+"%");
        this.updateDirectionAttr();
    }

    checkIfOutOfSpawn() {
        if (this.#position[1]<this.#boundaryY[1])
            return this.#state=1;
        return 0;
    }

    updateDirectionAttr() {
        if (Math.sin(this.#direction)<=-Math.sqrt(3)/2)   // -90°, going S
            return this.#$duck_div.attr('direction', 'S');
        if (Math.cos(this.#direction)<=-Math.sqrt(3)/2)   // 220°<direction<150°, going W
            return this.#$duck_div.attr('direction', 'W');
        if (Math.cos(this.#direction)<=-1/2)   // 120°<direction<150°, going NW
            return this.#$duck_div.attr('direction', 'NW');
        if (Math.sin(this.#direction)>=Math.sqrt(3)/2)   // 60°<direction<120°, going north
            return this.#$duck_div.attr('direction', 'N');
        if (Math.cos(this.#direction)<=Math.sqrt(3)/2)   // 30°<direction<60°, going NE
            return this.#$duck_div.attr('direction', 'NE');
        return this.#$duck_div.attr('direction', 'E'); // -30°<direction<30°, going E
    }

    isInScreen() {
        if ((this.#position[0]>this.#boundaryScreenX[0]) &&
            (this.#position[0]<this.#boundaryScreenX[1]) &&
            (this.#position[1]>this.#boundaryScreenY[0]) &&
            (this.#position[1]<this.#boundaryScreenY[1]))
            return true;
        this.removeDOM();
        return false;
    }

    removeDOM() {
        this.#$wrapper.remove();
    }

    killDuck() {
        this.#$duck_div.removeClass('alive')
                        .addClass('dead');
        this.#state = 3;
        this.#credentialManager.addCharacter(this.#character);
    }
}