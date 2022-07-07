$(document).ready(function () {

    var form_info=$("#form-info");

    $("#phone-range, #phone-range-verify").on("change mousemove", function() {
        var target = $(this).attr('data-target');
       $('#'+target).val("+"+$(this).val());
    });

    $('#otp-value').val(generateOTP(256, $(this).val()));

    $("#otp-range").on("input", function() {
        $('#otp-value').val(generateOTP(256, $(this).val()));
    });


    let today = new Date();
    $("#date").val(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
    updateNumOfChar();


    $("#date").on("change", function() {
        updateNumOfChar();
    });

    $('#sign-up-button').on('click', function(b) {
        b.preventDefault();
        if ($("#username").val() == '') {
            form_info.html("You need to set an username. Please, choose something cringe");
            form_info.addClass('error');
        } else if ($("#password").val() == '') {
            form_info.html("You need to set a password. Please, sit on your keyboard");
            form_info.addClass('error');
        } else if ($("#phone-range").val() == 0) {
            form_info.html("You need to set a phone number so we can <s>sell it to a call center</s> verify your identity");
            form_info.addClass('error');
        } else {
            disableAllInput(1);
            $("#form-spinner").removeClass("d-none");
            form_info.removeClass('error');
            form_info.html("Trying to contact the server...")
            setTimeout(function() {
                 form_info.html("The server is very cheap and slow...")
            },3000);
            setTimeout(function() {
                 form_info.html("Asking permission to your mom...")
            },4000);
            setTimeout(function() {
                 form_info.html('Your mom said "Yeah, sure..."')
            },6000);
            setTimeout(function() {
                 form_info.html('Sending your data to the chinese government...')
            },7500);
            setTimeout(function() {
                 form_info.html('Woops, I meant the server, not the chinese government, sorry about that...')
            },9500);
            setTimeout(function() {
                form_info.html('');
                $("#form-spinner").addClass("d-none");
                $("#phase-1").addClass("d-none");
                $("#phase-2").removeClass("d-none");
            },12000);
        }
    });


    $('#verify-button').on('click', function(b) {
        b.preventDefault();
        if ($("#phone-range").val() != $('#phone-range-verify').val()) {
            form_info.html("The two phone numbers don't match. Please, suffer");
            form_info.addClass('error');
        } else {
            disableAllInput(2);
            $("#form-spinner").removeClass("d-none");
            form_info.removeClass('error');
            form_info.html("Trying to contact the server...")
            setTimeout(function() {
                 form_info.html("The server is on fire, please wait...")
            },3000);
            setTimeout(function() {
                form_info.html('');
                $("#form-spinner").addClass("d-none");
                $("#phase-2").addClass("d-none");
                $("#phase-3").removeClass("d-none");
            },6000);
        }
    });

    $('#verify-otp-button').on('click', function(b) {
        b.preventDefault();
        form_info.html("The OTP code is wrong. Stop trying to bruteforce it, it's mean");
        form_info.addClass('error');
    });
});

function updateNumOfChar() {
    var number_of_char=new Date($("#date").val()).getDate();
    var max="";
    for (var i = 0; i < number_of_char; i++) {
        max+='9'
    }
    $("#phone-range, #phone-range-verify").attr('max',max);
    $("#phone-range, #phone-range-verify").val(0);
}

function disableAllInput(phase=1) {
    switch (phase) {
        case 1:
            $("#username").prop("disabled", "disabled");
            $("#password").prop("disabled", "disabled");
            $("#date").prop("disabled", "disabled");
            $("#phone-range").prop("disabled", "disabled");
            $("#sign-up-button").prop("disabled", "disabled");
            break;
    }
}

function enableAllInput(phase=1) {
    switch (phase) {
        case 1:
            $("#username").prop("disabled", "");
            $("#password").prop("disabled", "");
            $("#date").prop("disabled", "");
            $("#phone-range").prop("disabled", "");
            $("#sign-up-button").prop("disabled", "");
            break;
    }
}

// OTP to String
// Attention: This function is really stupid and bad, do not copy it
function generateOTP(length) {
    var output='';
    let batch = 16;
    while (output.length<length) {
        var batch_size=Math.pow(10,batch);
        let digits = Math.floor(Math.random() * batch_size);
        let digitsAsString = digits.toString();
        while (digitsAsString.length<batch) {
            digitsAsString="0"+digitsAsString;
        }
        output+=digitsAsString;
    }
    return output;
}