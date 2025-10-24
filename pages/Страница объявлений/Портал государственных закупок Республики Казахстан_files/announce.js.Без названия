function site_url() {
    var lang = 'ru';
    var url = window.location.href.split('/');
    var http = location.protocol;
    var hostname = window.location.hostname;

    switch (url[3]) {
        case 'kz':
        case 'en':
            lang = url[3];
            break;
        default:
            lang = 'ru';
            break;
    }

    return http + '//' + hostname + '/' + lang + '/announce/';
}

function show_court_info(selector) {
    var court = $(selector).data("court");
    var element = $(selector).data("element");
    var id_anno = $(selector).data("announce");
    $('#ajax_result_court').empty();
    $('.infoCourt').empty();
    $.ajax({
        type: "POST",
        async: true,
        cache: false,
        url: site_url() + 'ajax_show_court_info/' + id_anno,
        data: {idCourt: court},
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                $('#' + element + '' + court).html(data.html);
            } else if (data.status == 2) {
                $('#ajax_result_court').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
        },
        error: function () {
            $('#ajax_result_court').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            return;
        }
    });
}

$(document).ready(function () {
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

    var url_con = http + '//' + hostname + '/' + lang + '/consideration/';
    var announce_id = url[6];
    $('#protocol_preliminary_admission').click(function () {
        $.ajax({
            type: "POST",
            async: false,
            cache: false,
            url: url_con + 'actionCreateProtPret/' + announce_id,
            dataType: 'json',
            beforeSend: function () {
                $('#errors').hide();
            },
            success: function (data) {
                if (data.status == 1) {
                    location.reload(true);
                }
                else {
                    $('#errors').html(data.message);
                    $('#errors').show();
                }
            },
            error: function () {
                $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
                $('#errors').show();
            }
        });
        return false;
    });

    $('#generatePD').click(function () {
        generate_pd(announce_id);
    });

    $('#generatePI').click(function () {
        ajaxGeneratePI(announce_id);
    });
});

function ajax_set_sign_pi_apartment(idAnno) {
    var formData = $('#sign_pi_apartment').serialize();
    $.ajax({
        type: "POST",
        async: true,
        cache: false,
        url: '/' + window.lang_key + '/announce/ajax_set_sign_pi_apartment/' + idAnno,
        data: formData,
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                location.reload(true);
            } else if (data.status == 2) {
                $('#result_sign_pi_apartment').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
        },
        error: function () {
            $('#result_sign_pi_apartment').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            return;
        }
    });
}

function ajax_setSignPod(idAnno) {
    var formData = $('#setSignPod').serialize();
    $.ajax({
        type: "POST",
        async: true,
        cache: false,
        url: site_url() + 'ajax_setSignPod/' + idAnno,
        data: formData,
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                location.reload(true);
            } else if (data.status == 2) {
                $('#formPodSignResult').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
        },
        error: function () {
            $('#formPodSignResult').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
            return;
        }
    });
}

function generate_pd(announce_id) {
    $('#errorsPD').hide();
    $('#btnGeneratePD').hide();
    $('#proccessPD').show();
    $.ajax({
        type: "POST",
        url: site_url() + 'ajax_generate_pd/' + announce_id,
        dataType: 'json',
        data: {generate: 'Y'},
        success: function (data) {
            if (data.status == 1) {
                location.reload(true);
            }
            else {
                $('#errors').html(data.message);
                $('#errors').show();
            }
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
        }
    });
    return false;
}

function ajaxGeneratePI(annoId) {
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: site_url() + 'ajax_generate_pi/' + annoId,
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                location.reload(true);
            }
            else {
                $('#errors').html(data.message);
                $('#errors').show();
            }
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
        }
    });
    return false;
}

