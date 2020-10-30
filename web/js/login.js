; (function () {
    // 获取元素
    var usernameInput = document.querySelector("#usernameInput");
    var passwordInput1 = document.querySelector("#passwordInput1");
    var submitBtn = document.querySelector("#submitBtn");



    submitBtn.onclick = function() {
      

        // 获取用户输入的用户名
        var username = usernameInput.value;
        // 获取用户输入的密码
        var password = passwordInput1.value;

        // 发送ajax
        QF.post("/php/login.php", {username, password}, function(data) {
            if (!data.error) {
                // 跳转到登录页面
                setTimeout(function() {
                    location.href = "./list.html";
                }, 500);
            }
        })
    }
})();