function ct_url(url) {
    return window.current_controller_url + "/" + url;
}


function actionModalShowFiles(idAnno, idGroup)
{
    $('#ModalShowFilesBody').load(window.current_controller_url + '/actionAjaxModalShowFiles/' + idAnno + '/' + idGroup, function (result) {
        $('#ModalShowFiles').modal({show: true, backdrop: 'static'});
    });
}


function jsSignProtPredBySecretar(announce_id) {
    var formProtPredSign = $('#signingProtPred');
    if (typeof (form_sign_helper) != "undefined") {
        var check_files_status = form_sign_helper.check_statuses();
        if (check_files_status != null) {
            if (check_files_status != true) {
                alert('Дождитесь проверки файла');
                return;
            }
        }
        form_sign_helper.generate_input(formProtPredSign);
    }
    var dataS = formProtPredSign.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/actionSignProtPredBySecretar/' + announce_id,
        data: dataS,
        dataType: 'json',
        success: function (data) {
            if (data.status == 1)
            {
                $('#errors_sign_ppd').html('<div class="alert alert-success">' + data.message + '</div>');
                window.location.href = ct_url('index/' + announce_id);
            }
            if (data.status == 2)
            {
                $('#errors_sign_ppd').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
            return;
        },
        error: function () {
            $('#errors_sign_ppd').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            return;
        }
    });
}





