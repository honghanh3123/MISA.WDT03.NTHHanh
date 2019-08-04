$(document).ready(function () {
 
});

class Ref extends Base {
    constructor() {
        super();
        this.loadData();// sd ke thua
        this.InitEvents();
    }

    // tao ham su kien
    InitEvents() {

        $(document).on('click', '.delete', { 'jsObject': this }, this.ClickDelete);

        $(document).on('click', '.edit', () => {
            this.OpenDialog("Sửa khách hàng")
        });
        $(document).on('click', '.duplicate', () => {
            this.OpenDialog("Thêm mới khách hàng")
        });
        $(document).on('click', '.add-new', () => {
            this.OpenDialog("Thêm mới khách hàng")
        });

        $(document).on('click', 'tr', {
            'jsObject': 12345,
            'name': "Hong Hanh"
        }, this.RowOnCLick);

        $(document).on('click', '.icon-tick', this.TickRow);

        $(document).on('click', 'button.save', this.SaveRef.bind(this));
    }

    /**
     * Hàm thực hiện sửa phiếu chứng từ
     * Người tạo: Nguyễn Thị Hồng Hạnh
     * Ngày tạo: 4/8/2019
     * */
    OpenDialogEdit() {
        

        var ref
        $.ajax({
            method: 'GET',
            url: '/refs/' + refID,
            success: function (res) {
                if (res.Success) {
                    var listRow = $('input[property]');
                    var object = {};

                    $.each(listRow, function (index, item) {
                        var propertyName = item.getAttribute('property');
                        var value = res.Data[propertyName];
                        //var value = $('.selected .{0}'.format(propertyName)).text();
                        var value1;
                        if (index === 0) {
                            value1 = moment(value).format("YYYY/MM/DD");
                        }
                        else if (index === 3) {
                            var point = /\./g;
                            //value1 = numeral(value).format('000000');
                            value1 = value.replace(point, "");
                        } else {
                            value1 = value;
                        }

                        //var value2 = numeral(valueTotal);
                        //$(item).data('recordid');           
                        //var refID = $('.selected').data('recordid');
                        $(item).val(value1);
                        //$(item).val(value2);
                        //debugger
                    });
                } else {
                    alert(re.Message);
                }
            },
            error: function () {
                alert("Loi cau hinh ajax");
            }
        })

        $('#mode').val("edit"); // gán giá trị cho biến
    }

    /**
     * Hàm thực hiện lấy ID của phiếu thu
     * Người tạo: Nguyễn Thị Hồng Hạnh
     * Ngày tạo: 4/8/2019
     * */
    GetRowID() {
        var refID = $('.selected, .tick').data('recordid');
        return refID;
    }
    /**
     * Hàm thực hiện đóng dialog
     * Người tạo: Nguyễn Thị Hồng Hạnh
     * Ngày tạo: 4/8/2019
     * */
    CloseDialogAdd() {
        $('#dialog').dialog('close')
    }

    /**
     * Hàm thực hiện lưu lại thông tin
     * Người tạo: Nguyễn Thị Hồng Hạnh
     * Ngày tạo: 4/8/2019
     * @param {any} event
     */
    SaveRef() {
        var me = this;
        var listRow = $('input[property]');
        var textarea = $('#CustomerNote');

        var object = {};
        let seeCustomerGroup = false;
        $.each(listRow, function (index, item) {
            var propertyName = item.getAttribute('property');
            if (propertyName === "CustomerGroup" && !seeCustomerGroup) {
                var value = $(this).val() // this la item - input, set gia tri them val("abc")
                object[propertyName] = value;
                seeCustomerGroup = true;
            }
            if (propertyName !== "CustomerGroup") {
                var value = $(this).val() // this la item - input, set gia tri them val("abc")
                object[propertyName] = value;
            }
        });

        object["Note"] = textarea.val();       
        $.ajax({
            method: "POST",
            url: '/customers',
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            success: function () {              
                $('.modal-contents').dialog('close');
                me.loadData();
            },
            error: function () {
                alert("Da co loi xay ra");
            }
        });
    }

    /**
     * Người tạo: Nguyễn Thị Hồng Hạnh
     * hàm thực hiện chọn từng hàng khi tích vào ô check cột đầu tiên
     * ngày tạo: 4/8/2019
     * */
    TickRow(event) {
        var currCls = event.currentTarget.classList[1];
        if (currCls === "uncheck") {
            $(this).removeClass('uncheck');
            $(this).addClass('check');
            $(this).parent().addClass('tick');
        } else {
            $(this).removeClass('check');
            $(this).addClass('uncheck');
            $(this).parent().removeClass('tick');
        }
    }


    /**
     * ham thuc hien thong bao khi click vao mot ham
     * nguoi tao: Nguyễn Thị Hồng Hạnh
     * ngay tao: 4/8/2019
     * */

    RowOnCLick(event) {
        //debugger
        //var jsobject = arguments[0];
        //var name = arguments[1];
        var jsobject = event.data['jsObject'];
        var name = event.data['name'];
        //debugger
        $('.main-table tbody tr').removeClass('selected');
        $(this).addClass('selected'); // this la tr
        //$('button.delete').removeAttr('disabled')
    }

    /**
     * Hàm thực hiện mở dialog thêm mới
     * Người tạo: Nguyễn Thị Hồng Hạnh
     * Ngày tạo: 4/8/2019
     * @param {any} event
     */

    OpenDialog(title) {
        $(".modal-contents").dialog({
            title: title,
            height: 595,
            width: 700,
            modal: false,
            resizable: false,
            buttons: {
                "Lưu": () => {
                    this.SaveRef()
                },
                "Lưu và thêm mới": function () {

                },
                Cancel: function () {
                    $(".modal-contents").dialog("close");
                },
                "Trợ giúp": function () {

                }
            },
            close: function () {
                $(".opacity").hide();
            },
        });
        $(".opacity").show();
        $('input').val("");
        $('#mode').val("add");
    }

    ClickDelete(event) {
        var me = event.data['jsObject'];
        //me.DemoParam(12345, "NV");
        var listCustomerID = [];
        var listRow = $('.tick, .selected');

        $.each(listRow, function (index, item) {
            var customerid = $(item).data('recordid');
            listCustomerID.push(customerid);
            //debugger
        })

        console.log(listCustomerID);

        var CustomerID = $('.selected .CustomerID').text();
        //listCustomerID.push();
        let isDelete = confirm("Bạn có chắc chắn muốn xóa phiếu chứng từ không?");
        if (isDelete) {
            $.ajax({
                method: 'DELETE',
                url: '/customers',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(listCustomerID),
                success: function (res) {
                    me.loadData();
                },
                error: function (res) {
                    alert("Chuc nang xoa dang bi loi");
                }
            })
        }
    }

    DemoParam() {
        var code = arguments[0];
        var name = arguments[1];
    }
    // overight
    loadData() {
        super.loadData(); //muon in ra data
        //alert("a");
    }
}

var ref = new Ref();


// BTVN ve trang danh muc khac hang

