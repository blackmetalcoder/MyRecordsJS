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
                shtml += '<li class="collection-item  teal lighten-2" id="lstA" data-id="' + item.artist + '">' + item.artist + '<span class="badge white">' + item.antal + '</span></li>';
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