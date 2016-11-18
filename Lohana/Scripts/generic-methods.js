
function ToJavaScriptDate(value) {
    if (value != "null" && value != null && value != "") {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));

        var dtDate = dt.getDate();
        if (dtDate.toString().length == 1) {
            dtDate = "0" + dtDate;
        }

        var dtMonth = dt.getMonth() + 1;
        if (dtMonth.toString().length == 1) {
            dtMonth = "0" + dtMonth;
        }

        // return (dt.getMonth() + 1) + "/" + dtDate + "/" + dt.getFullYear();
        //return dtMonth + "/" + dtDate + "/" + dt.getFullYear();
        return dtDate + "/" + dtMonth + "/" + dt.getFullYear();
    }
    else {
        return "";
    }
}

function Bind_Images() {
    $("#ShowImages").html("");

    $.ajax({
        type: "POST",
        url: '/upload-file/get-browsed-images',
        data: { File_Type: $("#hdnFileType").val() },
        success: function (attachments) {

            var htmlText = "";

            if (attachments.length > 0) {

                for (i = 0; i < attachments.length; i++) {

                    htmlText += "<div id='DivImages' class='col-md-3' style='margin-top: 10px;'>";

                    htmlText += "<div class='thumbnail panel'>";

                    htmlText += "<input type='radio' name='Image' id='" + attachments[i].Attachment_Id + "' class='iradio-list' data-src='" + attachments[i].Unique_Id + "' />";

                    //htmlText += "<label>" + attachments [i].File_Name + "</label>";

                    htmlText += "<img style='width:130px; height: 113px;border: 1px solid;margin-left: auto;margin-right: auto;display: block;max-width: 100%;max-height: 100%;' src='" + attachments[i].Unique_Id + "'>"

                    htmlText += "</div>";

                    htmlText += "</div>";

                }

            }
            //else {

            //}

            $('#ShowImages').append(htmlText);

            $('.iradio-list').iCheck({
                radioClass: 'iradio_square-green',
                increaseArea: '20%'
            });

            $("#ImageModal").modal("show");

            $('[name="Image"]').on('ifChanged', function (event) {
                if ($(this).prop('checked')) {

                    $("#hdnAttachmentId").val(this.id);
                    var src = $(this).attr('data-src');
                    $("#imgHeaderImage").attr('src', src);
                    $("#hdnHeader_Image_Url").val(src);
                }
            });

        }
    });

}


function Get_Date_Month_Name(mon) {

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var n = month[(parseInt(mon) - 1)];
    return n;
}