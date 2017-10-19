// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    $(document).on('click', '#lstA', function (ev) {
        var uid = $(this).data('id');
        getAlbum(uid);
    });
    $(document).on('click', '#btnBack', function (ev) {
        $("#right").hide();
        $("#left").show();
        $("#searchinput").show();
    });
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        $("#btnTest").click(function () {
            getArtist(1);
        });

        

    };
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
    function getArtist(id) {
        $.ajax({
            type: "GET",
            url: "http://cdmolnet.se/CDService.asmx/getArtist10?userID=" + id,
            crossDomain: true,
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successArtist,
            error: function (msg) {

                alert(msg.statusText);

            }
        });
        function successArtist(data) {
            try {
                var obj = JSON.parse(data.d);
                var shtml = '<form role="form">';
                shtml += '<div class="form-group">';
                shtml += '<input class="form-control" id="searchinput" type="search" placeholder="Search...">';
                shtml += '</div><div id="left" class="list-group">Left side div</div></form>';
                $.each(obj, function (index, item) {
                    shtml += '<a id="lstA" class="list-group-item" href="#" data-id="' + item.artist + '"><span>' + item.artist + '</span><i style="background:aquamarine" class="badge">&nbsp;</i></a>';
                });
                shtml += '</form>';
                $("#left").html(shtml);
                $('#left').btsListFilter('#searchinput');
            }
            catch (err) {
                // gör inget
            }
        }
    }
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };
    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    function mySearch() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myULArtist");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";

            }
        }
    }
    function getAlbum(a) {
        var id = 1;
        $.ajax({
            type: "GET",
            url: 'http://cdmolnet.se/CDService.asmx/getAlbum10?userID=1&Artist="' + a + '"',
            crossDomain: true,
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successAlbum,
            error: function (msg) {

                alert(msg.statusText);

            }
        });
        function successAlbum(data) {
            try {
                var obj = JSON.parse(data.d);
                var shtml = '<div class="wraper"><button type="button" class="btn btn-primary btn-block" style="margin-bottom: 5px;" id="btnBack">Back</button>';
                $.each(obj, function (index, item) {
                    shtml += '<div class="container-fluid"><img src="' + item.Cover + '" class="img-rounded imgCover" id="imgA"  data-id="' + item.Cover + '" data-rel="external">';
                    shtml += '<div class="bottomLeftCover">' + item.album + '<br>' + item.Ar + '<br>' + item.Media + '</div></div> ';
                });
                shtml += '</div>';
                $("#right").html(shtml);
                if ($(window).width() <= 480) {
                    $("#left").hide();
                    $("#right").show();
                    //$("#searchinput").hide();
                    $("#btnBack").show();
                }
                
                else {
                    $("#btnBack").hide();
                }
                }
            catch (err) {
                // gör inget
            }
        }
    }
})();