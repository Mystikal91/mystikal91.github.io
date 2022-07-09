class GameController {
    #duck_canvas; // Wrapper for the ducks
    #ducks = []; // Array of ducks
    #username; // The username field
    #password; // The password field
    #state; // Game state
    #state_values = {
        "MAIN_MENU": 0, // Before the game start
        "PLAYING": 1
    }
    #time_between_spawns = 2500; // Milliseconds between spawn
    #spawn_reducer_coefficient = 0.95 // How much, in percentage, will decrease the spawn time between ducks
    #max_duck = 10; // Max number of duck
    #spawner;
    #clock;
    #credentialManager;

    constructor(duck_wrapper ="", username="", password="") {
        this.#username = username;
        this.#password = password;
        this.#duck_canvas = document.getElementById('ducks-canvas');
        this.#clock = setInterval(this.clock.bind(this),1000/30);
        this.#credentialManager = new CredentialManager($('.credential-wrapper'));
    }


    spawnDuck() {
        if (this.#max_duck>this.#ducks.length) {
            this.#time_between_spawns = Math.max(this.#time_between_spawns*this.#spawn_reducer_coefficient,250);
            this.#ducks.push(new Duck(this.#duck_canvas,this.#credentialManager));
        }
        this.#spawner = setTimeout(this.spawnDuck.bind(this), this.#time_between_spawns);
    }

    clock() {
        this.#ducks.forEach(function(duck,index,array) {
            if (!duck.makeAMove()) {
                array.splice(index,1);
            }
        });
    }
}