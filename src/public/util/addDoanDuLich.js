$('body').on('click', '.delete-new-khachhang', () => {
    let index = $('.delete-new-khachhang').index(this)
    $('.item-add-new-khachhang').eq(index).remove()

    // set phương tiện ứng với số người
    setPhuongTien($('.item-add-new-khachhang').length)

    let numberNextKhachHang = $('.item-add-new-khachhang').length
    // chỉnh sửa chi phí tổng
    // $('#input-ChiPhi').val((numberNextKhachHang) * 1240000)
    // $('#input-ChiPhi-real').val((numberNextKhachHang) * 1240000)
    totalMoney(0)
})

$('#input-date-NgayKhoiHanh').on('change', function () {
    let dateNgayKhoiHanh = formatDateNgayKhoiHanh($('#input-date-NgayKhoiHanh').val())
    $('#input-real-date-NgayKhoiHanh').val(dateNgayKhoiHanh)
    console.log($('#input-real-date-NgayKhoiHanh').val())
})

$('.button-add-new-khachhang').on('click', function (e) {
    e.preventDefault()
    let numberNextKhachHang = $('.item-add-new-khachhang').length + 1

    // set phương tiện ứng với số người
    setPhuongTien(numberNextKhachHang)

    // thêm phần nhập 1 thành viên mới
    $('#container-add-new-khachhang').append(`
<div class="item-add-new-khachhang">
    <div class="item-add-new-line">
        <span class="item-add-new-tourist">Khách hàng ${numberNextKhachHang}</span>
        <span class="delete-new-khachhang" style="cursor: pointer;">
            <i class="fas fa-trash-alt"></i>
        </span>
    </div>
    <div>
        <div class="addtg__container-info">
            <label class="addtg__container-label" for="">Tên khách hàng:</label>
            <input class="addtg__container-input" type="text" name="${numberNextKhachHang}-HoTen" id="">
        </div>
        <div class="addtg__container-info">
            <label class="addtg__container-label" for="">CMND/CC:</label>
            <input class="addtg__container-input" t type="text" name="${numberNextKhachHang}-CMND" id="">
        </div>
        <div class="addtg__container-info">
            <label class="addtg__container-label" for="">Giới tính:</label>
            <select class="addtg__container-select" name="${numberNextKhachHang}-GioiTinh" id="">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
        </div>
        <div class="addtg__container-info">
            <label class="addtg__container-label" for="">Số điện thoại:</label>
            <input class="addtg__container-input" type="text" name="${numberNextKhachHang}-SDT" id="">
        </div>
    </div>
</div>
    `)
    // chỉnh sửa chi phí tổng
    // $('#input-ChiPhi').val((numberNextKhachHang) * 1240000)
    // $('#input-ChiPhi-real').val((numberNextKhachHang) * 1240000)
    totalMoney(0)
})

//convert yyyy-mm-dd --> mm-dd-yyyy
function formatDateNgayKhoiHanh(date) {
    let arr = date.split('-')
    let formatDate = arr[1] + "/" + arr[2] + "/" + arr[0]
    return formatDate
}

$('#button-cofirm-addNhanVienTours').on('click', function () {
    let arr = []
    let index = $('.tr-nhanvientour').length
    for (let i = 0; i < index; ++i) {
        let checked = $('.input-checkbox-nhanviens')[i].checked
        if (checked) {
            arr.push($('.tr-nhanvientour td:nth-child(2)').eq(i).html())
        }
    }
    $('#input-list-nhanvientour').attr('value', arr)

    //khi thêm nhân viên thì cộng thêm tiền 
    totalMoney(0)

    // show message
    alert('Các nhân viên đã được thêm vào tour của bạn.\nChúc các bạn có chuyến du lịch zui ze.')
})

// set lại total chi phí
function totalMoney(i) {
    let index = $('.input-checkbox-nhanviens:checked').length
    let numberNextKhachHang = $('.item-add-new-khachhang').length + i
    $('#input-ChiPhi').val((numberNextKhachHang) * 1240000 + index * 1200000)
    $('#input-ChiPhi-real').val((numberNextKhachHang) * 1240000 + index * 1200000)
}
$('#submit-add-doandulich').on('click', function (e) {
    e.preventDefault()
    // set phuong tien 
    $('#input-phuongtien').attr('value', $('#select-phuongtien').find(":selected").val())
    if ($('.input-checkbox-nhanviens:checked').length == 0)
        alert('Hãy chọn nhân viên hỗ trợ .Bấm "Xác nhận"')
    else {
        let checked = confirm('Hãy chắc chắn rằng bạn đã thêm các nhân viên phục vụ cho chuyến đi của mình.')
        if (checked) {
            $('#form-addDoanDuLich').submit()
        }
        // console.log($('#select-phuongtien').find(":selected").data('max'))
        // console.log($('#select-phuongtien').find(":selected").val())
    }
    console.log($('.input-checkbox-nhanviens:checked').length)
})

function setPhuongTien(numberKhachHang = 1) {
    let arr = $('#select-phuongtien option').map((index, option) => {
        return {
            MaPhuongTien: option.value,
            max: $('#select-phuongtien option').eq(index).data('max')
        }
    }).sort((a, b) => {
        return a.max - b.max
    })
    let phuongtien = ''
    for (let i = 0; i < arr.length; ++i) {
        if (numberKhachHang <= arr[i].max) {
            phuongtien = arr[i].MaPhuongTien
            break
        }
    }
    $('#select-phuongtien option')
        .removeAttr('selected')
        .filter(`[value=${phuongtien}]`)
        .attr('selected', true)

}