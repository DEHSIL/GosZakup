/**
 * Created by sapa on 15.06.2015.
 * Зависит от файла www\js\contract\tls.js
 */
function site_url(myurl) {
    return window.current_controller_url + "/" + myurl;
}
// здесь pid - contract_project.id
function change_data_project(project_id,alias,lang)
{
    $.ajax({
        type: 'POST',
        url: site_url('ajax_project_edit_item'),
        data: {project_id: project_id, alias:alias, lang:lang},
        async: false,
        cache: false,
        success: function(data,status){
            $('#editformresult').html(data);
            $('#editform').show();
            if(alias == 'end_date'){
                $('#pr_item_data_ru').datetimepicker({
                    useCurrent: true, //when true, picker will set the value to the current date/time
                    language: 'ru'
                });
            }
        },
        error: function(){
            alert('Ошибка сервера');
        }
    });
}
// pid - trd_buy.id
function approve_contract_project(pid){
    $('#loading').show();
    $('#ctpl_manager').hide();
    $('#contract_approve_btn a').attr('disabled',true);
    $('#message').html('<div class="alert alert-info">Подождите идет обработка данных</div>');
    $.ajax({
        type: 'POST',
        url: site_url('approve_contract_project'),
        data: {pid: pid, a:1},
        dataType: 'json',
        success: function(data,status){
            if(data.status == 1){
                document.location.href = site_url('contract_project/' + pid);
            } else {
                $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
        },
        error: function(){
            alert('Ошибка сервера');
        }
    });
    $('#contract_approve_btn a').attr('disabled',false);
    $('#ctpl_manager').show();
}

function change_agr_form(project_id, agr_form) {
    $.ajax({
        type: 'POST',
        url: site_url('change_agr_form/'+project_id),
        data: { agr_form: agr_form},
        dataType: 'json',
        success: function(data,status){
            if(data.status == 1){
                document.location.href = site_url('contract_project/' + project_id);
            } else {
                //$('#ajax_result').html('<div class="alert alert-danger">' + data.message + '</div>');
                alert('Ошибка : ' + data.message);
            }
        },
        error: function(){
            alert('Ошибка сервера');
        }
    });
}

function contract_project_file_save(project_id) {
    var formProtPredSign = $('#contract_file_upload form.form_upload');
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
    //var signature = formProtPredSign.children().children('[name="signature"]').val();
    var file_id = formProtPredSign.children('[name="userfile[0][]"]').val();

    $.ajax({
        type: 'POST',
        url: site_url('contract_project_file_save'),
        data: {project_id: project_id, file_id : file_id},
        dataType: 'json',
        success: function(data,status){
            if(data.status == 1) {
                $('#ajax_result').html('<div class="alert alert-success">' + data.message + '</div>');
                document.location.href = site_url('contract_project/' + project_id);
            } else {
                alert('Ошибка : ' + data.message);
            }
        },
        error: function(){
            alert('Ошибка сервера 1');
        }
    });
}

function contract_project_file_del(project_id) {

    $.ajax({
        type: 'POST',
        url: site_url('contract_project_file_del'),
        data: {project_id: project_id },
        dataType: 'json',
        success: function(data,status){
            if(data.status == 1) {
                $('#ajax_result').html('<div class="alert alert-success">' + data.message + '</div>');
                document.location.href = site_url('contract_project/' + project_id);
            } else {
                $('#ajax_result').html('<div class="alert alert-danger">' + data.message + '</div>');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handle_err2(jqXHR, textStatus, errorThrown, $('#ajax_result'));
        }
    });
}

function handle_err2(jqXHR, textStatus, errorThrown, mes_obj)
{
    var msg = 'Ошибка выполнения запроса.';
    msg += '\nstatus:' + textStatus;
    msg += '\nerror:' + errorThrown;
    // msg += '\nreadyState:' + jqXHR.readyState;
    if (jqXHR.status != 200) msg += '\nstatus:' + jqXHR.status + ' ' + jqXHR.statusText;
    //msg += '\nHeaders:' + jqXHR.getAllResponseHeaders();
    msg += '\nresponse:' + jqXHR.responseText;
    var h = msg.replace(/\n/g, '<br>');

    if (mes_obj.size() != 0) {
        mes_obj.html('<div class="alert alert-danger">' + msg + '</div>');
    } else {
        alert('Ошибка сервера 2' + h);
    }
}

function cancel_contract_project(pid)
{
    var res_obj = $('#ajax_result')
    $.ajax({
        type: 'POST',
        url: site_url('approve_contract_project'),
        data: {pid: pid, a:0},
        dataType: 'json',
        success: function(data,status){
            if(data.status == 1){
                document.location.href = site_url('contract_project/' + pid);
            } else {
                res_obj.html('<div class="alert alert-danger">' + data.message + '</div>');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handle_err2(jqXHR, textStatus, errorThrown, res_obj);
        }
    });
}

function save_contract_project_usertpl(pid)
{
    doAjaxJson(site_url('save_contract_project_user_template'),'ajax_result_top',{pid: pid},true);
}

function set_user_template(pid,tpl)
{
    if(tpl>0) {
        doAjaxJson(site_url('set_contract_project_user_template'),'ajax_result_top',{pid: pid, tpl: tpl},true);
    } else {
        alert('Нужно выбрать шаблон');
    }
}
// срабатывает при выборе в селекте изменяет сам идентификатор шаблона
function set_template(pid,tpl){
    if(tpl>0) {
        doAjaxJson(site_url('set_contract_project_template'),'ajax_result_top',{pid: pid, tpl: tpl},true);
    } else {
        alert('Нужно выбрать шаблон');
    }
}

function delete_contract_project_usertpl(pid,tpl)
{
    if(tpl>0) {
        doAjaxJson(site_url('delete_contract_project_user_template'),'ajax_result_top',{pid: pid, tpl: tpl},true);
    } else {
        alert('Нужно выбрать шаблон');
    }
}

function save_project_data(project_id,alias,lang)
{
    $.ajax({
        type: 'POST',
        url: site_url('ajax_project_save_item'),
        data: {project_id: project_id, alias:alias, lang:lang, value_kz:$('#pr_item_data_kz').val(), value_ru:$('#pr_item_data_ru').val()},
        success: function(data,status){
            close_change_data();
            $('#ajax_result').html(data);
        },
        error: function(){
            alert('Ошибка сервера');
        }
    });
}

function change_punkt_project(project_id,id,point,subpoint,subsubpoint,lang){
    $.ajax({
        type: 'POST',
        url: site_url('ajax_project_add_punkt'),
        data: {project_id: project_id, id:id, lang:lang, point:point, subpoint:subpoint, subsubpoint:subsubpoint},
        success: function(data,status){
            $('#editformresult').html(data);
            $('#editform').show();
        },
        error: function(jqXHR, textStatus, errorThrown){
            //alert('Ошибка сервера');
            handle_err2(jqXHR, textStatus, errorThrown)
        }
    });
}

function save_project_punkt_data(project_id,id,lang){
    if($('#pr_item_data_kz').val().length == 0 || $('#pr_item_data_ru').val().length == 0){
        alert('Заполните все поля');
        return false;
    }
    $.ajax({
        type: 'POST',
        url: site_url('ajax_project_save_punkt'),
        data: {project_id: project_id, id:id, lang:lang,point:$('#point').val(), subpoint:$('#subpoint').val(), subsubpoint:$('#subsubpoint').val(), value_kz:$('#pr_item_data_kz').val(), value_ru:$('#pr_item_data_ru').val()},
        success: function(data,status){
            close_change_data();
            $('#ajax_result').html(data);
        },
        error: function(){
            alert('Ошибка сервера');
        }
    });
}

function del_punkt_project(project_id,id,point,subpoint,subsubpoint,lang){
    $.ajax({
        type: 'POST',
        url: site_url('ajax_project_del_punkt'),
        data: {project_id: project_id, id:id, point:point, subpoint:subpoint, subsubpoint:subsubpoint, lang:lang},
        async: false,
        cache: false,
        success: function(data,status){
            $('#ajax_result').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            var msg = 'Ошибка выполнения запроса.';
            msg += '\nstatus:' + textStatus;
            msg += '\nerror:' + errorThrown;
            // msg += '\nreadyState:' + jqXHR.readyState;
            if (jqXHR.status != 200) msg += '\nstatus:' + jqXHR.status + ' ' + jqXHR.statusText;
            //msg += '\nHeaders:' + jqXHR.getAllResponseHeaders();
            msg += '\nresponse:' + jqXHR.responseText;
            alert(msg);
        }
    });
}

function close_change_data(){
    $('#editformresult').html('');
    $('#editform').hide();
}

function set_data(selctr, value){
    $(selctr).html(value);
}

function append_data(selctr, value){
    $(selctr).append(value);
}

function setpayterm(c){
    if(c == 0){
        $('#pr_item_data_kz').val('');
        $('#pr_item_data_ru').val('');
    } else if(c==1){
        $('#pr_item_data_ru').val('по факту');
        $('#pr_item_data_kz').val('іс жүзінде');
    } else if(c==2){
        $('#pr_item_data_ru').val('ежемесячно');
        $('#pr_item_data_kz').val('ай сайын');
    } else if(c==3){
        $('#pr_item_data_ru').val('ежеквартально');
        $('#pr_item_data_kz').val('тоқсан сайын');
    } else if(c==4){
        $('#pr_item_data_kz').val('');
        $('#pr_item_data_ru').val('');
    }
}

function additional_purchase_techspec(purch_id){
    $('#techspec_data').load(site_url('ajax_additional_purchase_techspec/' + purch_id), function (result) {
        $('#modalShowAdditionalTech').modal({show: true, backdrop: 'static'});
    });
}




