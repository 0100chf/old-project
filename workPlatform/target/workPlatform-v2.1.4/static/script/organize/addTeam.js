require(["jquery"],function(){var a={dom:$(".team-block corner-6"),container:$("#organizationContainer"),init:function(){this.setEvent()},setEvent:function(){var b=this;$("#exit").click(function(){layer.closeAll()});$("#add").click(function(){var e={id:$("#id").val(),name:$("#name").val()};var c=$("#name");var d=new InputValidate(c,true,30,0,"",null);$.ajax({url:context+"/team/create.htm",type:"post",data:e,beforeSend:function(){if(!d.checkValidate()){return false}return true},success:function(f){if(f&&f.success){layer.closeAll();b.container.load(context+"/team/list.htm?id="+$("#id").val())}else{if(f&&f.errormsg){layer.alert(f.errormsg,1)}else{layer.alert("请求失败",1)}}}})})}};a.init()});