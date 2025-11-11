/**
 * Created by sapa on 27.06.2014.
 */
var inis_clock = 0;


function delete_avatar() {
    $.ajax({
        type: "GET",
        url: site_url() + 'delete_avatar',
        success: function (data, status) {
            $('#loading').show();
            $('#avatar_img').html(data);
            return;
        },
        error: function () {
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            $('#loading').hide();
            return;
        }
    });
}

function upload_avatar(evt) {
    $('#loading').show();
    var files = evt.files; // FileList object

    var f = files[0];
    if (!f.type.match('image.*')) {
        alert('Неправильный тип файла');
        return;
    }

    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {

            $.ajax({
                type: "POST",
                url: site_url() + 'upload_avatar',
                data: {
                    avatar: e.target.result
                },
                success: function (data, status) {
                    $('#loading').hide();
                    $('#avatar_img').html(data);
                    return;
                },
                error: function () {
                    $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                    $('#loading').hide();
                    return;
                }
            });
        };
    })(f);
    reader.readAsDataURL(f);
}

function upload_logotype(evt) {
    $('#loading').show();
    var files = evt.files; // FileList object

    var f = files[0];
    if (!f.type.match('image.*')) {
        alert('Неправильный тип файла');
        return;
    }

    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {

            $.ajax({
                type: "POST",
                url: site_url() + 'upload_logotype',
                data: {
                    avatar: e.target.result
                },
                success: function (data, status) {
                    $('#loading').hide();
                    $('#avatar_img').html(data);
                    return;
                },
                error: function () {
                    $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                    $('#loading').hide();
                    return;
                }
            });
        };
    })(f);
    reader.readAsDataURL(f);
}

function delete_logotype() {
    $.ajax({
        type: "GET",
        url: site_url() + 'delete_logotype',
        success: function (data, status) {
            $('#loading').show();
            $('#avatar_img').html(data);
            return;
        },
        error: function () {
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            $('#loading').hide();
            return;
        }
    });
}


function site_url() {
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

    return http + '//' + hostname + '/' + lang + '/cabinet/';
}

function jsClock() {
    if (inis_clock > 300) {
        $('#requestResult').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте еще раз</div>');
        return;
    }
    if (inis_clock < 0)
        return;
    inis_clock += 1;
    $('#clock').html(inis_clock + ' сек.');
    setTimeout("jsClock()", 1000);
}

function update_subject_frominis() {
    $('#loading').show();
    $('#ajax_result').html('<div class="alert alert-info">Выполняется запрос <span id="clock" class="label label-info"></span></div>');
    $('#sendRequest').attr('disabled', true);
    inis_clock = 0;
    jsClock();
    $.ajax({
        type: "GET",
        url: site_url() + 'ajax_subject_inis_update',
        success: function (data, status) {
            inis_clock = -1;
            $('#loading').hide();
            $('#ajax_result').html(data);
            $('#sendRequest').attr('disabled', false);
            return;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#loading').hide();
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, ' + errorThrown + '</div>');
            $('#sendRequest').attr('disabled', false);
            inis_clock = 301;
            return;
        }
    });
}

function update_user_frominis() {
    $('#ajax_result').html('<div class="alert alert-info">Выполняется запрос <span id="clock" class="label label-info"></span></div>');
    $('#sendRequest_icon').addClass('glyphicon-refresh-animate');
    $('#sendRequest').attr('disabled', true);
    inis_clock = 0;
    jsClock();
    $.ajax({
        type: "GET",
        url: site_url() + 'ajax_user_inis_update',
        dataType: 'JSON',
        success: function (data) {
            inis_clock = -1;
            $('#sendRequest_icon').removeClass('glyphicon-refresh-animate');
            $('#sendRequest').attr('disabled', false);

            if(data.status == 'error'){
                $('#ajax_result').html('<div class="alert alert-danger">' + data.message + '</div>');
            }else{
                $('#ajax_result').html('<div class="alert alert-succcess">' + data.message + '</div>');
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, ' + errorThrown + '</div>');
            $('#sendRequest_icon').removeClass('glyphicon-refresh-animate');
            $('#sendRequest').attr('disabled', false);
            inis_clock = 301;
        }
    });

    return false;
}

/**
 * Кабинет -> Личные данные -> Регистрационные данные
 *   Изменение пароля пользователя
 */
function save_password() {
    $('#butsave').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_save_password',
        data: {oldpass: $('#oldpass').val(), newpass: $('#newpass').val(), renewpass: $('#renewpass').val()},
        success: function (data, status) {
            $('#ajax_result').html(data);
            $('#butsave').attr('disabled', false);
            $('#loading').hide();
            return;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, ' + errorThrown + '</div>');
            $('#butsave').attr('disabled', false);
            $('#loading').hide();
            return;
        }
    });
}

