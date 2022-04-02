/*
 * jQuery enableIfChecked plugin
 * https://github.com/kevengodet/enableIfChecked.js
 *
 * Author: Keven (hello@keven.fr)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Change state of an input depending on which checkboxes are checked.
 *
 * Example: on a checkout page, disable the "Get shipped" if all of checked items
 * are not shippable (i.e.).
 *
 *     $('#getshippedButton').enableIf({
 *         selector: '.item',             // Apply on all checkboxes which have .item class
 *         property: 'data-shippable',  // Check the data-shippable attribute...
 *         value: 'true',                 // ...which must be "true"
 *         action: 'select'               // If not, disable the #getshippedButton button
 *     });
 */
;(function ($) {
    $.fn.enableIfChecked = function( options ) {
        var settings = $.extend({
            selector: "input[type=checkbox]",
            property: "data-enable-if",
            value: "true",
            action: "display", // "display": show/hide
                               // "select": enable/disable
                               // <anything else>: add this as a class when enabled
            hint: true, // console.log a hint on why the button is disabled/hidden
            defaultState: false, // Which state when no checkbox is checked
        }, options );

        var target = this;

        $.fn.getState = function(settings) {

            var $checkboxes = $(settings.selector+':checked');

            // No checkbox checked means the button is OFF
            if ($checkboxes.length === 0) {
                return settings.defaultState;
            }

            for (var i = 0 ; i < $checkboxes.length ; i++) {
                if ($($checkboxes[i]).attr(settings.property) !== settings.value) {
                    if (settings.hint) {
                        console.log('Hint: '+$checkboxes[i].id+'/'+$checkboxes[i].name+' '+settings.property+' != '+settings.value);
                    }
                    // If any checked checkbox does not match the value, the button is OFF
                    return false;
                }
            }

            // If ALL checked checkbox does match the value, the button is ON
            return true;
        };

        $.fn.changeButton = function(selector, state, settings) {
            if (state) {
                if (settings.action === "display") {
                    $(selector).show();
                } else if (settings.action === "select") {
                    $(selector).removeAttr("disabled");
                } else {
                    $(selector).addClass(settings.action);
                }
            } else {
                if (settings.action === "display") {
                    $(selector).hide();
                } else if (settings.action === "select") {
                    $(selector).attr("disabled", "disabled");
                } else {
                    $(selector).removeClass(settings.action);
                }
            }
        };

        return $(settings.selector).change(function() {
            $.fn.changeButton(target, $.fn.getState(settings), settings);
        });
    };
}(jQuery));
