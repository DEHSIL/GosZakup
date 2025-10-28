(function ($) {
    jQuery.fn.banksAddModal = function (settings) {
        var container = this;
        //опции
        var settings = $.extend({
            url_load: "ajax_load_banks", //метод который загружает окно      
            complete: function () {
            } //callback функция, возвращает данные при выборе банка

        }, settings);

        //встраиваем код модального окна в страницу
        $('<div id="bankNameAddModal" class="modal fade" tabindex="-1" role="dialog">\n\
            <div class="modal-dialog">\n\
                <div class="modal-content">\n\
                    <div class="modal-header">\n\
                        <button type="button" class="close" data-dismiss="modal">×</button>\n\
                        <h4>Добавление банка</h4>\n\
                    </div>\n\
                    <div class="modal-body" id="bankNameAddInfo"></div>\n\
                    <div class="modal-footer">\n\
                        <button class="btn btn-success btn-sm" id="_send_new_bank" style="display:none;">Отправить на утверждение</button>\n\
                        <button class="btn btn-default btn-sm" data-dismiss="modal">Закрыть</button>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
           </div>').appendTo('body');

        //инициализация
        return container.each(function () {
            container.click(loadModalBank);
        });

        //отображение всплывающего окна
        function loadModalBank() {
            $('#bankNameAddInfo').load(window.current_controller_url + '/' + settings.url_load, function () {
                $('#bankNameAddModal').modal({show: true, backdrop: 'static'});
                $('#_send_new_bank').show();
                $(document).on('click', '#_send_new_bank', send_new_bank);
            });
            return false;
        }

        function send_new_bank() {
            var data_post = $('#form_add_new_bank_set').serialize();
            $.ajax({
                type: "POST",
                async: false,
                cache: false,
                url: window.current_controller_url + '/' + settings.url_load,
                data: data_post,
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        $('#ajax_send_bank_result').html('<div class="alert alert-success">' + data.message + '</div>');
                        $('#form_add_new_bank_set').remove();
                        $('#_send_new_bank').hide();
                        return;
                    }
                    else if (data.status == 2)
                    {
                        $('#ajax_send_bank_result').html('<div class="alert alert-danger">' + data.message + '</div>');
                        return;
                    }
                },
                error: function () {
                    $('#ajax_send_bank_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                    return;
                }
            });
        }

    }
})(jQuery);


