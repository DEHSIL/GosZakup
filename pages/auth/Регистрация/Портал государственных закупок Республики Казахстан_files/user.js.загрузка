/**
 * Created by sapa on 03.06.2014.
 */
var inis_clock = 0;

function user_url() {
    var lang = 'ru';
    var url = window.location.href.split('/');
    var http = location.protocol;
    var hostname = window.location.hostname;

    switch (url[3]) {
        case 'kz':
        case 'en':
            lang = url[3];
            break
        default:
            lang = 'ru';
            break;
    }

    return http + '//' + hostname + '/' + lang + '/user/';
}

function register_close() {
    // $('#user_progressbar').css('width','100%');
    // $('#user_progressbar span').html('100%');
    // $('#user_progressbar').attr('aria-valuenow','100');
    $('#btn_user_button_ok').attr('disabled', true);
    $('#user_button_no').attr('disabled', true);
    $('#sendRequest').attr('disabled', true);
}

function change_email() {
    $('#form_ajax_alert').html('');
    var err = 0;


    if ($('#new_email').val() != $('#confirm_new_email').val()) {
        $('#form_ajax_alert').append('<div class="alert alert-danger" style="width: 250px;">Электронная почта не совпадает</div>');
        err++;
    }

    if (!err) {
        $.ajax({
            type: "POST",
            url: user_url() + 'change_email',
            data: {
                new_email: $('#new_email').val()
            },
            success: function (data, status) {

                if (data.st == 'ok') {
                    $('#user_button_change_email').hide();
                    $('#form_ajax_alert').html(data.msg);
                } else {
                    $('#form_ajax_alert').html(data.msg);
                }
            },
            error: function () {
                $('#form_ajax_alert').html('<div class="alert alert-danger">Ошибка сервера</div>');
            }
        });
    }
    return;
}

function nonres_user_button_ok() {
    $('#form_ajax_alert').html('');
    var err = 0;

    if (!validateEmail($('#email').val())) {
        $('#form_ajax_alert').append('<div class="alert alert-danger">Неправильная электронная почта</div>');
        err++;
    }

    if ($('#password').val().length == 0) {
        $('#form_ajax_alert').append('<div class="alert alert-danger">Вы не указали пароль</div>');
        err++;
    }

    //    if ($('#password').val().length < 6) {
    //        $('#form_ajax_alert').append('<div class="alert alert-danger">Пароль должен быть не менее 8 символов</div>');
    //        err++;
    //    }

    if ($('#password').val() != $('#repassword').val()) {
        $('#form_ajax_alert').append('<div class="alert alert-danger">Пароль не совпадает</div>');
        err++;
    }

    if (!err) {
        $.ajax({
            type: "POST",
            url: user_url() + 'ajax_user_reg_confirm',
            data: {
                givenname: $('#givenname').val(),
                pass: $('#password').val(),
                email: $('#email').val(),
                birthday: $('#birthday').val(),
                passport_number: $('#passport_number').val(),
                passport_date: $('#passport_date').val(),
                passport_org: $('#passport_org').val()
            },
            success: function (data, status) {
                $('#form_ajax_alert').html(data);
            },
            error: function () {
                $('#form_ajax_alert').html('<div class="alert alert-danger">Ошибка сервера</div>');
            }
        });
    }
    return;
}

function user_button_ok() {

    $('#form_ajax_alert').html('');
    var frmdata = $('#frm_agr_sign').serialize();

    $('#btn_user_button_ok').prop("disabled", true);
    $("#btn_loading").addClass('glyphicon-refresh-animate');

    $.ajax({
        type: "POST", dataType: "json",
        url: user_url() + 'ajax_user_reg_confirm',
        data: frmdata,
        success: function (js, status) {
            $("#btn_loading").removeClass('glyphicon-refresh-animate');
            if (js.st == 'ok') {
                $('#btn_user_button_ok').hide();
            } else {
                $('#btn_user_button_ok').prop("disabled", false);
                $("button.btn-add-signature[data-file-identifier='sign']").show();
                $('#frm_agr_sign > input[name="signature\[sign\]"]').val("");
                $('#frm_agr_res').hide();
            }
            $('#form_ajax_alert').html(js.msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#btn_loading").removeClass('glyphicon-refresh-animate');
            $('#btn_user_button_ok').prop("disabled", false);
            $("button.btn-add-signature[data-file-identifier='sign']").show();
            $('#frm_agr_sign > input[name="signature\[sign\]"]').val("");
            $('#frm_agr_res').hide();
            $('#form_ajax_alert').html('<div class="alert alert-danger">Ошибка сервера [' + errorThrown + ']</div>');
        }
    });
}

function user_button_no(message) {
    $('#form_ajax_alert').html('<div class="alert alert-warning">' + message + '</div>')
}


function send_inis_request() {
    $('#requestResult').html('<div class="alert alert-info">Выполняется запрос <span id="clock" class="label label-info"></span></div>');
    $('#sendRequest').attr('disabled', true);
    inis_clock = 0;
    jsClock();
    $.ajax({
        type: "GET",
        data: {iin: $('#iin').val()},
        url: user_url() + 'ajax_inis_request',
        success: function (data, status) {
            inis_clock = -1;
            $('#requestResult').html(data);
            // $('#user_progressbar').css('width','66%');
            // $('#user_progressbar span').html('66%');
            // $('#user_progressbar').attr('aria-valuenow','66');
            $('#sendRequest').attr('disabled', false);
            return;
        },
        error: function () {
            // $('#user_progressbar').css('width','33%');
            // $('#user_progressbar span').html('33%');
            // $('#user_progressbar').attr('aria-valuenow','33')
            $('#sendRequest').attr('disabled', false);
            inis_clock = 301;
            return;
        }
    });
}


function jsClock() {
    if (inis_clock > 300) {
        $('#requestResult').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте еще раз</div>');
        return;
    }
    if (inis_clock < 0) return;
    inis_clock += 1;
    $('#clock').html(inis_clock + ' сек.');
    setTimeout("jsClock()", 1000);
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/** @namespace helpers.users.modal_search */
genHelperNamespace(window,'helpers.users.modal_search');
helpers.users.modal_search.find = function(jEvent){
    var uri = '/'+getCurLang()+'/backend/users/ajax_search_users/';
    if(jEvent != null) {
        var href = $(jEvent.currentTarget).attr('href');
        if ( href != '') {
            uri = href;
        }
    }
    var form = $("#search_user").serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: uri,
        data: form,
        success: function (data) {
            data = $.parseJSON(data);
            if (data.status == 1){
                $(".modal-body-users").html(data.message);
                $('#ajax_pag a').click(helpers.users.modal_search.find);
            }else{
                alert(data.message);
                $(".modal-users").modal("hide");
            }
        },
        error: function () {
            alert('Ошибка выполнения запроса, попробуйте позже');
            $(".modal-users").modal("hide");
        }
    });
    return false;

};
helpers.users.modal_search.search_result_handler = function(){
    alert('Не определен обработчик выбора пользователя');
};

helpers.users.modal_search.show = function(search_result_handler){
    helpers.users.modal_search.search_result_handler = search_result_handler;
    $(".modal-users").modal("show");
};

helpers.users.modal_search.select = function(sender){
    sender.dataset['member_name'] = $(sender).parents('tr').children('.user_name').html().trim();
    helpers.users.modal_search.search_result_handler(sender.dataset);
    $(".modal-users").modal("hide");
}



