/**
 * Created by zhek on 21.06.2014.
 */

function site_url(method) {
    return window.current_controller_url + "/" + method;
}

$(function () {

    $('#loading-example-btn').click(function () {

        var btn = $(this);
        btn.button('loading');

        $('#ajax_load_result').empty();

        $.ajax({
            type: "POST",
            dataType: "json",
            url: '/bills/ajax_load_bills',
            data: {tax_payer_type: $('#tax_payer_type').val()},
            success: function (response) {
                if(response.status == 'error'){
                    $('#ajax_load_result').html('<div class="alert alert-danger" role="alert">' + response.message + '</div>');
                }else{
                    $('#ajax_load_result').html('<div class="alert alert-success" role="alert">' + response.message + '</div>');
                    window.location.reload();
                }
                btn.button('reset');
            },
            error: function () {
                $('#ajax_load_result').html('<div class="alert alert-danger" role="alert">Ошибка обратитесь в техническую поддержку</div>');
                btn.button('reset');
            }
        });
    });

    $('input.select-one').change(function (e, a) {

        var parent = this;

        $('input.select-one').each(function (i, element) {
            if (element.id != parent.id) {
                $(element).prop('checked', false);
                $(element).parent().parent().removeClass('active');
            }

        });

        var state = $(this).prop('checked');

        if (state) {
            $(this).parent().parent().addClass('active');
        } else {
            $(this).parent().parent().removeClass('active');
        }

        var bills = $('#bills-form').serializeArray();

        $.post('/bills/ajax/?method=make_default', {bills: bills}, function (json) {
        });

    });

    $('input.select-garant').change(function (e, a) {

        var parent = this;

        $('input.select-garant').each(function (i, element) {
            if (element.id != parent.id) {
                $(element).prop('checked', false);
                $(element).parent().parent().removeClass('active');
            }

        });

        var state = $(this).prop('checked');

        if (state) {
            $(this).parent().parent().addClass('active');
        } else {
            $(this).parent().parent().removeClass('active');
        }

        var bills = $('#bills-form').serializeArray();

        $.post('/bills/ajax/?method=make_garant', {billsg: bills}, function (json) {
        });

    });

});

function showRefBank() {
    $('#bankNameInfo').load(site_url( + 'ajax_load_banks'), function () {
        $('#bankNameModal').modal({show: true, backdrop: 'static'});
    });
}

function addBank() {

}