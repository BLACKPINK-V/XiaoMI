; (function () {
    // 获取元素
    var usernameInput = document.querySelector("#usernameInput");
    var passwordInput1 = document.querySelector("#passwordInput1");
    var passwordInput2 = document.querySelector("#passwordInput2");
    var submitBtn = document.querySelector("#submitBtn");

    // 定义两个变量
    var usernameLock = false;
    var passwordLock = false;

    // 绑定onblur事件
    usernameInput.onblur = function () {
        // 获取输入的内容
        var text = this.value;
        // 定义正则表达式
        var reg = /^[a-zA-Z]\w{2,9}$/;
        // 验证正则表达式
        if (!reg.test(text)) {
            alert("输入的内容应为字母开头、共3~10位");
            usernameLock = false;
            usernameInput.style.border = "2px solid #f00";
            return;
        }

        // 代码如果可以执行到这里 说明正则通过 那么我们才发送ajax
        QF.get("../../php/checkusername.php", { username: text }, function (data) {
            if (data.error === 0) {
                usernameInput.style.border = "2px solid #0f0";
                usernameLock = true;
            } else {
                usernameInput.style.border = "2px solid #f00";
                usernameLock = false;
            }
        })

    }

    // 绑定密码的onblur事件
    passwordInput1.onblur = function () {
        // 获取输入的内容
        var text = this.value;
        // 定义正则表达式
        var reg = /^\w{3,10}$/;
        // 验证正则表达式
        if (!reg.test(text)) {
            passwordLock = false;
            alert("请输入长度3~10之间的数字、字母、下划线组成的密码");
            this.style.border = "2px solid #f00";
            return;
        }
        this.style.border = "2px solid #0f0";
    }


    passwordInput1.onfocus = function() {
        passwordInput2.value = "";
        passwordLock = false;
    }


    passwordInput2.onblur = function () {
        // 获取输入的内容
        var text = this.value;
        // 获取第一次输入的密码
        var psd1 = passwordInput1.value;
        // 定义正则表达式
        var reg = /^\w{3,10}$/;
        // 验证正则表达式
        if (!reg.test(text) || psd1 != text) {
            alert("两次密码不一致或密码不符合要求");
            this.style.border = "2px solid #f00";
            passwordLock = false;
            return;
        }
        this.style.border = "2px solid #0f0";
        passwordLock = true;
    }




    submitBtn.onclick = function() {
        console.log(usernameLock, passwordLock);
        if (!usernameLock || !passwordLock) {
            alert('请重新检查')
            return;
        }

        // 获取用户输入的用户名
        var username = usernameInput.value;
        // 获取用户输入的密码
        var password = passwordInput1.value;

        // 发送ajax
        QF.post("/php/regist.php", {username, password}, function(data) {
            if (!data.error) {
                // 跳转到登录页面
                setTimeout(function() {
                    location.href = "./login.html";
                }, 500);
            }
        })
    }
})();