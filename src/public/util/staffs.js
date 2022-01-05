$(document).ready(function () {
    setColorAndValForCheckActive()
});
function setColorAndValForCheckActive() {
    let totalRow = $('.row-nhanvien').length
    for (let i = 0; i < totalRow; ++i) {
        let CheckFinishedOfRow = $('.row-check-active-nhanvien').eq(i).html()
        // finished -- red
        if (CheckFinishedOfRow == 'true') {
            $('.span-checkactive-nhanvien').eq(i).html("In Tour")
            $('.span-checkactive-nhanvien').eq(i).addClass('intour')
        }
        else if (CheckFinishedOfRow == 'false') {
            $('.span-checkactive-nhanvien').eq(i).html("Enable")
            $('.span-checkactive-nhanvien').eq(i).addClass('enable')
        }
    }
}