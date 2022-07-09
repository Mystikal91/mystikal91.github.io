class CredentialManager {
    #length = [0,0]; // Length[0] for username, Lenght[1] for password

    #$dom = []; // $dom[0] for username, #$dom[1] for password

    #current = 0; // 0 for username, 1 for password
    #max_element = 9; // max element

    constructor(parent) {
        this.#$dom[0] = parent.children('#username-list');
        this.#$dom[1] = parent.children('#password-list');

    }

    addCharacter(char) {
        switch (char) {
            case '36': // Change
                this.#$dom[this.#current].children('.cursor').removeClass('cursor');
                this.#current = Math.abs(this.#current-1);
                if (this.#length[this.#current]==this.#max_element)
                    return;
                element = this.#$dom[this.#current].children('div').eq(this.#length[this.#current]);
                element.addClass('cursor');
                break;
            case '37': // Backspace
                if (this.#length[this.#current]==0)
                    return;
                this.#$dom[this.#current].children('.cursor').removeClass('cursor');
                var element = (this.#$dom[this.#current]).children('div').eq(this.#length[this.#current]-1);
                element.css('background-position-x', '');
                element.addClass('cursor');
                this.#length[this.#current]--;
                break;
            default:
                if (this.#length[this.#current]==this.#max_element)
                    return;

                if (this.#current==1)
                    char = 37; // Change to duck

                var element = this.#$dom[this.#current].children('div').eq(this.#length[this.#current]);
                element.css('background-position-x', char/37*100+'%');
                element.removeClass('cursor');

                this.#length[this.#current]++;

                if (this.#length[this.#current]==this.#max_element)
                    return;

                element = this.#$dom[this.#current].children('div').eq(this.#length[this.#current]);
                element.addClass('cursor');
                break;
        }
    }
}