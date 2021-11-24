$('#button-add-new-doandulich').on('click', function (e) {
    window.location.href = `/add/doandulich`
    return false
})
$(document).ready(function () {
    setColorAndValForCheckFinished()
});
// css cái dấu 3 chấm nằm dọc phía cuói table doan du lich
$('.container-icon-extend-option.tourist-groups').on('click', function (e) {
    let index = $('.container-icon-extend-option').index(this)
    let checkFinish = $('.span-checkfinish-doandulich').eq(index).html()
    console.log(checkFinish)
    if (checkFinish == 'Active') {
        if ($('.menu-icon-extend-option').eq(index).css('display') == 'block')
            $('.menu-icon-extend-option').eq(index).css('display', 'none')
        else {
            $('.menu-icon-extend-option').eq(index).css('display', 'block')
        }
    }
    else if (checkFinish == 'Finished') {
        alert('Tour đã hoàn thành, bạn không thể sửa.')
    }
})

// button sửa đoàn du lịch 
$('.btn-edit-doandulich.tourist-groups').on('click', function () {
    let index = $('.btn-edit-doandulich').index(this)
    let date = new Date()
    let currentDay = parseInt(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    let ngaykhoihanh = $('.row-doandulich td:nth-child(5)').eq(index).html()
    let MaDoan = $('.row-doandulich td:nth-child(3)').eq(index).html()
    let TenDoan = $('.row-doandulich td:nth-child(4)').eq(index).html()
    let jsDateCurrentDay = new Date(currentDay)
    let jsDateNgayKhoiHanh = new Date(ngaykhoihanh)
    // chưa khởi hành  thì có thể sửa ngày khởi hành
    if (jsDateNgayKhoiHanh < jsDateCurrentDay) {
        let newNgayKhoihanh = prompt(`Nhập ngày khởi hành mới cho: ${TenDoan}\nĐịnh dạng : mm/dd/yyyy\nChúc bạn có một chuyến đi zui ze :)))`)
        console.log(newNgayKhoihanh)
        //submit form change NgayKhoiHanh
        if (newNgayKhoihanh == '' || newNgayKhoihanh === null)
            alert('Bạn chưa điền Ngày Khởi Hành.')
        else if (checkFormatNgayKhoiHanh(newNgayKhoihanh)) {
            submitFormChangeNgayKhoiHanh(MaDoan, newNgayKhoihanh)
        }
        else
            alert('Sai định dạng, vui lòng làm lại.')
    } else {
        alert('Đoàn đã bắt đầu lịch trình, không thể thay đổi.')
    }
})
// button finish đoàn du lịch : check đoàn du lịch đã hoàn thành chuyến đi 
$('.btn-finish-doandulich.tourist-groups').on('click', function () {
    let index = $('.btn-finish-doandulich').index(this)
    let MaDoan = $('.row-doandulich td:nth-child(3)').eq(index).html()
    $('#input-form-finishDoanDuLich-MaDoan').attr('value', MaDoan)
    $('#form-finish-doandulich').submit()
})


// =============================================================================================================
// css cái dấu 3 chấm nằm dọc phía cuói table dia diem 
$('.container-icon-extend-option.destination').on('click', function (e) {
    let index = $('.container-icon-extend-option').index(this)
    if ($('.menu-icon-extend-option').eq(index).css('display') == 'block')
        $('.menu-icon-extend-option').eq(index).css('display', 'none')
    else {
        $('.menu-icon-extend-option').eq(index).css('display', 'block')
    }
})

// button sửa đoàn du lịch 
$('.btn-edit-destination').on('click', function () {
    let index = $('.btn-edit-destination').index(this)
    let present = $('.DiaDiem-totalDiaDiem').eq(index).html().split('/')[0]
    let totalPresent = $('.DiaDiem-totalDiaDiem').eq(index).html().split('/')[1]
    let MaDoan = $('.MaDoan-destination').eq(index).html()
    if(present < totalPresent-1){
        let checked = confirm('Bạn muốn đến địa điểm du lịch tiếp theo.')
        if(checked){
            $('#input-form-increateSoThuTuDiaDiemOfDoanDuLich-SoThuTuDiaDiem').attr('value', parseInt(present)+1)
            $('#input-form-increateSoThuTuDiaDiemOfDoanDuLich-MaDoan').attr('value',MaDoan)
            $('#form-increateSoThuTuDiaDiem-doandulich').submit()
        }
    }
    else{
        let checked = confirm('Địa điểm cuối rồi, bạn có muốn hoàn thành chuyến đi không.')
        if(checked){
            console.log(MaDoan)
            $('#input-form-finishDoanDuLich-MaDoan').attr('value', MaDoan)
            $('#form-finish-doandulich').submit()
        }
    }
})
// button finish destination : check  đã hoàn thành chuyến đi 
$('.btn-finish-destination').on('click', function () {
    let index = $('.btn-finish-destination').index(this)
    console.log(index)
    let MaDoan = $('.MaDoan-destination').eq(index).html()
    console.log(MaDoan)
    $('#input-form-finishDoanDuLich-MaDoan').attr('value', MaDoan)
    $('#form-finish-doandulich').submit()
})

//click select option khach hang
$('#information-khachhang').change(function () {
    console.log($(this).val())
    let optionKhachHang = $(this).val()
    showTableKhachHangForOption(optionKhachHang)
    // console.log($(`.row-khachhang td:nth-child(${1})`).eq(1).html())
})

// click select option doan du lich
$('#information-doandulich').change(function () {
    console.log($(this).val())
    let optionDoanDuLich = $(this).val()
    showTableDoanDuLichForOption(optionDoanDuLich)
})

// show table tương ứng với các option của nó
function showTableKhachHangForOption(MaDoan) {
    let totalRow = $('.row-khachhang').length
    if (MaDoan != 'All') {
        for (let i = 0; i < totalRow; ++i) {
            let MaDoanOfRow = $(`.row-khachhang td:nth-child(${6})`).eq(i).html()
            if (MaDoanOfRow != MaDoan)
                $(`.row-khachhang`).eq(i).hide()
            else {
                $(`.row-khachhang`).eq(i).show()
            }
        }
    }
    else {
        for (let i = 0; i < totalRow; ++i) {
            $(`.row-khachhang`).eq(i).show()
        }
    }
}

function showTableDoanDuLichForOption(option) {
    let totalRow = $('.row-doandulich').length
    for (let i = 0; i < totalRow; ++i) {
        let CheckFinishedOfRow = $('.row-check-finish-doandulich').eq(i).html()
        // console.log(CheckFinishedOfRow)
        if (option == 'all') {
            $(`.row-doandulich`).eq(i).show()
        }
        else if (option == 'active') {
            if (CheckFinishedOfRow == 'false')
                $(`.row-doandulich`).eq(i).show()
            else {
                $(`.row-doandulich`).eq(i).hide()
            }
        }
        else {
            if (CheckFinishedOfRow == 'false')
                $(`.row-doandulich`).eq(i).hide()
            else {
                $(`.row-doandulich`).eq(i).show()
            }
        }
    }
}

// format : mm/dd/yyyy
function checkFormatNgayKhoiHanh(ngaykhoihanh) {
    let arr = ngaykhoihanh?.split('/')
    if (arr.length != 3 || arr == undefined) {
        console.error('wrong format')
        return false
    }
    console.warn('true format')
    return true
}
function submitFormChangeNgayKhoiHanh(MaDoan, ngaykhoihanh) {
    $('#input-form-change-NgayKhoiHanh-MaDoan').attr('value', MaDoan)
    $('#input-form-change-NgayKhoiHanh-NgayKhoiHanh').attr('value', ngaykhoihanh)
    $('#form-change-NgayKhoiHanh').attr('method', 'POST')
    $('#form-change-NgayKhoiHanh').attr('action', '/handle/editNgayKhoiHanh')
    $('#form-change-NgayKhoiHanh').submit()

}

function setColorAndValForCheckFinished() {
    let totalRow = $('.row-doandulich').length
    for (let i = 0; i < totalRow; ++i) {
        let CheckFinishedOfRow = $('.row-check-finish-doandulich').eq(i).html()
        // finished -- red
        if (CheckFinishedOfRow == 'true') {
            $('.span-checkfinish-doandulich').eq(i).html("Finished")
            $('.span-checkfinish-doandulich').eq(i).addClass('finished')
        }
        else if (CheckFinishedOfRow == 'false') {
            $('.span-checkfinish-doandulich').eq(i).html("Active")
            $('.span-checkfinish-doandulich').eq(i).addClass('active')
        }
    }
}