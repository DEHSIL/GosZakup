(function ($) {
    jQuery.fn.banksSearchModal = function (settings) {

        var container = this;
        //опции
        var settings = $.extend({
            btnAddBank: false,
            urlSendNewBank: "ajax_send_new_bank",
            url_load: "ajax_load_banks", //
            //element_load: "#bankNameInfo",
            //modal_name: "#bankNameModal", //id модального окна
            //element_show_return: "#bank_name",
            //element_hidden_return: "#ref_banks_id", //в какой элемент на странице вернуть данные
            element_search: "#bank_search", //кнопка поиска
            element_reset: "#bank_search_reset", //кнопка сброса
            element_select: ".select_bank", //элемент, при клике на который, выбираются значения            
            complete: function () {
            } //callback функция, возвращает данные при выборе банка

        }, settings);

        //встраиваем код модального окна в страницу
        $('<div id="bankNameModal" class="modal fade" tabindex="-1" role="dialog">\n\
            <div class="modal-dialog" style="width:80%;">\n\
                <div class="modal-content">\n\
                    <div class="modal-header">\n\
                        <button type="button" class="close" data-dismiss="modal">×</button>\n\
                        <h4>Поиск банков</h4>\n\
                    </div>\n\
                    <div class="modal-body" id="bankNameInfo"></div>\n\
                    <div class="modal-footer"><button class="btn btn-default btn-sm" data-dismiss="modal">Закрыть</button></div>\n\
                </div>\n\
            </div>\n\
           </div>').appendTo('body');

        //инициализация
        return container.each(function () {
            container.click(loadModalBank);
        });

        //отображение всплывающего окна
        function loadModalBank() {
            $('#bankNameInfo').load(window.current_controller_url + '/' + settings.url_load, function () {
                $('#bankNameModal').modal({show: true, backdrop: 'static'});
                $(document).on('click', settings.element_select, select_bank);
                $(document).on('click', settings.element_search, bank_search);
                $(document).on('click', settings.element_reset, bank_search_reset);
                if (settings.btnAddBank)
                {
                    $('#btnAddBank').show();
                    $('#btnAddBank').banksAddModal({
                        url_load: settings.urlSendNewBank,
                    });
                }
                else
                {
                    $('#btnAddBank').hide();
                }
            });

            return false;
        }

        //выбор банка
        function select_bank()
        {
            var bank_name = $(this).data('bank-name');
            var bank_id = $(this).data('bank-id');
            var bank_bik = $(this).data('bank-bik');
            var bank_rezident = $(this).data('bank-rezident');

            retObject = {};
            retObject.bank_name = bank_name;
            retObject.bank_id = bank_id;
            retObject.bank_bik = bank_bik;
            retObject.bank_rezident= bank_rezident;

            if ($.isFunction(settings.complete)) {
                $.ajax({
                    type: "POST",
                    url: window.current_controller_url + '/ajax_kbe',
                    data: {bik_id:bank_id},
                    success: function (response) {
                        $( '.kbe_data' ).html('');

                        $.each(response, function( index, value ) {
                            $( '.kbe_data' ).append( '<option value="' + value.code + '">' + value.code + ' - ' + value.name + '</option>' );
                        });
                    },
                    error: function () {
                        $('#ajax_search_bank_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                        return;
                    }
                });
                settings.complete.call(this, retObject);
            }
            $('#bankNameModal').modal('hide');
        }

        //поиск банков
        function bank_search() {
            var data_get = $('#search_form_bank_set').serialize();
            $.ajax({
                type: "GET",
                async: false,
                cache: false,
                url: window.current_controller_url + '/' + settings.url_load,
                data: data_get,
                beforeSend: function () {
                    $('#spanimg_bank').html('<div class="alert alert-info" role="alert">Подождите, идет загрузка!</div>');
                },
                success: function (html) {
                    $('#bank_data_render').empty();
                    $('#bank_data_render').html(html);
                },
                complete: function () {
                    $('#spanimg_bank').empty();
                },
                error: function () {
                    $('#ajax_search_bank_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                    return;
                }
            });
        }

        //сброс поиска
        function bank_search_reset() {
            $.ajax({
                type: "GET",
                async: false,
                cache: false,
                url: window.current_controller_url + '/' + settings.url_load,
                data: {name_bank: ''},
                beforeSend: function () {
                    $('#spanimg_bank').html('<div class="alert alert-info" role="alert">Подождите, идет загрузка!</div>');
                },
                success: function (html) {
                    $('#name_bank').val('');
                    $('#code_bank').val('');
                    $('#kato_bank').val('');
                    $('#address_bank').val('');
                    $('#bank_data_render').empty();
                    $('#bank_data_render').html(html);
                },
                complete: function () {
                    $('#spanimg_bank').empty();
                },
                error: function () {
                    $('#ajax_search_bank_result').html('<div class="alert alert-danger">Ошибка выполнения запроса, попробуйте позже</div>');
                    return;
                }
            });
        }
    };
})(jQuery);


