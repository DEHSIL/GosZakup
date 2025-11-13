(function ($) {
    jQuery.fn.katoSelectModal = function (settings) {
        var container = this;
        //опции
        var settings = $.extend({
            url_load: "ajax_load_kato", //метод который загружает окно 
            title_modal: "Выбор КАТО",
            complete: function () {
            } //callback функция, возвращает данные при выборе банка

        }, settings);

        //встраиваем код модального окна в страницу
        $('<div id="katoSelectModal" class="modal fade" tabindex="-1" role="dialog">\n\
            <div class="modal-dialog">\n\
                <div class="modal-content">\n\
                    <div class="modal-header">\n\
                        <button type="button" class="close" data-dismiss="modal">×</button>\n\
                        <h4>' + settings.title_modal + '</h4>\n\
                    </div>\n\
                    <div class="modal-body" id="katoSelectInfo"></div>\n\
                    <div class="modal-footer">\n\
                        <button class="btn btn-primary btn-sm" id="btn-add-kato" data-dismiss="modal">Выбрать</button>\n\
                        <button class="btn btn-default btn-sm" data-dismiss="modal">Закрыть без выбора</button>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
           </div>').appendTo('body');

        //инициализация
        return container.each(function () {
            container.click(loadModalKato);
        });

        function site_url(url) {
            return window.current_controller_url + "/" + url;
        }

        //отображение всплывающего окна
        function loadModalKato() {
            $('#katoSelectInfo').load(site_url(settings.url_load), function () {
                $('#katoSelectModal').modal({show: true, backdrop: 'static'});
                $(document).off('change', 'select.kato');
                $(document).on('change', 'select.kato', function () {

                    var parent = this;

                    var level = parseInt($(this).attr('data-level')) + 1;
                    var te = $(this).val();

                    // Remove next elements
                    $('select.region').each(function () {
                        if (parseInt($(this).attr('data-level')) >= level) {
                            $(this).remove();
                        }
                    });

                    // Clear
                    $('#kato_placeholder').addClass('hidden');
                    $('#supply_address').val('');

                    $.getJSON(site_url(settings.url_load), {level: level, te: te}, function (response) {
                        if (response.length > 0) {
                            // Create new list
                            var dropDownList = $("<select />").attr('id', 'kato_' + level).attr('name', 'ref_kato_' + level).attr('class', 'form-control kato region live').attr('data-level', level);

                            // Insert empty option
                            $("<option />", {value: 0, text: '---'}).appendTo(dropDownList);

                            $.each(response, function (i, item) {
                                // Append elements
                                $("<option />", {value: item.te, text: item.name}).appendTo(dropDownList);
                            });

                            $(dropDownList).appendTo('#kato_select');
                            return false;
                        } else {

                            var address = '';

                            $('select.region').each(function () {
                                address += $('option:selected', this).text() + ', ';
                            });

                            $('#supply_address').focus().val('').val(address);
                            $('#kato_placeholder').removeClass('hidden');
                            $('#ref_kato_te').val(parent.value);

                            $('#remove-kato-button').removeAttr('disabled');
                            $('#btn-add-place').attr('disabled', false);
                            return false;
                        }
                    });
                });
                $(document).on('click', '#btn-add-kato', selectKato)
            });
            return false;
        }
        
        //выбор като и адреса
        function selectKato()
        {
            var ref_kato_te = $('#ref_kato_te').val();
            var supply_address = $('#supply_address').val();

            retObject = {};
            retObject.ref_kato_te = ref_kato_te;
            retObject.supply_address = supply_address;

            if ($.isFunction(settings.complete)) {
                settings.complete.call(this, retObject);
            }
        }


    }
})(jQuery);


