; (function () {
    // 进行登录判定
    var isLogin = QF.getCookie("isLogin");
    console.log(isLogin)
    if (!isLogin) {
        // 如果没有登录的话，跳转回登录页面
        location.href = "./login.html";
    }

    // 获取list元素
    var list = document.getElementById("list");


    // 当前页面是用于 展示商品信息 
    // 因为商品有700+条 所以一个页面肯定是无法全部展示的 
    // 我们决定采用ajax分页
    QF.get("../../php/getGoodsInfo.php", { page: 1, num: 32 }, function (data) {
        // 获取到数据了 更新到页面上
        // 根据data.error进行判定
        if (!data.error) {
            data.data.forEach(function (value) {
                console.log(value)
                list.innerHTML += `
                <div class="col-lg-3">
                    <div class="card" style="width: 15rem;">
                        <img src="${value.goods_small_logo}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text  text-truncate ">${value.goods_name}</p>
                            <p class="font-weight-bold h4 text-danger">￥${value.goods_price} </p>
                            <a href="#" class="btn btn-primary">加入购物车</a>
                        </div>
                    </div>
                </div>
                `;
            });
        }
    })


})();