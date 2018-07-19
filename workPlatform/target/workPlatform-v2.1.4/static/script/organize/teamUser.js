require(["jquery","layer"],function(){var a={container:$("#organizationContainer")};var b=$("#teamAndUserDiv");b.find("#listDiv div[data-userid="+loginUserInfo.userId+"]").find(".icon-down-open-big").hide();a.init=function(){a.search();a.show();a.setEvent();a.showAllTeam();a.setOrRemoveAdmin()};a.setOrRemoveAdmin=function(){layer.closeAll();b.find(".icon-down-open-big").on("click",function(){var i=$(this),e=i.closest("div").data("userid"),h=b.find("#listDiv").data("team-id");var g=(i.offset().top-document.body.scrollTop)+"px";var f=i.offset().left+"px";var j=i.siblings(".owner-mark").length>0?"block":"none";var c=i.siblings(".owner-mark").length<=0?"block":"none";var d=$("<div id='layerDiv'><div class='layer-lg boardBackground floatLayer'><div class='layer-title'><h5>"+TEXT_CONFIG.chengyuan+"菜单</h5><i class='icon-cancel-circled-outline'></i></div><ul><li style='display:"+c+"'><a id='setAdmin'> <i class='icon-user-outline'></i>设为管理员</a></li><li style='display:"+j+"'><a id='removeAdmin'> <i class='icon-user-outline'></i>移除管理员</a></li></ul></div></div>");$.layer({type:1,shade:[0],area:["auto","auto"],title:false,border:[0],closeBtn:false,offset:[g,f],fix:false,page:{html:d.html()},success:function(k){$(k).click(function(){return false});$(k).on("click",".icon-cancel-circled-outline",function(){layer.closeAll()});$(k).on("click","#setAdmin",function(){$.ajax({url:context+"/team/setTeamAdmin.htm",data:{teamId:h,userId:e},type:"post",success:function(l){if(l&&l.success){layer.closeAll();i.after('<a class="owner-mark " data-title="拥有者"><i class="icon-crown"></i></a>')}else{if(l&&l.errormsg){layer.alert(l.errormsg,1)}else{layer.alert("请求失败",1)}}}})});$(k).on("click","#removeAdmin",function(){$.ajax({url:context+"/team/removeTeamAdmin.htm",data:{teamId:h,userId:e},type:"post",success:function(l){if(l&&l.success){layer.closeAll();i.siblings(".owner-mark").remove()}else{if(l&&l.errormsg){layer.alert(l.errormsg,1)}else{layer.alert("请求失败",1)}}}})})}})})};a.setEvent=function(){$("#listDiv").on("click","#teamUser",function(){if(!$("#teamUser").hasClass("select")){$.ajax({url:context+"/team/teamUser.htm",data:{teamId:$("#listDiv").data("team-id")},type:"post",success:function(c){if(c&&c.success){var d=c.resultData.users;if($("#orgUser").hasClass("select")){$("#orgUser").removeClass("select")}$("#teamUser").addClass("select");$("#listDiv").find("div.user-block").remove();$("#teamUser").html("现有"+TEXT_CONFIG.tuandui+"人员("+d.length+")");$.each(d,function(g,h){var f=h.name;if(f.length>4){f=f.substr(0,4)+"..."}var e=$('<div class="user-block corner-6" data-userid='+h.userId+"><img src="+h.logo+' class="img-circle"/><h4 title="value.name">'+f+"</h4></div>");if(c.resultData.type){e.append("<i class='icon-down-open-big'></i>")}if(h.userId==loginUserInfo.userId){e.find(".icon-down-open-big").remove()}if(h.userRole=="TEAM_ADMIN"){e.append('<a class="owner-mark " title="管理员" data-title="拥有者"><i class="icon-crown"></i></a>')}$("#listDiv").append(e);a.setOrRemoveAdmin()})}else{layer.alert("请求失败",1)}}})}});$("#listDiv").on("click","#orgUser",function(){if(!$("#orgUser").hasClass("select")){$.ajax({url:context+"/team/findUserFromOrg.htm",data:{orgId:$("#id").val(),teamId:$("#listDiv").data("team-id")},type:"post",success:function(c){if(c&&c.success){if($("#teamUser").hasClass("select")){$("#teamUser").removeClass("select")}var e=c.resultData.orgUsers;var d=c.resultData.type;$("#listDiv").find("div.user-block").remove();$("#listDiv").attr("data-type",d?d:false);$("#orgUser").addClass("select");$.each(e,function(g,h){var f=h.name;if(f.length>4){f=f.substr(0,4)+"..."}if(h.belongTeam){$("#listDiv").append('<div data-rolecode="'+h.userRole+'" class="user-block corner-6 select" data-userid='+h.userId+"><img src="+h.logo+' class="img-circle"/><h4 title="'+h.name+'">'+f+'</h4><i class=" icon-ok-2"></i></div>')}else{$("#listDiv").append('<div data-rolecode="'+h.userRole+'" class="user-block corner-6" data-userid='+h.userId+"><img  src="+h.logo+' class="img-circle"/><h4 title="'+h.name+'">'+f+"</h4></div>")}})}else{if(c&&c.errormsg){layer.alert(c.errormsg,1)}else{layer.alert("请求失败",1)}}}})}return false});$("#listDiv").on("click","div.user-block",function(){var c=$(this);if(!$("#orgUser").hasClass("select")){return false}var f=$(this);var e={userId:$(this).data("userid"),teamId:$("#listDiv").data("team-id")};if(e.userId==loginUserInfo.userId){return false}if(f.hasClass("select")){var d=$("#listDiv").data("type");if(!d&&$(this).data("rolecode")=="TEAM_ADMIN"){layer.alert("无权限");return false}$.ajax({url:context+"/team/delUser.htm",data:e,type:"post",success:function(g){if(g&&g.success){var h=$("#teamUser").text().replace("现有"+TEXT_CONFIG.tuandui+"人员","").replace("(","").replace(")","")-1;$("#teamUser").html("现有"+TEXT_CONFIG.tuandui+"人员("+h+")");f.removeClass("select");f.find("i.icon-ok-2").remove();return}else{layer.alert("请求失败",1)}}})}else{$.ajax({url:context+"/team/addUser.htm",data:e,type:"post",success:function(g){if(g&&g.success){var h=$("#teamUser").text().replace("现有"+TEXT_CONFIG.tuandui+"人员","").replace("(","").replace(")","")*1+1;$("#teamUser").html("现有"+TEXT_CONFIG.tuandui+"人员("+h+")");f.addClass("select");f.find("h4").after('<i class=" icon-ok-2"></i>');return false}else{layer.alert("请求失败",1)}}})}return false});$("#teamDiv").on("mouseover","li",function(){$(this).find("button").show()});$("#teamDiv").on("mouseout","li",function(){$(this).find("button").hide()});$("#teamDiv").on("click","button",function(){var c=$(this);var d={proId:$(this).parent().data("project-id"),teamId:$("#listDiv").data("team-id")};$.ajax({url:context+"/project/removeTeamByPro.htm",data:d,type:"post",success:function(e){if(e&&e.success){c.parent().remove();if($("#show").children("li").length<=0){$("#show").attr("hidden",true);$("#info").show()}var f=$("#teamDiv").find("h4").html().replace(""+TEXT_CONFIG.tuandui+"参与的"+TEXT_CONFIG.xiangmu,"").replace("(","").replace(")","")-1;$("#teamDiv").find("h4").html(""+TEXT_CONFIG.tuandui+"参与的"+TEXT_CONFIG.xiangmu+"("+f+")")}else{if(e&&e.errormsg){layer.alert(e.errormsg,1)}else{layer.alert("请求失败",1)}}}})})};a.show=function(){if($("#show").children("li").length>0){$("#show").attr("hidden",false);$("#info").hide()}else{$("#show").attr("hidden",true)}};a.search=function(){$("#list").on("click","li",function(){$("#search").focus();var c=$(this).find("a").html(),e=$(this).data("project-id"),d=$(this).find("img").attr("src");$.ajax({url:context+"/team/addPro.htm",data:{proId:$(this).data("project-id"),teamId:$("#listDiv").data("team-id")},type:"post",success:function(f){if(f&&f.success){$("#info").hide();$("#show").append("<li data-project-id="+e+"><img src="+d+'  class="corner-3"> <a>'+c+' </a><button class="btn pull-right outer-borer" style="display:none">移除</button> </li>');$("#list").attr("hidden",true);$("#list").empty();a.show();var g=$("#teamDiv").find("h4").html().replace(""+TEXT_CONFIG.tuandui+"参与的"+TEXT_CONFIG.xiangmu,"").replace("(","").replace(")","")*1+1;$("#teamDiv").find("h4").html(""+TEXT_CONFIG.tuandui+"参与的"+TEXT_CONFIG.xiangmu+"("+g+")")}else{if(f&&f.errormsg){layer.alert(f.errormsg,1)}else{layer.alert("请求失败",1)}}}});return false});$(window).on("click",function(){$("#list").empty();$("#list").attr("hidden",true);return false});$("#search").keydown(function(c){if(c.keyCode==13){if($("#list").children("li").length<=0){$.ajax({url:context+"/org/findPro.htm",data:{orgId:$("#id").val(),orgName:$("#search").val(),teamId:$("#listDiv").data("team-id")},type:"post",success:function(d){if(d&&d.success){if(d.resultData!=""){$("#list").attr("hidden",false);$.each(d.resultData,function(e,f){$("#list").append("<li data-project-id="+f.projectId+'><img src="'+f.logoStr+'"   class="corner-3"> <a>'+f.name+" </a></li>")})}}else{if(d&&d.errormsg){layer.alert(d.errormsg,1)}else{layer.alert("请求失败",1)}}}})}}})},a.showAllTeam=function(){var c=this;$("#allTeams").on("click",function(){c.container.load(context+"/team/list.htm?id="+$("#id").val());return false})},a.init()});