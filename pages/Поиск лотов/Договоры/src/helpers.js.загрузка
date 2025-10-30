function getCurLang() {
    return window.location.pathname.split('/')[1];
}
/**
 * Created by vany on 29.09.2014.
 */
function urlLangGen(genUrl)
{
    var curlang = getCurLang();
    var langIndex;
    var splitArr = genUrl.split('/');
    if(genUrl[0]=="/" || splitArr.length==1)
    {
        langIndex = 1;
    }
    else if(genUrl.substr(0,4)=="http")
    {
        langIndex = 3;
    }
    else
    {
        langIndex = 1;
    }
    if(splitArr[langIndex] == "ru" || splitArr[langIndex] == "kz")
    {
        splitArr[langIndex] = curlang;
    }
    else
    {
        splitArr.splice(langIndex,0,curlang);
    }
    return splitArr.join('/');
}
function genHelperNamespace(root_point,namespace_name)
{
    var parts = namespace_name.split('.'),
        parent = root_point,
        pl, i;
    if (parts[0] == "myApp")
    {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        if (typeof parent[parts[i]] == 'undefined')
        {
            parent[parts[i]] = {};
        }
        if(typeof parent[parts[i]]!=="object")
        {
            alert("Невозможно создать пространство имен");
            throw("Невозможно создать пространство имен");//все ошибки такого плана должны быть исправлены на этапе разработки
        }
        parent = parent[parts[i]];
    }
    return parent;
}
function getLangPath()
{
    firstPathDir = window.location.pathname.split("/")[1];
    if(firstPathDir=="ru" || firstPathDir=="kz")
        return "/"+firstPathDir;
    else
        return "";
}
/**@namespace helpers.tests*/
genHelperNamespace(window,'helpers.tests');
helpers.tests.execution_time = function (callback,iterations)
{
    if(typeof iterations == "undefined")
    {
        iterations = 1000;
    }
    console.time('timer1');
    for(var i=0;i<iterations;i++)
    {
        callback();
    }
    console.timeEnd('timer1');
};

document.getLang = getLangPath;

function post_group_action(action_url,appended_text)
{
    var checkStr="";
    var filter;
    need_handl = $(".need_handl:checked");
    if(need_handl.length==0)
    {
        alert("Не выбраны элементы");
        return;

    }
    else
    {
        need_handl.each(
            function (idx,chBox)
            {
                checkStr+=$(chBox).attr("id").substr(11)+',';
            }
        );
        checkStr = checkStr.substring(0, checkStr.length - 1);
    }
    $("#toolbar_button_form").attr('action',action_url).append('<input type="hidden" name="need_nandl" value="' + checkStr + '">').append($('<input type="hidden" name="back_url">').val(document.URL));
    if(typeof appended_text !== 'undefined')
    {
        $("#toolbar_button_form").append(appended_text);
    }
    $("#toolbar_button_form").append($('<input type="hidden" name="back_url">').val(document.location.pathname+document.location.search));
    $("#toolbar_button_form").submit();
}

function post_single_action(action_url,need_handle,appended_text)
{
    $("#toolbar_button_form").attr('action',action_url)
        .append('<input type="hidden" name="need_nandl" value="' + need_handle + '">')
        .append(appended_text)
        .append($('<input type="hidden" name="back_url">').val(document.location.pathname+document.location.search));
    $("#toolbar_button_form").submit();
}

$(function(){
    var dp = $(".datepicker");
    if(dp.length>0)
    {
        dp.datepicker({format: 'yyyy-mm-dd'});
    }
    //stub for show/hide selects options
    jQuery.fn.toggleOption = function (show) {
        $(this).toggle(show);
        if (show) {
            $(this).each(function(idx,item){
                if ($(item).parent('span.toggleOption').length)
                    $(item).unwrap();
            });
        } else {
            $(this).each(function(idx,item){
                if ($(item).parent('span.toggleOption').length==0)
                    $(item).wrap('<span class="toggleOption" style="display: none;" />');
            });
        }
    };
});

Date.prototype.format = function(){
    var d = new Date(this),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

$(document).ready(function() {
    $('.content-block')
        .on('click', '.btn-disabled-onclick', function () {

            $(this).attr('disabled', 'disabled');

            var old_icon = $(this).find('i.glyphicon');
            if (old_icon.length) {
                old_icon.remove();
            }

            var old_html = $(this).html();
            $(this).html('');

            $("<i />", {'class': 'glyphicon glyphicon-refresh fa-spin'}).appendTo($(this));
            $(this).append(' ' + old_html);
    });
});

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function is_numeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

jQuery(document)
    .ready(function () {
        $(document).on('blur', '.number_input', function () {
            $(this).val(function (index, value) {
                if (value === '') {
                    return value;
                }

                value = value.split(' ').join('');
                value = parseFloat(value.replace(',', '.'));
                if (!is_numeric(value)) {
                    return 0;
                }
                return value;
            });
        });
    });
