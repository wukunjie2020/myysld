<?php
    header("Content-type:text/html;charset=utf-8");
    //1.接收前端数据
    $name=$_GET['name'];
    // $email=$_GET['email'];
    $pass=$_GET['pass'];
    // $phonenum=$_GET['phonenum'];

    //2.查询数据库
    $conn=mysql_connect("localhost","root","root");

    if(!$conn){
        echo "出错了。。。";
    }else{
        mysql_select_db("yashilandai",$conn);

        $sqlstr="insert into register(name,pass) values('$name','$pass')";
        $result=mysql_query($sqlstr,$conn);

        mysql_close($conn);

        if($result==1){
            echo "1";
        }else{
            echo "0";
        }

    }

?>