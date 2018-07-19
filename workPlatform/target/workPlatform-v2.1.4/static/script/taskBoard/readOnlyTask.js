require(["jquery","script/common/personList","script/common/dialogAlert","script/taskBoard/addTaskForm",context+"/static/script/taskBoard/installHtml.js?_T="+(new Date()).valueOf(),"jqueryUI","layer","my97","jqueryForm"],function(c,l,a,j,d){var n=c("#updateReadOnlyTaskRightLayer");var q=n.data("taskInfo");var k=c("#completeCode").val();var s=c("#doingCode").val();var r=c("#toCheckCode").val();var e=c("#noPassCode").val();var h=c("#level0Code").val();var g=c("#level1Code").val();var f=c("#itemComplete").val();var o=c("#visibleStatusAllUser").val();var b=c("#visibleStatusTaskMember").val();var m=c("div.main-content[data-id='projectTemplate']");var i={init:function(){if(c("div.main-content[data-id='projectTemplate']").length>0){this.taskBoardPanel=c("div.main-content[data-id='projectTemplate']")}else{this.personanTaskPanel=c("#personalTaskContainer")}this.taskTitleBar=n.find("#taskTitleBar");this.updateTaskContent=n.find("#updateTaskContent");this.updateRemark=n.find("#updateRemark");this.updateExecutor=n.find("#updateExecutor");this.updateEndDate=n.find("#updateEndDate");this.updateLevel=n.find("#updateLevel");this.visibilityUser=n.find("#visibilityUser");this.status=n.find("#status");this.admin=n.find("#admin");this.createdTime=n.find("#createdTime");this.planTime=n.find("#planTime");this.realityTime=n.find("#realityTime");this.updateCheckItem=n.find("#updateCheckItem");this.updatePartner=n.find("#updatePartner");this.updateChildTask=n.find("#updateChildTask");this.tabContent=n.find("#tabContent");this.initData(q);this.setEvent()},initData:function(v){if(!v){return false}var t=this;this.projectId=v.projectId;this.userList={};if(this.taskBoardPanel){this.taskBlock=this.taskBoardPanel.find(".main-task").find("ul > li[data-id='"+v.taskLine.taskLineId+"']").find(".block[data-id='"+v.taskId+"']");this.listTaskLinesData=this.taskBoardPanel.find(".main-task").data("listTaskLinesData");this.boardList=c("#switchTaskBoard",this.taskBoardPanel).data("taskBoardList");this.boardId=c("#switchTaskBoard",this.taskBoardPanel).data("id");n.data("boardId",this.boardId);this.userList=window.projectUserList;this.initSpecialData()}else{this.taskBlock=this.personanTaskPanel.find("li[data-id='"+v.taskId+"']")}this.taskTitleBar.find("#moveOtherStage").text(d.getStrActualLen(v.taskLine.name,20)).data("id",v.taskLine.taskLineId);if(v.status===r){this.taskTitleBar.find("#waitAudit i").show()}else{if(v.status===k){this.taskTitleBar.find("#pass i").show();this.taskTitleBar.find("#taskMenu").hide()}else{if(v.status===e){this.taskTitleBar.find("#notPass i").show()}}}this.updateTaskContent.find("p").text(v.content);if(v.remark&&v.remark.length>0){this.updateRemark.find("a").hide();this.updateRemark.find("span").show();this.updateRemark.find("p").text(v.remark)}if(v.dueTime){var u=new Date(v.dueTime);this.updateEndDate.find("input").val(u.getFullYear()+"年"+p(u.getMonth()+1)+"月"+p(u.getDate())+"日")}if(v.createdTime){var u=new Date(v.createdTime);this.createdTime.find("a").text(u.getFullYear()+"年"+p(u.getMonth()+1)+"月"+p(u.getDate())+"日")}if(v.visibleStatus==o){this.visibilityUser.find("#changeVisibility").html("所有成员可见")}else{this.visibilityUser.find("#changeVisibility").html("仅参与者可见")}if(v.planTime){this.planTime.show();this.planTime.find("a").text(v.planTime)}if(v.realityTime){this.realityTime.show();this.realityTime.find("a").text(v.realityTime)}if(v.priority==h){this.updateLevel.find("#changeLevel").html("<i class='icon-record gray'></i>一般")}else{this.updateLevel.find("#changeLevel").html("<i class='icon-record green'></i>紧急")}if(v.status==s){this.status.find("a").text(c("#doingText").val())}else{if(v.status==k){this.status.find("a").text(c("#completeText").val())}else{if(v.status==r){this.status.find("a").text(c("#toCheckText").val())}else{if(v.status==e){this.status.find("a").text(c("#noPassText").val())}}}}this.loadTaskCheckItem(v.taskId);t.tabContent.find("#fileTaskId").val(v.taskId);t.tabContent.find("#uploadProjectId").val(t.projectId);t.tabContent.find("#switchTab span").text(v.noPassTimes);if(v.noPassReason){var w=v.noPassReason.split("|");c.each(w,function(y,z){var x=c("<li>"+z+"</li>");t.tabContent.find("div.nopassReason ul").append(x)});v.noPassReason.split("|")}this.loadChildTask(v.taskId);this.loadDynamicContent(v.taskId);this.loadTaskAttachments(v.taskId);if(!this.taskBoardPanel){this.getTaskRelatedData()}},getUserInfo:function(w){var u=this;var v={logo:"",name:""};var t=u.userList[w];if(w>0){if(t){v.logo=t.logo;v.name=t.name}}else{v.logo=context+"/static/images/pic-shelters.png";v.name="待认领"}return v},initSpecialData:function(){var u=this;var v=q;if(v.executor>0){var t=u.getUserInfo(v.executor);u.updateExecutor.find("a").html("<img data-id='"+v.executor+"' src='"+t.logo+"' class='img-circle'>"+t.name)}if(v.admin>0){var t=u.getUserInfo(v.admin);u.admin.find("a").html("<img data-id='"+v.admin+"' src='"+t.logo+"' class='img-circle'>"+t.name)}var w="";if(v.partnerIds&&v.partnerIds.length>0){c.each(v.partnerIds,function(x,z){var y=u.getUserInfo(z);w+="<li data-id='"+z+"' title='"+y.name+"'><img src='"+y.logo+"' class='img-circle'></li>"})}this.updatePartner.find("ul").prepend(w);c.each(u.boardList,function(x,y){if(y.taskBoardId==u.boardId){u.taskTitleBar.find("#moveOtherTaskgroup").text(d.getStrActualLen(y.name,20)).data("id",u.boardId);return false}})},reloadUserPic:function(){var t=this;if(t.userList){n.find("img.img-circle[src='']").each(function(){var u=t.getUserInfo(c(this).data("id"));c(this).attr("src",u.logo).attr("title",u.name);c(this).next("a").text(u.name)})}},getTaskRelatedData:function(){var t=this;c.ajax({type:"POST",url:context+"/task/findTaskOtherData.htm",data:{projectId:t.projectId,taskId:q.taskId}}).done(function(u){if(u&&u.success&&u.resultData){t.listTaskLinesData=u.resultData.lineList;t.boardList=u.resultData.boardList;t.boardId=u.resultData.boardId;t.userList=u.resultData.userList;n.data("boardId",t.boardId);t.initSpecialData();t.reloadUserPic()}else{layer.msg(u.errormsg)}}).fail(function(){layer.msg("请求失败")})},loadDynamicContent:function(u){var t=this;c.ajax({type:"post",data:{taskId:u},url:context+"/task/listTaskActionRecords.htm"}).done(function(w){if(w&&w.success){var x="";if(w.resultData){for(var v=0;v<w.resultData.length;v++){x+=t.activityHtml(w.resultData[v])}n.find("#activityContent").append(x);if(t.taskBoardPanel){t.reloadUserPic()}}}else{if(resultData&&!resultData.success){layer.msg(resultData.errormsg)}else{layer.msg("请求失败")}}})},loadTaskCheckItem:function(u){var t=this;c.ajax({type:"post",data:{taskId:u},url:context+"/task/findTaskCheckList.htm"}).done(function(B){if(B&&B.success){var A="";var z=0;if(B.resultData){var v=B.resultData.length;if(v>0){var x=0;for(var y=0;y<v;y++){var C=B.resultData[y];if(C.status==f){x++;A+="<li data-id='"+C.taskCheckListId+"'><span class='checkItemContent'>"+C.listContent+"</span></li>"}else{A+="<li data-id='"+C.taskCheckListId+"'><span class='checkItemContent'>"+C.listContent+"</span></li>"}}t.updateCheckItem.find("ul.check-item").append(A);z=parseInt((x/v)*100)}}var w=c("#progressbar").progressbar({value:z}).css({height:15,background:"#CFCFCF"});w.find(".progress-label").html(z+"%&nbsp;")}else{if(resultData&&!resultData.success){layer.msg(resultData.errormsg)}else{layer.msg("请求失败")}}})},loadChildTask:function(u){var t=this;c.ajax({type:"post",data:{taskId:u},url:context+"/task/findParentAndChildTask.htm"}).done(function(y){if(y&&y.success){if(y.resultData){if(y.resultData.parentTask){t.updateChildTask.find("#parentTask").find("ul").append(d.childTaskHtml(t.userList,y.resultData.parentTask))}else{t.updateChildTask.find("#parentTask").find("ul").text("无")}var w=y.resultData.children.length;if(w>0){var v="";for(var x=0;x<w;x++){var z=y.resultData.children[x];v+=d.childTaskHtml(t.userList,z)}t.updateChildTask.find("#childTask").find("ul").append(v)}else{t.updateChildTask.find("#childTask").find("ul").text("无")}}else{t.updateChildTask.find("#parentTask").find("ul").text("无");t.updateChildTask.find("#childTask").find("ul").text("无")}if(t.taskBoardPanel){t.reloadUserPic()}}else{if(resultData&&!resultData.success){layer.msg(resultData.errormsg)}else{layer.msg("请求失败")}}})},loadTaskAttachments:function(u){var t=this;c.ajax({type:"post",data:{taskId:u},url:context+"/task/findAttachments.htm"}).done(function(x){if(x&&x.success){var v="";if(x.resultData){for(var w=0;w<x.resultData.length;w++){v+=t.fileHtml(x.resultData[w])}n.find("#taskFileContend").append(v);if(t.taskBoardPanel){t.reloadUserPic()}}}else{if(resultData&&!resultData.success){layer.msg(resultData.errormsg)}else{layer.msg("请求失败")}}})},groupIndex:"",stageIndex:"",stageMenuIndex:"",closeAllLayer:function(){c("#selectUserLayer").closest(".xubox_layer").remove();n.find("#alterContentArea").remove();layer.close(this.groupIndex);layer.close(this.stageIndex);layer.close(this.stageMenuIndex);this.updateLevel.find("ul").hide()},taskMenuHtml:function(){return"<div class='layer-lg200 boardBackground floatLayer'><div class='layer-title'><h5>任务菜单</h5><i class='icon-cancel-circled-outline'></i></div><ul><li  id='deleteTask'><a> <i class='icon-pencil'></i>删除任务</a></li></ul></div>"},taskMenuEvent:function(t){var u=this;c(t).on("click",function(){return false});c(t).on("click",".icon-cancel-circled-outline",function(){layer.close(layer.index)});c(t).on("click",".icon-left-open-big",function(){c(t).find(".floatLayer").replaceWith(u.taskMenuHtml())});c(t).on("click","li#deleteTask",function(){c(t).find(".floatLayer").html("<div class='layer-title'><h5>删除任务</h5><i class=' icon-left-open-big'></i><i class='icon-cancel-circled-outline'></i></div><ul><li>您确定要删除这个任务吗?</li><li><button id='deleteSave' class='btn red btn-common'>删除</button></li></ul>");return false});c(t).on("click","#deleteSave",function(){var v=q.taskId;c.ajax({type:"post",data:{taskId:v},url:context+"/task/delTask.htm"}).done(function(w){if(w&&w.success){u.taskBlock.trigger("deleteEvent");layer.closeAll()}else{if(w&&!w.success){layer.msg(w.errormsg)}else{layer.msg("请求失败")}}});return false})},setEvent:function(){var t=this;n.on("click",function(u){t.closeAllLayer();EventUtil.stopPropagation(u)});this.taskTitleBar.find("#taskMenu").on("click",function(){var v=c(this).offset().top+c(this).height()+5+"px";var u=c(this).offset().left-120+"px";t.stageMenuIndex=c.layer({type:1,title:false,area:["auto","auto"],offset:[v,u],border:[0],shade:[0,"#FFFFFF"],closeBtn:[0],page:{html:t.taskMenuHtml()},success:function(w){t.taskMenuEvent(w)}});return false});this.taskTitleBar.on("click","#pass",function(){var u=c(this);if(!u.find("i").is(":hidden")){return}if(c.inArray("TASK:PASS",q.permits)==-1){layer.msg("没有权限");return}layer.confirm("是否通过审核？确定后，该任务就完成了，不可再恢复状态了。",function(){c.ajax({type:"post",data:{taskId:q.taskId,status:k},url:context+"/task/updateTaskStatus.htm"}).done(function(w){if(w&&w.success){u.find("i").show();u.siblings("#notPass").find("i").hide();t.taskBlock.trigger("taskStatusEvent",[{status:k}]);var v=m.find(".block[data-id="+q.taskId+"]");v.find("i.icon-ok").show();v.appendTo(v.closest("li").find(".taskDoneList"));d.updateTaskCount(v.closest("li"));layer.closeAll()}else{if(w&&!w.success){layer.msg(w.errormsg)}else{layer.msg("请求失败")}}})})});this.taskTitleBar.on("click","#notPass",function(){var v=c(this);if(!v.find("i").is(":hidden")){return}if(c.inArray("TASK:NOT_PASS",q.permits)==-1){layer.msg("没有权限");return}var u=c("<div></div>");u.load(context+"/task/loadNoPassReason.htm",function(){c.layer({type:1,shadeClose:false,title:false,closeBtn:[0,false],shade:[0.3,"#000"],border:[0],offset:["200px",""],area:["450px","203px"],page:{html:u.html()},success:function(w){c(w).on("click",function(){return false});c(w).on("click",".icon-cancel-circled",function(){layer.close(layer.index)});var y=c(w).find("#reason");var x=new InputValidate(y,true,500,0,"verticalline",null);c(w).on("click","#addReason",function(){if(!x.checkValidate()){return false}c.ajax({type:"post",data:{taskId:q.taskId,status:e,noPassReason:y.val()},url:context+"/task/updateTaskStatus.htm"}).done(function(z){if(z&&z.success){v.find("i").show();v.siblings("#pass").find("i").hide();t.taskBlock.trigger("taskStatusEvent",[{status:e}]);layer.closeAll()}else{if(z&&!z.success){layer.msg(z.errormsg)}else{layer.msg("请求失败")}}}).fail(function(){layer.msg("请求失败")});return false})}})})});this.tabContent.find("#switchTab").on("click","li",function(){t.closeAllLayer();if(c(this).hasClass("active")){return false}c(this).addClass("active").siblings().removeClass("active");var u=c(this).index();if(u==0){t.tabContent.find(".activity-detail").show();t.tabContent.find(".nopassReason").hide();t.tabContent.find(".tab-accessory").hide();n.find(".panel-content").css("bottom","0px")}else{if(u==1){t.tabContent.find(".activity-detail").hide();t.tabContent.find(".tab-accessory").show();t.tabContent.find(".nopassReason").hide();n.find(".panel-content").css("bottom","0px")}else{if(u==2){t.tabContent.find(".activity-detail").hide();t.tabContent.find(".tab-accessory").hide();t.tabContent.find(".nopassReason").show()}}}});this.uploadFile();return false},activityHtml:function(v){var u=this;var t=u.getUserInfo(v.userId);var w="";w+="<li>";w+="<img data-id='"+v.userId+"' src='"+t.logo+"' class='img-circle'><a>"+t.name+" </a> <time class='pull-right'>"+new Date(v.createdTime).format("YYYY-MM-dd hh:mm:ss")+"</time>";w+="<ul class='accessory-area'>";w+="<li>";w+="<div>"+v.record+"</div>";w+="</li>";w+="</ul>";w+="</li>";return w},fileHtml:function(v){var u=this;var t=u.getUserInfo(v.createdBy);var w="";w+="<li>";w+="<img data-id='"+v.createdBy+"' src='"+t.logo+"' class='img-circle'><a>"+t.name+"</a> <time class='pull-right'>"+new Date().format("YYYY-MM-dd hh:mm:ss")+"</time>";w+="<ul class='accessory-area'>";w+="<li>";w+="<span name='taskFile' data-fileUrl='"+v.fileUrl+"'><a><i class=' icon-doc-text-1'></i>"+v.fileName+"</a> </span>";w+="</li>";w+="</ul>";w+="</li>";return w},uploadFile:function(){var t=this;n.find("#taskFileContend").on("click","li span[name='taskFile']",function(){var u=n.find("#downLoadFileForm");u.find('input[name="fileUrl"]').val(c(this).data("fileurl"));u.find('input[name="remove_cache"]').val((new Date()).getTime());u.submit().before(u.clone(true).val("")).remove()})}};function p(t){return t>=10?t:("0"+t)}i.init();return i});