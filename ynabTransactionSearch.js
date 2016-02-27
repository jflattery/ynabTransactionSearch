// ==UserScript==
// @name        YNAB Transaction Filter
// @author      jFlatz
// @description A method of searching and filtering transactions.
// @license     MIT License
// @version     1.0
// @released    2016-02-26
// @updated     2016-02-26
// @match       https://app.youneedabudget.com/*/accounts*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @icon        https://sslcdn-youneedabudgetco.netdna-ssl.com/favicon.ico
// @grant       none
// ==/UserScript==

setTimeout(function () {
  
  $('.accounts-toolbar-left').append('&nbsp;&nbsp;&nbsp;&nbsp;<input id="ynabTransactionSearch" type="search" placeholder="Search transactions..." />');

  (function($, undefined) {
    $.expr[":"].containsNoCase = function(el, i, m) {
        var search = m[3];
        if (!search) return false;
        return new RegExp(search, "i").test($(el).text());
    };

    $.fn.searchFilter = function(options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function() {
            var $el = $(this);
            $el.keyup(function() {
                var search = $(this).val();

                var $target = $(opt.targetSelector);
                $target.show();

                if (search && search.length >= opt.charCount)
                    $target.not(":containsNoCase(" + search + ")").hide();
            });
        });
    };
})(jQuery);
  
$("#ynabTransactionSearch").searchFilter({ targetSelector: ".ynab-grid-body-parent", charCount: 2})  

}, 2000);
