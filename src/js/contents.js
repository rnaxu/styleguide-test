// 遅延ロード用JS
$(function() {
    $('.js-lazy').lazyload({
        effect: 'fadeIn',
        threshold: 300,
        load: function(){
            $(this).children('.js-overlay').addClass('js-card__overlay');
        }
    });
});


// ページ下部の検索リスト用JS
$(function() {

    var $searchTerm = $('.js-searchTerm');
    var $searchListGroup = $('.js-searchList__group');

    function showSearchListItem(eventTarget) {
        $(eventTarget).siblings($searchListGroup).removeClass('js-hidden');
        $(eventTarget).removeClass('searchList__item--arrow');
    }

    $searchTerm.on('click', function() {
        showSearchListItem(this);
    });

});