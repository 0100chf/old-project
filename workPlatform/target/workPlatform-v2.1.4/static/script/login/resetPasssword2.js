$(function(f){var b=f("#resetPassword2Div"),e=b.data("account"),a=f("#password",b),d=f("#rePassword",b),h=f("#resetPassword",b),g=new InputValidate(a,true,30,0,"password",null),c=new InputValidate(d,true,30,0,"password",null,a);h.on("click",function(i){EventUtil.preventDefault(i);var k={password:hex_hmac_md5(e,a.val()),account:e},j=this;f(j).prop("disabled",true);f.ajax({type:"post",url:context+"/user/updatePassword.htm",data:k,beforeSend:function(){if(!g.checkValidate()||!c.checkValidate()){f(j).prop("disabled",false);return false}return true},success:function(l){if(l&&l.success){window.location=context+"/user/passwordSuccess.htm"}else{if(l&&!l.success&&l.errormsg){layer.alert(l.errormsg,1)}else{layer.alert("请求失败",1)}}f(j).prop("disabled",false)},error:function(){layer.alert("请求失败",1);f(j).prop("disabled",false)}})})});