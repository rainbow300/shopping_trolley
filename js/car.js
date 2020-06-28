$(function() {
    $('.checkall').change(function() {
            // 1. 全选 全不选功能模块
            // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
            // 事件可以使用change
            $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
                // 如果复选框勾选，背景颜色发生变化
            if ($(this).prop('checked')) {
                $('.cart-item').addClass('check-cart-item');
            } else {
                $('.cart-item').removeClass('check-cart-item');
            }
            sum()
        })
        // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }
        // 判断小复选框是不是被勾选上，如果勾选上，背景颜色发生变化
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
        sum()
    })

    //  如果数量手动修改，也会发生改变
    $(".itxt").change(function() {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        sum();
    });

    // 点击++，数值会增加
    var num = 0;
    $('.increment').click(function() {
            var n = $(this).siblings('.itxt').val()
            n++;
            $(this).siblings('.itxt').val(n)
            var price = $(this).parents('.p-num').siblings('.p-price').html().substr(1)
            console.log(price)
            $(this).parents('.p-num').siblings('.p-sum').text('￥' + (n * parseFloat(price)).toFixed(2))
            sum()
        })
        // 点击--，数值会减少
    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val()
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n)
        var price = $(this).parents('.p-num').siblings('.p-price').html().substr(1)
        console.log(price)
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + (n * parseFloat(price)).toFixed(2))
        sum()
    })

    // 删除选中的模块
    $('.remove-batch').click(function() {
            $('.j-checkbox:checked').parents('.cart-item').remove();
            sum()
        })
        // 删除全部模块
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        sum();
    })

    // 计算总数
    sum()

    function sum() {
        var count = 0;
        var sum = 0;
        $('.j-checkbox:checked').parent().siblings('.p-sum').each(function(i, ele) {

            sum += parseFloat($(ele).text().substr(1))
            console.log(sum)
        })
        $('.price-sum em').text("￥" + sum.toFixed(2))
            // $('.p-sum').each(function(i, ele) {
            //     sum += parseFloat($(ele).text().substr(1))
            // })

        $('.j-checkbox:checked').parent().siblings('.p-num').children().children('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val())
        })
        $('.amount-sum em').text(count)
    }

    // 删除事件
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        sum()
    })
})