function save_user_data() {
    $('#butsave').attr('disabled', true);
    $("#loading").addClass('glyphicon-refresh-animate');
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_save_user_reg_data',
        data: {
            iin: $('#iin').val(),
            inn: $('#inn').val(),
            rnn: $('#rnn').val(),
            surname: $('#surname').val(),
            name: $('#name').val(),
            givenname: $('#givenname').val(),
            birthday: $('#birthday').val(),
            email: $('#email').val(),
            // sex: $('#sex').val(),
            phone: $('#phone').val(),
            cellphone: $('#cellphone').val()
        },
        success: function (data, status) {
            $('#ajax_result').html(data);
            $('#butsave').attr('disabled', false);
            $("#loading").removeClass('glyphicon-refresh-animate');
            return;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса. ' + errorThrown + '</div>');
            $('#butsave').attr('disabled', false);
            $("#loading").removeClass('glyphicon-refresh-animate');
            return;
        }
    });
}


function getSu(select) {
    $('#loadings').show();
    $('#ajax_result').empty();
    inis_clock = 0;
    jsClock();
    $.ajax({
        type: "GET",
        url: site_url() + 'ajax_subject_get',
        data: "type=" + select.value,
        success: function (data) {
            inis_clock = -1;
            $('#loadings').hide();
            $('#ajax_result').html(data);
            return;
        },
        error: function () {
            $('#loadings').hide();
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            inis_clock = 301;
            return;
        }
    });
}

function addAdmNew() {
    var fd = $('#addAdmNew').serialize();
    $('#ajax_result1').empty();
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_subject_addAdm',
        data: fd,
        dataType: 'json',
        beforeSend: function () {
            $.isLoading({ text: "Создание заявки на прикрепление к администратору отчетности..." });
        },
        success: function (data) {
            $.isLoading( "hide" );
            if (data.status == 1) {
                $('#ajax_result1').html('<div class="alert alert-success">' + data.message + '</div>');
                location.reload(true);
            } else {
                $('#ajax_result1').html('<div class="alert alert-danger">' + data.message + '</div>');
            }

            return;
        },
        error: function () {
            $.isLoading( "hide" );
            $('#ajax_result1').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            return;
        }
    });

}

function loadForm() {
    if ($('#ch1').is(':checked')) {
        $('#applet_form').show('slow');
    } else {
        $('#applet_form').hide('slow');
    }
}

function getJobFile() {

}


function search() {
    var fd = $('#forms').serialize();
    $('#ajax_result1').empty();
    $('#ajax_result').html("");
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_subject_get',
        data: fd,
        dataType: 'json',
        beforeSend: function () {
            $.isLoading({ text: "Поиск администраторов отчетности по выбранным критериям поиска..." });
        },
        success: function (data) {
            $.isLoading( "hide" );
            if (data.status == 1)
            {
                $('#ajax_result').html(data.message);
            }
            else
            {
                $('#ajax_result').html('<div class="alert alert-danger">'+data.message+'</div>');
            }
        },
        error: function () {
            $.isLoading( "hide" );
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
        }
    });
}

function setNewStatus(id) {
    var form = $('#' + id).serialize();
    $('#errors').hide();
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_changeStatus',
        data: form,
        dataType: 'json',
        beforeSend: function () {
            $.isLoading({ text: "Процесс обновления заявки..." });
        },

        success: function (data) {
            $.isLoading( "hide" );
            if (data.status == 1) {
                window.location.reload();
            } else {
                $('#errors').empty();
                $('#errors').html(data.message);
                $('#errors').show();
            }

            return;
        },
        error: function () {
            $.isLoading( "hide" );
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            return;
        }
    });
}

function setNewLevel(level, id_record) {
    $('#errors').hide();
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_changeLevel',
        data: { level: level, id_record:id_record },
        dataType: 'json',
        beforeSend: function () {
            $.isLoading({ text: "Процесс обновления заявки..." });
        },
        success: function (data) {
            $.isLoading( "hide" );
            if (data.status == 1) {
                window.location.reload();
            } else {
                $('#errors').empty();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            return;
        },
        error: function () {
            $.isLoading( "hide" );
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            return;
        }
    });
}

function showConfirm(id_status, id_record) {
    $('.id_status').val(id_status);
    $('.id_record').val(id_record);
    $('.ajax_result1').empty();
    return false;
}

function save_attributes_organ() {
    var form = $('#attributes_organ').serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: site_url() + 'ajax_save_attributes_organ',
        data: form,
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                $('#ajax_result').empty();
                $('#ajax_result').html('<div class="alert alert-success">' + data.message + '</div>');
            } else if (data.status == 2) {
                $('#ajax_result').empty();
                $('#ajax_result').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
            return;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#ajax_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, ' + errorThrown + '</div>');
            return;
        }
    });
}

