var get_tarriff_message = function (tariff_id) {
    var tariff = tarrif_data[tariff_id];
    return 'Выбранный тариф на сумму <strong>' + tariff.sum + '</strong> позволит Вам участвовать в рамках одной закупки либо заключить договор на сумму <strong>' + tariff.title + '</strong>.' +
    '<br><br> В случае осуществления заключения договора способом «Из одного источника путем прямого заключения договора» по подпункту 39) пункта 3 статьи 16 Закона о ГЗ c общественными объединениями инвалидов и (или) организаций, создаваемых общественными объединениями инвалидов, веб-портал ГЗ позволит согласовать, <strong>подписать договор поставщику без оплаты услуги (тарифа)</strong>.' +
    '<br><br> При участии в закупках способом «Закупка по государственному социальному заказу», веб-портал ГЗ позволит принять участие в закупках с лотами со 155 спецификой «Оплата услуг в рамках государственного социального заказа» поставщикам с <strong>минимальным тарифом 1 МРП</strong>.' +
    '<br><br><strong>Вы уверены в выбранном тарифе?</strong>' +
    '<br>После покупки тарифа, выбранный тариф будет действовать до конца <b style="color:red">' + tariff.end_date + 'г.</b> Для покупки тарифа на следующий год необходимо произвести оплату за тариф в следующем году.'
                    ;
}

