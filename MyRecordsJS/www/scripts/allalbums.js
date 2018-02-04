function getArtist(id) {
    $.ajax({
        type: "GET",
        url: "http://cdmolnet.se/CDService.asmx/getArtist10?userID=" + id,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successvinyl,
        error: function (msg) {
            alert(msg.statusText);
        }
    });
    function successvinyl(data) {
        try {
            var obj = JSON.parse(data.d);
            var shtml = '';
            $.each(obj, function (index, item) {
                shtml += '<li class="li_search" id="lstA" data-id="' + item.artist + '">' + item.artist + '</li>';
            });
            shtml += ' <span class="empty-item">no results</span>';

            $("#list").html(shtml);
            var jobCount = obj.length;//$('#list .in').length;
            $('.list-count').text(jobCount + ' Groups');
        }
        catch (err) {
            // gör inget
        }
    }
}
function getAlbum(a) {
    var id = localStorage.id;
    $.ajax({
        type: "GET",
        url: 'http://cdmolnet.se/CDService.asmx/getAlbum10?userID=' + id + '&Artist="' + a + '"',
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
            var shtml = '<ul class="collection">';
            $.each(obj, function (index, item) {
                shtml += '<li class="collection-item avatar ram" style="padding-bottom:15px;">';
                shtml += '<img src="' + item.Cover + '" class="circle" id="imgA" data-id="' + item.Cover + ';' + a + ';' + item.album + '">';
                shtml += '<span class="title" id="tracks" data-id="' + item.discID + '">' + item.album  + '</span>';
                shtml += '<p><strong>' + item.Ar + '<br>' + item.Media + '</strong></p>';
                shtml += '<a href="#!" class="secondary-content" id="tracks" data-id="' + item.discID + '"><i class="material-icons">playlist_add</i></a></li>';
            });
            shtml += '</ul>';
            $("#right").html(shtml);
            if ($(window).width() <= 480) {
                $("#left").hide();
                $("#right").show();
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
function getArtistVinyl(id) {
    $.ajax({
        type: "GET",
        url: "http://cdmolnet.se/CDService.asmx/getArtistVinyl10?userID=" + id,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successvinyl,
        error: function (msg) {
            alert(msg.statusText);
        }
    });
    function successvinyl(data) {
        try {
            var obj = JSON.parse(data.d);
            var shtml = '';
            $.each(obj, function (index, item) {
                shtml += '<li class="li_search" id="lstA" data-id="' + item.artistVinyl + '">' + item.artistVinyl + '</li>';
            });
            shtml += ' <span class="empty-item">no results</span>';

            $("#list").html(shtml);
            swal.close();
            var jobCount = obj.length;//$('#list .in').length;
            $('.list-count').text(jobCount + ' items');
        }
        catch (err) {
            // gör inget
        }
    }
}
function getArtistCD(id) {
    $.ajax({
        type: "GET",
        url: "http://cdmolnet.se/CDService.asmx/getArtistCD10?userID=" + id,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successCD,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successCD(data) {
        try {
            var obj = JSON.parse(data.d);
            var shtml;
            $.each(obj, function (index, item) {
                shtml += '<li class="li_search" id="lstA" data-id="' + item.artistCD + '">' + item.artistCD + '</li>';
            });
            shtml += ' <span class="empty-item">no results</span>';

            $("#list").html(shtml);
        }
        catch (err) {
            // gör inget
        }
    }
}
function getAlbumCD(a) {
    var id = localStorage.id;
    $.ajax({
        type: "GET",
        url: 'http://cdmolnet.se/CDService.asmx/getAlbumCD10?userID='  + id + '&Artist="' + a + '"',
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successAlbumCD,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successAlbumCD(data) {
        try {
            var obj = JSON.parse(data.d);
            var shtml = '<ul class="collection">';
            $.each(obj, function (index, item) {
                shtml += '<li class="collection-item avatar ram" style="padding-bottom:15px;">';
                shtml += '<img src="' + item.Cover + '" class="circle" id="imgA" data-id="' + item.Cover + ';' + a + ';' + item.album + '">';
                shtml += '<span class="title" id="tracks" data-id="' + item.discID + '">' + item.album + '</span>';
                shtml += '<p><strong>' + item.Ar + '<br>' + item.Media + '</strong></p>';
                shtml += '<a href="#!" class="secondary-content" id="tracks" data-id="' + item.discID + '"><i class="material-icons">playlist_add</i></a></li>';
            });
            shtml += '</ul>';
            $("#right").html(shtml);
            if ($(window).width() <= 480) {
                $("#left").hide();
                $("#right").show();
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
function getAlbumVinyl(a) {
    var id = localStorage.id;
    $.ajax({
        type: "GET",
        url: 'http://cdmolnet.se/CDService.asmx/getAlbumVinyl10?userID=' + id + '&Artist="' + a + '"',
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successAlbumVinyl,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successAlbumVinyl(data) {
        try {
            var obj = JSON.parse(data.d);
            var shtml = '<ul class="collection">';
            $.each(obj, function (index, item) {
                shtml += '<li class="collection-item avatar ram" style="padding-bottom:15px;">';
                shtml += '<img src="' + item.Cover + '" class="circle" id="imgA" data-id="' + item.Cover + ';' + a + ';' + item.album + '">';
                shtml += '<span class="title" id="tracks" data-id="' + item.discID + '">' + item.album + '</span>';
                shtml += '<p><strong>' + item.Ar + '<br>' + item.Media + '</strong></p>';
                shtml += '<a href="#!" class="secondary-content" id="tracks" data-id="' + item.discID + '"><i class="material-icons">playlist_add</i></a></li>';
            });
            shtml += '</ul>';
            $("#right").html(shtml);
            if ($(window).width() <= 480) {
                $("#left").hide();
                $("#right").show();
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
$(document).on('click', '#btnBack', function (ev) {
    $("#right").hide();
    $("#left").show();
    $("#searchinput").show();
    $("#btnBack").hide();
});
$(document).on('click', '#btnHome', function (ev) {
    window.location.href('index.html');
});
function getTracks(discID) {
    var id = localStorage.id;
    $.ajax({
        type: "GET",
        url: 'http://cdmolnet.se/CDService.asmx/getTracks10?userID=' + id + '&DiscID="' + discID + '"',
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successTracks,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successTracks(data) {
        try {
            var obj = JSON.parse(data.d);
            var shtml = '';
            $.each(obj, function (index, item) {
                shtml += '<li class="collection-item">' + item.track + '</li> ';
            });
            $('#modalTracks').openModal();
            $("#lstTracks").html(shtml);
        }
        catch (err) {
            // gör inget list-group-item-success
        }
    }
}