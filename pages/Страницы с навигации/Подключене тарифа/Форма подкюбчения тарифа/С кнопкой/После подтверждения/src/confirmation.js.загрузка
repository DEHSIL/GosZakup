/**
 * Created by zhis on 03.05.2015.
 */
jQuery.fn.jLive = function (types, data, fn) {
    jQuery(this.context).on(types,this.selector,data,fn);
    return this;
};
function confirmation()
{
    $('.cancelA').jLive('click', function() {
        $('.noticeM').modal();
        return false;
    });
    $('.noticeB').jLive('click', function() {
        window.location.href = $('.cancelA').attr('href');
    });
}
$(document).ready(function() {
    confirmation();
});