$(function () {

    $(document).on('change', '.select_tariff_year', function() {

        var selectedYear = $(this).val();
        var currentYear = new Date().getFullYear();

        if (selectedYear != currentYear) {
            $('#confirm_tariff').hide();
            $('.warning_alert').show();
        }else {
            $('#confirm_tariff').show();
            $('.warning_alert').hide();
        }
    });

    $('#confirm_tariff').on('click', function () {
        var form = $('#form_select_tariff').serialize();
        var tariff_id = $('.select_tariff:checked').val();

        if (typeof tariff_id === "undefined") {
            show_errors("Не выбран тариф");
        } else {
            var message_text = get_tarriff_message(tariff_id);
 
            BootstrapDialog.show({
                message: message_text,
                type: BootstrapDialog.TYPE_DANGER,
                closable: false,
                title: 'Уважаемый пользователь!',
                buttons: [{
                    label: 'Да',
                    cssClass: 'btn-success',
                    action: function (dialogRef) {
                        dialogRef.close();
                        $.ajax({
                            type: "POST",
                            url: window.current_controller_url + '/ajax_confirm_tariff/',
                            dataType: 'json',
                            data: form,
                            beforeSend: function () {
                                hide_errors();
                                $.isLoading({text: "Идет проверка выбранного тарифа"});
                            },
                            success: function (responseData) {

                                if (responseData.status == 0) {
                                    show_errors(responseData.message);
                                } else {
                                    window.location.href = responseData.redirect_url;
                                }

                                $.isLoading("hide");
                            },
                            error: function () {
                                show_errors("Ошибка выполнения запроса");
                                $.isLoading("hide");
                            }
                        });
                    }
                }, {
                    label: 'Нет',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        }

        return false;
    });


    $('#agreement_conditions_check').on('click', function () {

        if ($(this).is(':checked')) {
            if ($("#approve_act").attr("disabled")) {
                $("#approve_act").removeAttr("disabled");
            }
        } else {
            $("#approve_act").attr("disabled", "disabled");
        }
    });


    $('#save_customer_approver').on('click', function () {
        var form = $('#form_customer_approver').serialize();
        $.ajax({

            type: "POST",
            url: window.current_controller_url + '/ajax_save_customer_approver_act/',
            dataType: 'json',
            data: form,
            beforeSend: function () {
                hide_errors();
                $.isLoading({text: "Идет сохранение утверждающего акта"});
            },
            success: function (responseData) {

                if (responseData.status == 0) {
                    show_errors(responseData.message);
                } else {
                    window.location.href = responseData.redirect_url;
                }

                $.isLoading("hide");
            },
            error: function () {
                show_errors("Ошибка выполнения запроса");
                $.isLoading("hide");
            }
        });

        return false;
    });


    //add_pay


    $('#add_pay').on('click', function () {
        var form = $('#form_customer_approver').serialize();

        var url = window.location.href.split('/');
        var first_segment = url[7];

        $.ajax({
            type: "POST",
            url: window.current_controller_url + '/add_pay/' + first_segment,
            dataType: 'json',
            data: form,
            beforeSend: function () {
                hide_errors();
                $.isLoading({text: "Идет процесс подтверждения оплаты услуги"});
            },
            success: function (responseData) {

                if (responseData.status == 0) {
                    show_errors(responseData.message);
                } else {
                    window.location.href = responseData.redirect_url;
                }

                $.isLoading("hide");
            },
            error: function () {
                show_errors("Ошибка выполнения запроса");
                $.isLoading("hide");
            }
        });

        return false;
    });

    function approveActAndPay(act_id) {
        $.ajax({
            type: "POST",
            url: window.current_controller_url + '/ajax_load_xml_content/',
            dataType: 'json',
            data: {act_id: act_id},
            beforeSend: function () {
                hide_errors();
                $.isLoading({text: "Идет утверждение акта"});
            },
            success: function (responseData) {

                if (responseData.status == 0) {
                    show_errors(responseData.message);
                } else {
                    var xml_ar = {};
                    xml_ar[act_id] = responseData.message;
                    var sign_ar = {};
                    var settings =
                        {
                            'text_ar': xml_ar,
                            'user_interaction': function () {
                                show_next_btn();
                            },
                            'data_signed_callback': function (result) {
                                sign_ar = result.items;
                                var agreement_conditions = 0;

                                if ($('#agreement_conditions_check').is(':checked')) {
                                    agreement_conditions = 1;
                                }

                                $('#savePriceResult').empty();
                                $.ajax({
                                    type: "POST",
                                    url: window.current_controller_url + '/ajax_approve_act/',
                                    data: {sign: sign_ar, act_id: act_id, agreement_conditions: agreement_conditions},
                                    dataType: 'json',
                                    success: function (responseData) {
                                        if (responseData.status == 0) {
                                            show_errors(responseData.message);
                                        } else {
                                            window.location.href = responseData.redirect_url;
                                        }

                                        $.isLoading("hide");
                                    },
                                    error: function () {
                                        show_errors("Ошибка выполнения запроса");
                                        $.isLoading("hide");
                                    }
                                });

                            }
                        };
                    form_sign_helper.sign_multitext(settings);
                }
            },
            error: function () {
                show_errors("Ошибка выполнения запроса");
                $.isLoading("hide");
            }
        });
    }

    $('#approve_act').on('click', function () {
        var act_id = $(this).data('act-id');
        var confirm = $('#approve_act').data('confirm');
        var tariff_id = $('#approve_act').data('tariff-id');

        if (typeof tariff_id === "undefined") {
            show_errors("Не выбран тариф");
        } else if (confirm === 'Y') {
            var message_text = get_tarriff_message(tariff_id);

            BootstrapDialog.show({
                message: message_text,
                type: BootstrapDialog.TYPE_DANGER,
                closable: false,
                title: 'Уважаемый пользователь!',
                buttons: [{
                    label: 'Да',
                    cssClass: 'btn-success',
                    action: function (dialogRef) {
                        dialogRef.close();
                        approveActAndPay(act_id);
                    }
                }, {
                    label: 'Нет',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        } else {
            approveActAndPay(act_id);
        }

        return false;
    });

    function hide_errors() {
        $('#error_msg').html("");
        $('#error_msg').hide();
    }

    function show_errors(error_msg) {
        $('#error_msg').html(error_msg);
        $('#error_msg').show();
        window.scrollTo(0, 0);
    }

});

function sign_contract() {
    var form = $('#contact_signature').serialize();
    var ajax_request_url = $('#ajax_request_url').val();

    $.ajax({
        type: "POST",
        url: ajax_request_url,
        dataType: 'json',
        data: form,
        beforeSend: function () {
            $('#error_msg').hide();
            $.isLoading({text: "Идет подписание договора"});
        },
        success: function (responseData) {
            if (responseData.status == 0) {
                $('#error_msg').html(responseData.message);
                $('#error_msg').show();
            } else {
                window.location.href = responseData.redirect_url;
            }

            $.isLoading("hide");
        },
        error: function () {
            $('#error_msg').html("Ошибка выполнения запроса");
            $('#error_msg').show();
            $.isLoading("hide");
        }
    });
}