class Base {
    constructor() {

    }

    getData() {
        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/customers',
            async: false,
            success: function (res) {
                //fakeData = res;
                if (res.Success) {
                    fakeData = res.Data;
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
                alert("Dich vu dang loi");
            }
        })
        return fakeData;

    }

    // hàm thực hiện lấy dữ liệu ra HTML
    loadData() {
        //debugger
        //$('tbody').empty();
        var me = this;
        var data = this.getData(); 
        var fields = $("th[fieldName]");
        $('.main-table tbody').empty();        

        $.each(data, function (index, item) {

            var rowHTML = $('<tr></tr>').data("recordid", item["CustomerID"]);

            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];

                if (fieldName === "RefDate") {
                    fieldValue = new Date(fieldValue);
                }

                if (fieldName) {
                    rowHTML.append('<td class = "{1}"> {0}</td>'.format(fieldValue, fieldName));
                } else {
                    rowHTML.append('<td class = "{0}"></td>'.format("icon-tick uncheck"));
                }
            });
            $('.main-table tbody').append(rowHTML);
        })
    }
}