$('#date-input').datepicker()

//let userDialog = $(".modal-contents").dialog({
//    autoOpen: false,
//    height: 595,
//    width: 700,
//    modal: false,
//    resizable: false,
//    buttons: {
//        "Lưu": function () {

//        },
//        "Lưu và thêm mới": function () {

//        },
//        Cancel: function () {
//            userDialog.dialog("close");
//        },
//        "Trợ giúp": function () {

//        }
//    },
//    close: function () {
//        $(".opacity").hide();
//    },
//});

let groupUserDialog = $('.add-new-customer-group').dialog({
    title: "Thêm mới nhóm khách hàng",
    autoOpen: false,
    height: 365,
    width: 500,
    close: function () {
        $('.opacity').css('z-index', 99);
    },
})

//$(".add-new").click(function (e) {
//    userDialog.dialog("option", { title: "Thêm mới khách hàng" })
//    userDialog.dialog("open");
//    $(".opacity").show();
//});

//$(".duplicate").click(function (e) {
//    userDialog.dialog("option", { title: "Thêm mới khách hàng" })
//    userDialog.dialog("open");
//    $(".opacity").show();
//});

//$(".edit").click(function (e) {
//    userDialog.dialog("option", { title: "Sửa khách hàng" })
//    userDialog.dialog("open");
//    $(".opacity").show();
//});

//$('.quick-add').click(function (e) {
//    groupUserDialog.dialog("open")
//    $('.opacity').css('z-index', 101);
//});







$.widget("custom.combobox", {
    _create: function () {
        this.wrapper = $("<span>")
            .addClass("custom-combobox")
            .insertAfter(this.element);

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
    },

    _createAutocomplete: function () {
        var selected = this.element.children(":selected"),
            value = selected.val() ? selected.text() : "";

        var groupInput = this.element.context.className.split(" ").includes("combobox-group-input")
        var placeholderId = this.element.context.id;

        this.input = $("<input>")
            .appendTo(this.wrapper)
            .val(value)
            .attr("title", "")
            .attr("property", "CustomerGroup")
            .attr("placeholder", placeholderId)
            .attr("value", "")
            .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" + (groupInput ? " combobox-group-input" : ""))
            .autocomplete({
                delay: 0,
                minLength: 0,
                source: $.proxy(this, "_source")
            })
            .tooltip({
                classes: {
                    "ui-tooltip": "ui-state-highlight"
                }
            });

        this._on(this.input, {
            autocompleteselect: function (event, ui) {
                ui.item.option.selected = true;
                this._trigger("select", event, {
                    item: ui.item.option
                });
            },

            autocompletechange: "_removeIfInvalid"
        });
    },

    _createShowAllButton: function () {
        var input = this.input,
            wasOpen = false;

        var groupInput = this.element.context.className.split(" ").includes("combobox-group-input")

        $("<a>")
            .attr("tabIndex", -1)
            .attr("title", "Show All Items")
            .tooltip()
            .appendTo(this.wrapper)
            .button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            })
            .removeClass("ui-corner-all")
            .addClass("custom-combobox-toggle ui-corner-right" + (groupInput ? " combobox-toggle-group-input-dropdown" : ""))
            .on("mousedown", function () {
                wasOpen = input.autocomplete("widget").is(":visible");
            })
            .on("click", function () {
                input.trigger("focus");

                // Close if already visible
                if (wasOpen) {
                    return;
                }

                // Pass empty string as value to search for, displaying all results
                input.autocomplete("search", "");
            });
    },

    _source: function (request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        response(this.element.children("option").map(function () {
            var text = $(this).text();
            return {
                label: text,
                value: text,
                option: this
            };
        }));
    },

    //_removeIfInvalid: function (event, ui) {

    //    // Selected an item, nothing to do
    //    if (ui.item) {
    //        return;
    //    }

    //    // Search for a match (case-insensitive)
    //    var value = this.input.val(),
    //        valueLowerCase = value.toLowerCase(),
    //        valid = false;
    //    this.element.children("option").each(function () {
    //        if ($(this).text().toLowerCase() === valueLowerCase) {
    //            this.selected = valid = true;
    //            return false;
    //        }
    //    });

    //    // Found a match, nothing to do
    //    if (valid) {
    //        return;
    //    }

    //    // Remove invalid value
    //    this.input
    //        .val("")
    //        .attr("title", value + " didn't match any item")
    //        .tooltip("open");
    //    this.element.val("");
    //    this._delay(function () {
    //        this.input.tooltip("close").attr("title", "");
    //    }, 2500);
    //    this.input.autocomplete("instance").term = "";
    //},

    _destroy: function () {
        this.wrapper.remove();
        this.element.show();
    }
});

$(".combobox").combobox();
