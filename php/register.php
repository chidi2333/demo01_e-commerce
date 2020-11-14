<?php
    header('content-type:text/html;charset="utf-8"');
    $responseData = array("code" => 0, "message" => "");
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    
    if(!$username){
        $responseData['code'] = 1;
        $responseData["message"] = "用户名不能为空";

        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData['code'] = 2;
        $responseData["message"] = "密码不能为空";

        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData['code'] = 3;
        $responseData["message"] = "两次输入密码不一致";

        echo json_encode($responseData);
        exit;
    }

    $link=mysql_connect("localhost","root",'123456');

    if(!$link){
        $responseData['code'] = 4;
        $responseData["message"] = "服务器忙";

        echo json_encode($responseData);
        exit;
    }
    mysql_set_charset("utf8");
    mysql_select_db("fanke");


	$sql = "SELECT * FROM users WHERE username='{$username}'";

	$res = mysql_query($sql);

	$row = mysql_fetch_assoc($res);

	if(!$row){

		$str = md5(md5(md5($password).'beijing').'zhongguo');

		$sql2 = "INSERT INTO users(username,password) VALUES('{$username}','{$str}')";
       
        $res = mysql_query($sql2);
		if($res){
			$responseData['message'] = "注册成功";
			echo json_encode($responseData);
		}else{
			$responseData['code'] = 5;
			$responseData['message'] = "注册失败";
			echo json_encode($responseData);
		}
	}else{
		$responseData['code'] = 6;
		$responseData['message'] = "用户名重名";
		echo json_encode($responseData);
		exit;
	}

	mysql_close($link);
?>