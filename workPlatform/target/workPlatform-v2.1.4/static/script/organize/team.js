require(["jquery","layer"],function(){var a={container:$("#organizationContainer")};a.init=function(){a.options();a.add();a.user()};a.user=function(){var b=this;$("#teamList").on("click",".userList",function(){var c=$(this).parent().data("team-id");layer.closeAll();b.container.load(context+"/team/userList.htm?id="+c);return false})};a.add=function(){$("#addTeam").click(function(){var b=$("<div></div>");b.load(context+"/team/add.htm",function(){$.layer({type:1,shadeClose:false,title:false,closeBtn:[0,false],shade:[0.3,"#000"],border:[0],offset:["200px",""],area:["450px","203px"],page:{html:b.html()},success:function(c){$(c).on("click",function(){return false})}})});return false})},a.options=function(){$("#teamList").on("click",".icon-down-open-big",function(){var b=$(this).closest("div").find('img[data-userid = "'+loginUserInfo.userId+'"]').length;layer.closeAll();var d=$(this).parent();a.teamId=d.data("team-id");a.teamName=d.find("h4").data("team-name");var c=$("<div></div>");c.load(context+"/team/loadTeamMenu.htm?teamId="+a.teamId,function(){$.layer({type:1,shade:[0],area:["auto","175px"],title:false,border:[0],closeBtn:false,offset:[f,e],fix:false,page:{html:c.html()},success:function(h){$(h).on("click",".icon-cancel-circled-outline",function(){layer.closeAll()});$(h).on("click",function(){return false});$(h).on("click","#update",function(){var l=$("#layerDiv");l.empty();l.html(k)});$(h).on("click","#exit",function(){var l=$("#layerDiv");l.empty();l.html(i)});$(h).on("click","#delete",function(){var l=$("#layerDiv");l.empty();l.html(g)});$(h).on("click",".icon-left-open-big",function(){var l=$("#layerDiv");l.empty();l.html(j)});$(h).on("click","#updateBtn",function(){var l=$("#updateName");var m=new InputValidate(l,true,30,0,"",null);var n={teamId:a.teamId,name:$("#updateName").val()};$.ajax({url:context+"/team/update.htm",data:n,type:"post",beforeSend:function(){if(!m.checkValidate()){return false}return true},success:function(p){if(p&&p.success){layer.closeAll();var q=p.resultData;var o;if(q.length>10){o=q.substring(0,10)+"..."}else{o=q}d.find("h4").html(o).attr("title",q).data("team-name",q)}else{if(p&&p.errormsg){layer.alert(p.errormsg,1)}else{layer.alert("请求失败",1)}}}})});$(h).on("click","#exitBtn",function(){$.ajax({url:context+"/team/exit.htm",data:{id:a.teamId},type:"post",success:function(m){if(m&&m.success){var l=d.find(".userNum").text().replace(TEXT_CONFIG.chengyuan,"").replace("(","").replace(")","")-1;d.find(".userNum").html(TEXT_CONFIG.chengyuan+"("+l+")");var n=loginUserInfo.userId;d.find("img[data-userid='"+n+"']").remove();if(d.find("div.user-portrait").children("img")){d.find("div.user-portrait").remove()}layer.closeAll()}else{if(m&&m.errormsg){layer.alert(m.errormsg,1)}else{layer.alert("请求失败",1)}}}})});$(h).on("click","#delBtn",function(){$.ajax({url:context+"/team/del.htm",data:{id:a.teamId},type:"post",success:function(l){if(l&&l.success){d.empty();d.remove("div");layer.closeAll()}else{if(l&&l.errormsg){layer.alert(l.errormsg,1)}else{layer.alert("请求失败",1)}}}})});var j="<div class='layer-lg boardBackground floatLayer'><div class='layer-title'><h5>"+TEXT_CONFIG.tuandui+"菜单</h5><i class='icon-cancel-circled-outline'></i></div><ul><li><a id='update'> <i class='icon-pencil'></i>编辑"+TEXT_CONFIG.tuandui+"名称</a></li><li><a id='exit'> <i class='icon-user-outline'></i>退出"+TEXT_CONFIG.tuandui+"</a></li><li><a id='delete'> <i class='icon-trash'></i>删除"+TEXT_CONFIG.tuandui+"</a></li></ul></div>";var k='<div class="layer-lg boardBackground floatLayer"><div class="layer-title"><h5>编辑'+TEXT_CONFIG.tuandui+'名称</h5><i class=" icon-left-open-big"></i><i class="icon-cancel-circled-outline"></i></div><ul><li><input id="updateName" class=" form-control" type="text" value='+a.teamName+' placeholder="团队名称"></li><li><button id="updateBtn" class="btn green btn-common">保存</button></li></ul></div>';var i='<div class="layer-lg boardBackground floatLayer"><div class="layer-title"><h5>退出'+TEXT_CONFIG.tuandui+'</h5><i class=" icon-left-open-big"></i><i class="icon-cancel-circled-outline"></i></div><ul><li>你确定要退出这个'+TEXT_CONFIG.tuandui+'吗？</li><li><button id="exitBtn" class="btn red btn-common">退出</button></li></ul></div>';var g='<div class="layer-lg boardBackground floatLayer"><div class="layer-title"><h5>删除'+TEXT_CONFIG.tuandui+'</h5><i class=" icon-left-open-big"></i><i class="icon-cancel-circled-outline"></i></div><ul><li>你确定要删除这个'+TEXT_CONFIG.tuandui+'吗？</li><li><button id="delBtn" class="btn red btn-common">删除</button></li></ul></div>'}});return false});var f=($(this).offset().top-document.body.scrollTop)+"px";var e=$(this).offset().left+"px"})};a.layerResize=function(b){$(window).resize(function(){var d=b.offset().top-8+"px";var c=b.offset().left+25+"px";return{top:d,left:c}})};a.init()});