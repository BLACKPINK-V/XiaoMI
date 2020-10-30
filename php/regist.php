<?php
    // 获取前端提交的数据
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 连接数据库
    $conn = mysqli_connect("localhost", "root", "root", "gz2007");

    // 定义sql语句
    $sql = "INSERT INTO userinfo VALUES('$username', '$password')";


    // 执行sql语句
    $result = mysqli_query($conn, $sql);

    // 获取影响行数
    $num = mysqli_affected_rows($conn);

    // 判定
    if ($num == 0) {
        echo json_encode(array("error" => 1, "data" => '注册失败'));
    } else {
        echo json_encode(array("error" => 0, "data" => '注册成功'));
    }
?>