function save_audition(id, btn)
{
    var form = $("#audition_form");
    var action = $(btn).data('action');
    $(btn).button('loading');

    if (action == 'action_save_audition') {
        if (typeof (form_sign_helper) != "undefined") {
            var check_files_status = form_sign_helper.check_statuses();
            if (check_files_status != null) {
                if (check_files_status != true) {
                    return;
                }
            }
            form_sign_helper.generate_input(form);
        }
    }

    form.append('<input type="hidden" name="action" value="' + action + '">');
    var form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: site_url() + 'ajax_audition/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                location.reload(true);
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function message_audition(id, btn)
{
    let form = $("#audition_message");
    let action = $(btn).data('action');
    $(btn).button('loading');
    if (typeof (form_sign_helper) != "undefined") {
        let check_files_status = form_sign_helper.check_statuses();
        if (check_files_status != null) {
            if (check_files_status != true) {
                return;
            }
        }
        form_sign_helper.generate_input(form);
    }
    form.append('<input type="hidden" name="action" value="' + action + '">');
    let form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                window.location.href = data.url;
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function save_decide(id, btn)
{
    let form = $("#audition_decide");
    let action = $(btn).data('action');
    $(btn).button('loading');
    form.append('<input type="hidden" name="action" value="' + action + '">');
    let form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                location.reload(true);
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function decide_all(id, btn)
{
    save_decide(id, btn);
}

function save_protocol_file(id, btn)
{
    let form = $("#protocol");
    let action = $(btn).data('action');
    $(btn).button('loading');
    form.append('<input type="hidden" name="action" value="' + action + '">');

    if (typeof (form_sign_helper) != "undefined") {
        let check_files_status = form_sign_helper.check_statuses();
        if (check_files_status != null) {
            if (check_files_status != true) {
                return;
            }
        }
        form_sign_helper.generate_input(form);
    }

    var form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition_pdd/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                location.reload(true);
            }
            else {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function message_audition_pdd(id, btn)
{
    let form = $("#audition_message");
    let action = $(btn).data('action');
    $(btn).button('loading');
    form.append('<input type="hidden" name="action" value="' + action + '">');
    var form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition_pdd/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                window.location.href = '/ru/announce/index/' + id + '?tab=project_audit_ppd';
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function publish_protocol_audition(id, btn)
{
    let form = $("#audition_publish");
    if (typeof (form_sign_helper) != "undefined") {
        var check_files_status = form_sign_helper.check_statuses();
        if (check_files_status != null) {
            if (check_files_status != true) {
                alert('Дождитесь проверки файла');
                return;
            }
        }
        form_sign_helper.generate_input(form);
    }

    let action = $(btn).data('action');
    $(btn).button('loading');
    form.append('<input type="hidden" name="action" value="' + action + '">');
    var form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition_pdd/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                window.location.href = '/ru/announce/index/' + id + '?tab=project_audit_ppd';
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function delete_protocol_audition(id, btn)
{
    let form = $("#delete_protocol");
    let action = $(btn).data('action');
    $(btn).button('loading');
    form.append('<input type="hidden" name="action" value="' + action + '">');
    var form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition_pdd/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                window.location.href = '/ru/announce/index/' + id + '?tab=project_audit_ppd';
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}

function protocol_audition_sign(id, btn)
{
    let form = $('#prot_audition_sign');
    form_sign_helper.generate_input(form);
    let action = $(btn).data('action');
    $(btn).button('loading');
    form.append('<input type="hidden" name="action" value="' + action + '">');
    var form_data = form.serialize();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: window.current_controller_url + '/ajax_audition_pdd/' + id,
        data: form_data,
        dataType: 'json',
        success: function (data)
        {
            if (data.status == 1)
            {
                window.location.href = '/ru/announce/index/' + id + '?tab=project_audit_ppd';
            }
            else
            {
                $('#success').hide();
                $('#errors').html(data.message);
                $('#errors').show();
            }
            $(btn).button('reset');
        },
        error: function () {
            $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
            $('#errors').show();
            $(btn).button('reset');
            return;
        }
    });
    return false;
}