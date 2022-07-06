var dateUp=1;
var state=0;
var date = new Date(0, 0, 1);

$(document).ready(function () {
    $("#date_minus").on("click", function() {
        if (dateUp==1){
            alert("You can't be born before year 1900. Please, born later");
            return;
        }

        dateUp--;
        date.setDate(date.getDate() - 1);
        $("#date").val(getFormattedDate(date));
    });
    $("#date_plus").on("click", function() {
        dateUp++;
        date.setDate(date.getDate() + 1);

        $("#date").val(getFormattedDate(date));
    });
    $("#sign-up-button").on("click", function(b) {
        b.preventDefault();
        $("#form-spinner").removeClass('d-none');
        $("#form-error").addClass('d-none');
        disableAllInput();
        setTimeout(function() {
            if (date.getFullYear()<1952) {
                $("#form-error").html("You're too old for this website. Please, born later");
            } else if ($("#username").val() == '') {
                $("#form-error").html("You need to set an username. Please, just smash your head into the keyboard and add a 69 to the end, it's nice");
            } else if ($("#password").val() == '') {
                $("#form-error").html("You need to set a password. Please, let your cat walk on the keyboard");
            } else {
                let username = $("#username").val();
                let password = $("#password").val();
                switch (state) {
                    case 0:
                        $("#form-error").html("The username '"+username+"' is alredy taken by an user with the password 'ThisDatePickerSuck'");
                        state++;
                        break;
                    case 1:
                        $("#form-error").html("The password '"+password+"' is alredy taken by an user with the username 'PLEASE_LET_ME_IN'");
                        state++;
                        break;
                    default:
                        $("#form-error").html("The birth date "+
getFormattedDate(date, true)+" is alredy taken by an user with the username 'YourSecretTwin'");
                        state++;
                        break;
                }
            }
            date = new Date(Date.UTC(0, 0, 1));
            var dateUp=1;
            $("#date").val(getFormattedDate(date));
            $("#form-spinner").addClass('d-none');
            $("#form-error").removeClass('d-none');
            enableAllInputAndClear();
        },1000);
    });
});

function getFormattedDate(date_to_format, reverse=false) {
    var day = String(date_to_format.getDate()),
        month = String(date_to_format.getMonth() + 1),
        year = String(date_to_format.getFullYear());
    while (year.length<4) {
        year="0"+year;
    }
    while (month.length<2) {
        month="0"+month;
    }
    while (day.length<2) {
        day="0"+day;
    }
    if (reverse)
        return day+"-"+month+"-"+year;
    return year+"-"+month+"-"+day;
}

function disableAllInput() {
    $("#username").prop("disabled", "disabled");
    $("#password").prop("disabled", "disabled");
    $("#date_minus").prop("disabled", "disabled");
    $("#date_plus").prop("disabled", "disabled");
    $("#sign-up-button").prop("disabled", "disabled");
    return;
}
function enableAllInputAndClear() {
    $("#username").prop("disabled", "").val("");
    $("#password").prop("disabled", "").val("");
    $("#date_minus").prop("disabled", "");
    $("#date_plus").prop("disabled", "");
    $("#sign-up-button").prop("disabled", "");
    return;
}

function UUDDLRLRBA() {
    dateUp=10000000;
    date.setYear(new Date().getFullYear() - 30);
    $("#date").val(getFormattedDate(date));
}