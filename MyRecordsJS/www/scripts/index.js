// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    setTimeout(function () {
        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
        );
        $('.collapsible').collapsible();
    }, 1000);
    $(document).on('click', '#btnBack', function (ev) {
        $("#right").hide();
        $("#left").show();
        $("#searchinput").show();
    });
    $(document).on('click', '#login', function (ev) {
        logIn();
    });
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        $('.modal').modal();
        $('.modal-trigger').leanModal();
        checkinlogg();
    }
    function checkinlogg() {
        if (localStorage.inloggad === 'Ja') {
            //Materialize.toast('Login you in!', 3000, 'rounded')
            $('#info').html('<h3>Wellcome <br><br>' + localStorage.namn + '</h3>');
        } else {
            $('#info').html('<strong>You are logged in</strong>');
        }
    }
    function updatePage(msg) {
        //Build an output string consisting of the different screen
        //measurement values
        /*var strongStart = "<strong>";
        var strongEnd = "</strong>";
        var StrRes, or, sw, sh, ww, wh;
        or = strongStart + "Orientation: " + strongEnd +
            window.orientation + " degrees";
        console.log(or);
        strRes = or + br;
        sw = strongStart + "Width: " + strongEnd + screen.width;
        console.log(sw);
        strRes += sw + br;
        sh = strongStart + "Height: " + strongEnd + screen.height;
        console.log(sh);
        strRes += sh + br;
        ww = strongStart + "Inner width: " + strongEnd +
            window.innerWidth;
        console.log(ww);
        strRes += ww + br;
        wh = strongStart + "Inner height: " + strongEnd +
            window.innerHeight;
        console.log(wh);
        strRes += wh + br;
        document.getElementById('appInfo').innerHTML = strRes;*/
    }
    function onOrientationChange() {
        switch (window.orientation) {
            case 90:
                $('#appInfo').html('Device is in Landscape mode');
                break;
            case -90:
                $('#appInfo').html('Device is in Landscape mode');
                break;
            default:
                $('#left').width(screen.width);
                $('#right').hide();
                $('#appInfo').html('Device is in Portrait mode');
                break;
        }
        //updatePage();
    }
    function onResize() {
        updatePage();
    }
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }
    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
    function mySearch() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myULArtist");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.stoUpperCase().stindexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";

            }
        }
    }
    function logIn() {
        var x = document.getElementById('txtUser').value;
        var xE = ekrypt(x);
        var y = document.getElementById('txtLosen').value;
        var yE = ekrypt(y);
        $.ajax({
            type: "POST",
            url: "http://cdmolnet.se/CDService.asmx/loggaIn",
            data: "{usernamn:'" + x + "', password: '" + y + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successLogin,
            error: function (msg) {
                alert(msg.statusText);
            }
        });
        function successLogin(data) {
            if (data.d === 'NO') {
                swal("Something, went wrong!", "Try again!", "error");
            } else {
                $('#txtUser').val('');
                $('#txtLosen').val('');
                var s = data.d;
                var result = s.split(';');
                localStorage.id = result[1];
                localStorage.inloggad = 'Ja';
                localStorage.namn = result[0];
                $('#modal1').closeModal();
                $('#info').html('<h3>Wellcome <br><br>' + localStorage.namn + '</h3>');
            }
        }
    }
    function ekrypt(vad) {
        var key = CryptoJS.enc.Utf8.parse('7061737323313233');
        var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(vad), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted;
    }
})();