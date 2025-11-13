/**
 * Created by kirk on 26.08.2015.
 */
$(function(){
    var lang = 'ru';
    var url;
    var controller;
    var method;
    var anno_id;
    var app_id;

    function scrollTop(){
        $('html, body').animate({ scrollTop: 0 }, 600);
    }

    function get_site_url()
    {
        url = window.location.href.split('/');
        controller = 'myapp';
        method = url[5];
        app_id = url[7];

        switch (url[3]) {
            case 'kz':
                lang = url[3];
                break;
            case 'en':
                lang = url[3];
                break
            default:
                lang = 'ru';
                break;
        }
    }

    get_site_url();
    $('.additional_app').on('click',function(){
        app_id = $(this).attr('data-app-id');
        $('#modal-additional-app-id').html(app_id);
        $('.modal-additional_app').modal('show');
       return false;
    });

    $('#confirm_additional').on('click',function(){
        $.ajax({

            type: "POST",
            url: '/' + lang + '/' + controller + '/actionAjaxAdditionalApp/',
            data: {application_id: app_id},
            beforeSend: function ()
            {
                 $('#confirm_additional').hide();
                 $('#proccess_add_app').show();
            },
            success: function (data)
            {
                data = $.parseJSON(data);
                if (data.status == 0)
                {
                    $('#errors').html(data.message);
                    $('#errors').show();
                    $('#proccess_add_app').hide();
                    $('#confirm_additional').show();
                    $('.modal-additional_app').modal('hide');
                    scrollTop();
                }
                else if(data.status == 1)
                {
                    window.location.replace('/'+lang+'/application/docs/'+data.announce_id+'/'+data.application_id);
                }
            },
            error: function () {
                $('#errors').html('Ошибка выполнения запроса, попробуйте позже');
                $('#errors').show();
                $('#proccess_add_app').hide();
                $('#confirm_additional').show();
                $('.modal-additional_app').modal('hide');
                scrollTop();

            }
        });

        return false;
    });
});