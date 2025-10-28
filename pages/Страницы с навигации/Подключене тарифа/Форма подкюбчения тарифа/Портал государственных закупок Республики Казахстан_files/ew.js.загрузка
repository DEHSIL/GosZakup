$(function () {

    var lang = 'ru';
    var url;
    var dir;
    var controller;
    var method;

    function get_site_url() {
        url = window.location.href.split('/');
        dir = url[4];
        controller = url[5];
        method = url[6];

        switch (url[3]) {
            case 'kz':
                lang = url[3];
                break;
            case 'en':
                lang = url[3];
                break;
            default:
                lang = 'ru';
                break;
        }
    }

    get_site_url();

    $('.create_electronic_wallet').on('click', function () {

        $.ajax({
            type: "POST",
            url: '/' + lang + '/' + dir + '/paid_services/ajax_create_electronic_wallet/',
            dataType: 'json',
            data: {create: 'ok'},
            beforeSend: function ()
            {
                hide_errors();
                $.isLoading({text: "Идет процесс создания электронного кошелька"});
            },
            success: function (responseData) {

                if (responseData.status == 0) {
                    show_errors(responseData.message);
                }
                else {
                    window.location.reload();
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


    function hide_errors()
    {
        $('#ew_error_msg').html("");
        $('#ew_error_msg').hide();
    }

    function show_errors(error_msg)
    {
        $('#ew_error_msg').html(error_msg);
        $('#ew_error_msg').show();
    }

});