$(function () {

    $(document).on('change', '.selectBudgetType', function ()
    {
        var admin_id = parseInt($(this).val());

        if (admin_id <= 0)
        {
            $('.budget_type').html('');
            $('.select_level').html('');
            return;
        }

        $('#errors').hide();

        $.ajax({
            type: "POST",
            url: site_url() + 'ajax_subject_budget_type',
            data: {admin_id: admin_id},
            dataType: 'json',
            beforeSend: function () {
                $.isLoading({ text: "Поиск типов бюджета у выбранного администратора отчетности..." });
            },
            success: function (data) {
                $.isLoading( "hide" );
                if (data.status == 1)
                {
                    $('.budget_type').html(data.message);
                }
                else
                {
                    $('#errors').html(data.message);
                }
            },
            error: function () {
                $.isLoading( "hide" );
                $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
                $('#errors').show();
            }
        });
    });


    $(document).on('change', '.selectLevel', function ()
    {
        var admin_id = parseInt($('.dropdown-report-admin').val());
        var budget_type = parseInt($(this).val());

        if (budget_type <= 0)
        {
            $('.select_level').html('');
            return;
        }

        $('#errors').hide();

        $.ajax({
            type: "POST",
            url: site_url() + 'ajax_subject_select_level',
            data: {admin_id: admin_id, budget_type: budget_type},
            dataType: 'json',
            beforeSend: function () {
                $.isLoading({ text: "Поиск доступных уровней..." });
            },
            success: function (data) {
                $.isLoading( "hide" );
                if (data.status == 1)
                {
                    $('.select_level').html(data.message);
                }
                else
                {
                    $('#errors').html(data.message);
                }
            },
            error: function () {
                $.isLoading( "hide" );
                $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
                $('#errors').show();
            }
        });
    });

    $(document).on('click', '.refresh', function () {
        var license_id = $(this).attr('data-lic-id');
        var request_id = $(this).attr('data-req-id');
        $('#errors').hide();
        $.ajax({
            type: "POST",
            async: false,
            cache: false,
            url: site_url() + 'ajax_refresh_license',
            data: {license_id: license_id,request_id:request_id},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    window.location.reload();
                }else{
                    $('#errors').html(data.message);
                    $('#errors').show();
                }
            },
            error: function () {
                $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
                $('#errors').show();
            }
        });
    });

    $(document).on('click', '.refresh_permit', function () {
        var permit_id = $(this).attr('data-permit-id');
        var request_id = $(this).attr('data-req-id');
        $('#errors').hide();
        $.ajax({
            type: "POST",
            async: false,
            cache: false,
            url: site_url() + 'ajax_refresh_permit',
            data: {permit_id: permit_id,request_id:request_id},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    window.location.reload();
                }else{
                    $('#errors').html(data.message);
                    $('#errors').show();
                }
            },
            error: function () {
                $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
                $('#errors').show();
            }
        });
    });


    $(document).on('change', '#request_type', function () {
        var value = parseInt($(this).val());
        var type = $('#document_type').val();
        $('#errors').hide();
        $('#date_issue').hide();
        if (value == 2 && type == 'permit') {
            $('#date_issue').show();
            $('#request_text').attr('readonly', false);
            $('#request_text').val('');
        }
    });

    $('#create-disable-request').click(function () {
        $.ajax({
            type: "POST",
            async: false,
            cache: false,
            url: site_url() + 'ajax_save_disable_request',
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    window.location.href = site_url() + 'edit_disable_request/' + data.id;
                }else{
                    $('#ajax-result-create').html('<div class="alert alert-danger">' + data.message + '</div>');
                    $('#ajax-result-create').show();
                }
            },
            error: function () {
                $('#ajax-result-create').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                $('#ajax-result-create').show();
            }
        });
    });
});

function closeAnticorruption() {
    // Hide the block
    $("#anticorruption").hide();

    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_close_anticorrupt_text',
        dataType: 'json'
    });

}

const request_update_classification = function (object) {
    let $btn = $(object).button('loading');
    $.ajax({
        type: "POST",
        url: window.current_controller_url + '/ajax_update_classification',
        dataType: 'json',
        success: function (response)
        {
            if (response.status == 1)
            {
                $('.classification').prop('checked', false);
                let checkbox = $('#' + response.classification_code)
                if (checkbox.length) {
                    checkbox.prop('checked', true);
                }
                $('#result_msg').html('<div class="alert alert-success">' + response.message + '</div>');
                $btn.button('reset');
            }
            else
            {
                $('#result_msg').html('<div class="alert alert-danger">' + response.message + '</div>');
                $btn.button('reset');
            }
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
        }
    });
    return false;
}
