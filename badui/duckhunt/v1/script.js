var gameController;
var effectEnabled = 1;
$(document).ready(function() {
    $("#duckhunt-close").on("click", function() {
        $("#duckhunt-wrapper").addClass("d-none");
    });

    $("#open-duckhunt").on("click", function(b) {
        b.preventDefault();
        $("#duckhunt-wrapper").removeClass("d-none");
    });

    $("#disable-effect").on("click", function(b) {
        b.preventDefault();
        switch (effectEnabled) {
            case 1:
                $("#disable-effect").html('Enable flashing effect');
                effectEnabled=0;
                $('body').removeClass('enable-effect');
                break;
            case 0:
                $("#disable-effect").html('Disable flashing effect');
                effectEnabled=1;
                $('body').addClass('enable-effect');
                break;
        }
    });

    $("#click-to-play").on("click", function(b) {
        $("#ui").removeClass("d-none");
        $("#credential-wrapper").removeClass("d-none");
        $("#login-button").removeClass("d-none");
        $("#click-to-play").addClass("d-none");
        $(".duckhunt-canvas").addClass("playing");
    });

    gameController = new GameController();

    $("#click-to-play").on('click', function() { gameController.spawnDuck() });

});