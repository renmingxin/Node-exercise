window.onload = function(){
    // myAjax('GET','/getData2',data=>{
    //     console.log(data);
    // })
}
function myAjax(type='GET',url,params,callback){
    let xmlHttp;
    xmlHttp = new XMLHttpRequest();
    if(type === 'GET'){
        xmlHttp.open(type, url, true);
        xmlHttp.send(null);
    }else if(type === 'POST'){
        xmlHttp.open(type,url);
        xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlHttp.send(params)
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            callback(xmlHttp.responseText)
        }
    }
}

function login(){
    let stuNum = document.getElementById('stuNum').value;
    let password = document.getElementById('password').value;
    let params = `stuNum=${stuNum}&password=${password}`
    myAjax('POST','/login',params,data=>{
        if(data === 'ok'){
            alert('登录成功');
            document.cookie = `stuNum=${stuNum}`;
            setTimeout(()=>{
                location.href = '/main.html'
            },1000)
        }else {
            alert('登录失败')
        }
    })
}