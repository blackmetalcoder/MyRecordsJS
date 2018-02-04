var latar;
$(document).ready(function () {
    $('#P1').hide();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.modal-trigger').leanModal();
    checkinlogg();

});
function checkinlogg() {
    if (localStorage.inloggad === 'Ja') {
        //getAlbum();
    } else {
        Materialize.toast('Create an account!', 4000);
        window.location.href("index.html");
    }
}
$(document).on('click', '#btnGetPlaylist', function (ev) {
    getAlbum();
});
$(document).on('click', '#btnTest', function (ev) {
    Materialize.toast('Hej!', 4000);
});
$(document).on('click', '#btnSave', function (ev) {
    //checkAlbum();
    saveAlbum();
});
function getAlbum() {
    $('#P1').show();
    var A, AL;
    A = $('#artist').val();
    AL = $('#album').val();
    $.ajax({
        type: "GET",
        url: 'http://cdmolnet.se/CDService.asmx/AlbumTracks?Artist="' + A + '"&Album="' + AL + '"',
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successAlbum,
        error: function (msg) {

            alert(msg.statusText);
            $('#P1').hide();
        }
    });
    function successAlbum(data) {
        try {
            $('#P1').hide();
            $('#btnSave').show();
            var obj = JSON.parse(data.d);
            //Album info
            $("#CoverPic").attr("src", obj[0].Coverart);
            $('#txtAlbum').val(obj[0].Album);
            $('#txtReleaseYear').val(obj[0].Ar);
            $('#txtGenre').val(obj[0].Genre);
            $('#txtArtist').val(A);
            $('#txtDiscid').val(obj[0].Id);
            //Låtar
            var v = obj[0].Lat;
            latar = obj[0].Lat;
            var shtml = '';
            $.each(v, function (index, item) {
                shtml += '<li class="collection-item active"><span class="badge red" data-badge-caption=" " style="color:white">' + item.Nr + '</span>' + item.Title + '</li>';
            });
            $("#tracks").html(shtml);
            $('#modal1').closeModal();
        }
        catch (err) {
            // gör inget
        }
    }
}
function checkAlbum() {
    var userId = localStorage.id;
    var discId = $('#txtDiscid').val();
    $.ajax({
        type: "GET",
        url: 'http://cdmolnet.se/CDService.asmx/finnsAlbum?userID=' + userId + '&discid="' + discId + '"',
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
            if (obj === false) {
                Materialize.toast('Album will be saved!', 4000);
            } else {
                Materialize.toast('Album will is in collection!', 4000);
            }
        }
        catch (err) {
            // gör inget
        }
    }
}
function saveAlbum() {
    var artist = $('#txtArtist').val();
    var album = $('#txtAlbum').val();
    var ar = $('#txtReleaseYear').val();
    var kategori = $('#txtGenre').val();
    var discid = $('#txtDiscid').val();
    var userid = localStorage.id;
    var cover =$('img').attr('src');
    var media = selMedia.value;
    $.ajax({
        type: "POST",
        url: "http://cdmolnet.se/CDService.asmx/sparaAlbumElectron",
        data: "{discid:'" + discid + "', userID:" + userid + ", bild: '" + cover + "', media:'" + media + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d === "Sparat") {
                Materialize.toast('Album saved!', 3000, 'rounded');
            }
        },
        error: function (err) {
            Materialize.toast('Something, went wrong! Try again', 3000, 'rounded');
        }
    })
}
/*function successAlbum(data) {
        try {
            $('#spinnLoader').removeClass('loader');
            $('#btnSave').show();
            var obj = JSON.parse(data.d);
            //Album info
            $("#CoverPic").attr("src", obj[0].Coverart);
            $('#txtAlbum').val(obj[0].Album);
            $('#txtReleaseYear').val(obj[0].Ar);
            $('#txtGenre').val(obj[0].Genre);
            $('#txtArtist').val(A);
            $('#txtDiscid').val(obj[0].Id);
            //Låtar
            var v = obj[0].Lat;
            var shtml = '';
            $.each(v, function (index, item) {
                shtml += '<li class="list-group-item list-group-item-warning"><span class="badge">' + item.Nr + '</span>' + item.Title + '</li>';
            });
            $("#tracks").html(shtml);

        }
        catch (err) {
            // gör inget
        }
    }*/



