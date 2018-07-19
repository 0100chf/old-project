define(["jquery","script/common/personList","script/taskBoard/addTaskForm",context+"/static/script/taskBoard/installHtml.js?_T="+(new Date()).valueOf(),"script/taskBoard/chart","script/chat/startChat","jqueryUI","layer"],function(f,b,q,i,h,l){var a=f("div.main-content[data-id='projectTemplate']");var g=f("#level1Code").val();var p=false;var j=false;var m={};var o=f("#completeCode").val();var n=f("#doingCode").val();var e=f("#toCheckCode").val();var d=f("#noPassCode").val();var k={init:function(){this.projectChartContainer=f(".project-chart",a);this.projectTaskContainer=f(".main-task",a);this.switchButton=a.find("#switchTaskBoard");this.getListTaskBoard();this.windowEvent();c.init();h.init()},windowEvent:function(){var r=this;f(document).on("click",function(){r.projectTaskContainer.find(".addTaskForm").empty();r.projectTaskContainer.find(".addTaskButton").show()});f(window).resize(function(){r.resizeStageHeight()});r.projectChartContainer.on("click","#upOrDown",function(){if(f(this).hasClass("up_arrow")){r.projectChartContainer.find(".chart-wrap").hide();f(this).removeClass("up_arrow").addClass("down_arrow");r.projectTaskContainer.css("top",105);f(this).next("span").text("展开图表")}else{r.projectChartContainer.find(".chart-wrap").show();f(this).removeClass("down_arrow").addClass("up_arrow");r.projectTaskContainer.css("top",300);f(this).next("span").text("收起图表")}r.resizeStageHeight()})},getListTaskBoard:function(){var s=this;var r=a.data("projectId");f.ajax({type:"post",data:{projectId:r},url:context+"/task/listTaskBoard.htm"}).done(function(t){if(t&&t.success){if(t.resultData&&t.resultData.length){s.switchButton.data("taskBoardList",t.resultData);var u=t.resultData[0];s.getTaskLineData(u.name,u.remark,u.taskBoardId)}}else{if(t&&!t.success){layer.msg(t.errormsg)}else{layer.msg("请求失败")}}})},getTaskLineData:function(s,t,u){var r=this;f.ajax({type:"post",data:{boardId:u,roleType:0},url:context+"/task/listTaskLines.htm"}).done(function(w){if(w&&w.success){if(w.resultData){var x=r.switchButton.data("taskBoardList"),v=null;f.each(x,function(z,y){if(y.taskBoardId==u){v=y}});r.switchButton.data("currentBoard",v);r.getInitData(w.resultData,v);r.projectTaskContainer.data("listTaskLinesData",w.resultData);r.switchButton.find("span.name").text(i.getStrActualLen(s,24)).attr("title",s);r.switchButton.data("id",u)}}else{if(w&&!w.success){layer.msg(w.errormsg)}else{layer.msg("请求失败")}}})},getInitData:function(s,r){this.createTaskBoardModel(s,r)},createTaskBoardModel:function(u,s){var v="";for(var t=0;t<u.length;t++){var r=u[t];v+=i.stageHtml(r,s);this.projectChartContainer.find(".check-select").find("i.icon-ok").hide();this.projectChartContainer.find(".check-select").find("li#all").find("i.icon-ok").show()}this.projectTaskContainer.find("ul").empty().append(v);this.setEvent();this.resizeStageHeight()},stageMenuHtml:function(){return"<div class='layer-lg boardBackground floatLayer'><div class='layer-title'><h5>任务列菜单</h5><i class='icon-cancel-circled-outline'></i></div><ul><li id='updateStage'><a><i class='icon-pencil'></i>编辑</a></li><li id='addStage'><a> <i class='icon-user-outline'></i>在此后添加任务列</a></li><li id='deleteStage'><a><i class='icon-trash'></i>删除</a></li></ul></div>"},setStageEvent:function(r,u){var s=this;var t=s.projectTaskContainer.find("li[data-id='"+u+"']");var v=null;f(r).on("click",function(w){return false});f(r).on("click","#updateStage",function(){f(r).find(".floatLayer").html("<div class='layer-title'><h5>编辑</h5><i class=' icon-left-open-big'></i><i class='icon-cancel-circled-outline'></i></div><ul><li><input class='form-control' type='text'  placeholder='请输入任务列名称' value='"+t.find(".top").find("span.stageName").attr("title")+"'></li><li><button id='updateSave' class='btn green btn-common'>保存</button></li></ul>");v=new InputValidate(f(r).find("input"),true,40)});f(r).on("click","#addStage",function(){f(r).find(".floatLayer").html("<div class='layer-title'><h5>在此后添加任务列</h5><i class=' icon-left-open-big'></i><i class='icon-cancel-circled-outline'></i></div><ul><li><p>新任务列将被添加在当前任务列之后</p></li><li><input class=' form-control' type='text' placeholder='请输入任务列名称'></li><li><button id='addSave' class='btn green btn-common'>添加</button></li></ul>");v=new InputValidate(f(r).find("input"),true,40)});f(r).on("click","#deleteStage",function(){f(r).find(".floatLayer").html("<div class='layer-title'><h5>删除</h5><i class=' icon-left-open-big'></i><i class='icon-cancel-circled-outline'></i></div><ul><li>您确定要删除这个任务列吗?</li><li><button id='deleteSave' class='btn red btn-common'>删除</button></li></ul>")});f(r).on("click",".icon-left-open-big",function(){f(r).find(".floatLayer").replaceWith(s.stageMenuHtml())});f(r).on("click",".icon-cancel-circled-outline",function(){layer.closeAll()});f(r).on("click","#updateSave",function(){var x=f(this).closest("ul").find(".form-control").val();if(!v.checkValidate()){return false}var w=f(this);w.prop("disabled",true);f.ajax({type:"post",data:{taskLineId:u,name:x},url:context+"/task/updateLineName.htm"}).done(function(y){if(y&&y.success){t.find(".top").find("span.stageName").text(i.getStrActualLen(x,20)).attr("title",x);s.updateLineData("update",{taskLineId:u,name:x});layer.closeAll()}else{if(y&&!y.success){layer.msg(y.errormsg)}else{layer.msg("请求失败")}}w.prop("disabled",false)}).fail(function(){layer.msg("请求失败");w.prop("disabled",false)})});f(r).on("click","#addSave",function(){var x=f(this).closest("ul").find(".form-control").val();if(!v.checkValidate()){return false}var w=f(this);w.prop("disabled",true);f.ajax({type:"post",data:{targetLineId:u,name:x},url:context+"/task/addLine.htm"}).done(function(y){if(y&&y.success){var A=s.switchButton.data("currentBoard");var z=i.stageHtml({taskLineId:y.resultData,name:x,tasks:[],doneTasks:[]},A);s.updateLineData("add",{targetLineId:u,taskLineId:y.resultData,name:x});f(z).insertAfter(s.projectTaskContainer.find("ul li[data-id='"+u+"']"));s.taskAccordion();s.taskSortable();s.resizeStageHeight();layer.closeAll()}else{if(y&&!y.success){layer.msg(y.errormsg)}else{layer.msg("请求失败")}}w.prop("disabled",false)}).fail(function(){layer.msg("请求失败");w.prop("disabled",false)})});f(r).on("click","#deleteSave",function(){var w=f(this);w.prop("disabled",true);f.ajax({type:"post",data:{taskLineId:u},url:context+"/task/delLine.htm"}).done(function(x){if(x&&x.success){t.remove();s.updateLineData("delete",{taskLineId:u});layer.close(layer.index)}else{if(x&&!x.success){layer.msg(x.errormsg)}else{layer.msg("请求失败")}}w.prop("disabled",false)}).fail(function(){layer.msg("请求失败");w.prop("disabled",false)})})},updateLineData:function(y,u){var A=this;var w=this.projectTaskContainer.data("listTaskLinesData");var s=A.switchButton.data("id");var t=this.switchButton.data("taskBoardList");if(t){var x=t.length;for(var v=0;v<x;v++){if(t[v].taskBoardId==s){if(y=="add"){f.each(t[v].taskLines,function(D,C){if(u.targetLineId==C.taskLineId){t[v].taskLines.splice(D+1,0,u);return false}})}else{if(y=="update"){f.each(t[v].taskLines,function(C,D){if(u.taskLineId==D.taskLineId){t[v].taskLines[C].name=u.name;return false}})}else{if(y=="delete"){f.each(t[v].taskLines,function(D,C){if(u.taskLineId==C.taskLineId){t[v].taskLines.splice(D,1);return false}})}}}this.switchButton.data("taskBoardList",t);break}}}if(y=="add"){f.each(w,function(D,C){if(u.targetLineId==C.taskLineId){w.splice(D+1,0,u);return false}})}else{if(y=="update"){f.each(w,function(D,C){if(u.taskLineId==C.taskLineId){w[D].name=u.name;return false}})}else{if(y=="delete"){f.each(w,function(D,C){if(u.taskLineId==C.taskLineId){w.splice(D,1);return false}})}else{if(y=="sort"){var B="",z="",r="";f.each(w,function(D,C){if(u.oneselfId==C.taskLineId){B=C;z=D}if(u.targetId==C.taskLineId){r=D}});if(B!=""){if(u.targetId>0){w.splice(z,1);if(z>r){w.splice(r+1,0,B)}else{w.splice(r,0,B)}}else{w.splice(z,1);w.splice(0,0,B)}}}}}}this.projectTaskContainer.data("listTaskLinesData",w)},layerPosition:function(u){var s=f(u).offset();var t=s.top+f(u).height()+10+"px";var r=s.left-120+"px";return{top:t,left:r}},resizeStageHeight:function(){var r=this.projectTaskContainer.height()-145;this.projectTaskContainer.find(".isNoOverWork").height(r);this.projectTaskContainer.find(".taskDoneList").height(r)},taskSortable:function(){var r=this;j=false;r.projectTaskContainer.find(".taskList").sortable({connectWith:".taskList",cursor:"move",items:".block",dropOnEmpty:true,placeholder:"portlet-placeholder",cancel:".addTaskButton,.top,.check-box",update:function(){j=true},start:function(s,t){m.oneselfLineId=t.item.closest("li").data("id")},stop:function(w,y){var x=f(this);if(window.readOnly){x.sortable("cancel");return}if(j){var z=y.item.data("id"),u=y.item.data("sort"),s=y.item.data("line"),t=y.item.prev(".block").data("id"),v=r.switchButton.data("currentBoard");m.targetLineId=y.item.closest("li").data("id");m.oneselfId=z;m.targetId=t==undefined?0:t;if(m.oneselfLineId==m.targetLineId){if(!u){layer.msg("没有权限");x.sortable("cancel");return}}else{if(!s){layer.msg("没有权限");x.sortable("cancel");return}}f.ajax({type:"post",data:m,url:context+"/task/moveTask.htm"}).done(function(A){if(A&&A.success){i.updateTaskCount(y.item.closest("li"));if(m.oneselfLineId!=m.targetLineId){i.updateTaskCount(r.projectTaskContainer.find("li[data-id='"+m.oneselfLineId+"']"))}}else{if(A&&!A.success){x.sortable("cancel");layer.msg(A.errormsg)}else{x.sortable("cancel");layer.msg("请求失败")}}m={}}).fail(function(){x.sortable("cancel");layer.msg("请求失败");m={}})}j=false}})},taskAccordion:function(){this.projectTaskContainer.find(".taskAccordion").accordion({collapsible:true,autoHeight:true,heightStyle:"content"})},filterTask:function(s){var r=this;var t=this.switchButton.data("currentBoard");f.ajax({type:"post",url:context+"/task/listTaskLines.htm",data:{boardId:t.taskBoardId,roleType:s}}).done(function(x){if(x&&x.resultData){var v=x.resultData.length;var y="";for(var w=0;w<v;w++){var u=x.resultData[w];y+=i.stageHtml(u,t)}r.projectTaskContainer.find("ul").empty().append(y);r.setEvent();r.resizeStageHeight()}else{if(x&&!x.success){layer.msg(x.errormsg)}else{layer.msg("请求失败")}}r.projectChartContainer.find(".check-select").find("li").prop("disabled",false)}).fail(function(){layer.msg("请求失败");r.projectChartContainer.find(".check-select").find("li").prop("disabled",false)})},setEvent:function(){var r=this;r.projectChartContainer.find(".check-select").off("click","li");r.projectChartContainer.find(".check-select").on("click","li",function(){var s=f(this).data("value");if(f(this).find("i.icon-ok").is(":visible")){return false}else{r.projectChartContainer.find(".check-select").find("li").prop("disabled",true);f(this).find("i.icon-ok").show().end().siblings().find("i.icon-ok").hide()}r.filterTask(s)});r.projectTaskContainer.off("click","a.stageMenu");r.projectTaskContainer.on("click","a.stageMenu",function(u){layer.closeAll();var t=r.layerPosition(f(this));var s=f(this).closest("li").data("id");r.createLayerIndex=f.layer({type:1,title:false,area:["auto","auto"],offset:[t.top,t.left],border:[0],shade:[0,"#FFFFFF"],closeBtn:[0],page:{html:r.stageMenuHtml()},success:function(v){r.setStageEvent(v,s)}});return false});r.taskAccordion();r.taskSortable();r.projectTaskContainer.find("ul.horizontal-scroll").sortable({placeholder:"portlet-placeholder",item:".top",cancel:".addTaskForm,.addTaskButton,.taskList,.taskDoneList",update:function(){p=true},stop:function(w,x){var u=f(this),v=r.switchButton.data("currentBoard");if(p){if(f.inArray("TASK_LINE:MOVE",v.permits)==-1){layer.msg("没有权限");u.sortable("cancel");return}if(window.readOnly){u.sortable("cancel");return}var y=x.item.data("id"),t=x.item.prev("li").data("id");var s={oneselfId:y,targetId:t==undefined?0:t};f.ajax({type:"post",data:s,url:context+"/task/moveTaskLine.htm"}).done(function(z){if(z&&z.success){r.updateLineData("sort",s)}else{if(z&&!z.success){u.sortable("cancel");layer.msg(z.errormsg)}else{u.sortable("cancel");layer.msg("请求失败")}}}).fail(function(){u.sortable("cancel");layer.msg("请求失败")})}p=false}});r.projectTaskContainer.find("div.taskList,.taskDoneList").off("click","span.check-box");r.projectTaskContainer.find("div.taskList,.taskDoneList").on("click","span.check-box",function(x){if(f(this).prev(".taskPriority ").hasClass("border-yellow")){return false}var t;var y=f(this).find("i");var v=f(this).closest(".block").data("id");var s=f(this).closest("li");var w=f(this);w.prop("disabled",true);if(y.is(":hidden")){t=true}else{t=false}var u=f(this).find("i").is(":hidden")?e:n;f.ajax({type:"post",data:{taskId:v,status:u},url:context+"/task/updateTaskStatus.htm"}).done(function(z){if(z&&z.success){if(t){w.prev().addClass("border-yellow")}else{y.hide();w.closest(".block").appendTo(w.closest("li").find(".taskList"))}i.updateTaskCount(s);layer.closeAll()}else{if(z&&!z.success){layer.msg(z.errormsg)}else{layer.msg("请求失败")}}w.prop("disabled",false)}).fail(function(){layer.msg("请求失败");w.prop("disabled",false)});return false});r.projectTaskContainer.off("click",".addTaskButton");r.projectTaskContainer.on("click",".addTaskButton",function(t){var s=f(this).closest("li").find(".addTaskForm");if(s.children().length>0){return}r.projectTaskContainer.find(".addTaskForm").empty();r.projectTaskContainer.find(".addTaskButton").show();q.init(window.projectUserList,s);f(this).closest("li").find(".addTaskButton").hide();return false});r.projectTaskContainer.off("click",".taskList .block,.taskDoneList .block");r.projectTaskContainer.on("click",".taskList .block,.taskDoneList .block",function(s){i.openTaskInfo(f(this));r.updateTaskEvent(f(this).closest("div.block"));return false});r.projectTaskContainer.off("click",".block i.icon-chat");r.projectTaskContainer.on("click",".block i.icon-chat",function(){var t=f(this).closest(".block");var u=t.data("id");var s=t.text();l.init(u,"00301","1","",s);return false})},updateTaskEvent:function(s){var r=this;s.off("deleteEvent").on("deleteEvent",function(){var t=s.parent();s.remove();i.updateTaskCount(t.closest("li"))});s.off("moveToOtherBoardEvent").on("moveToOtherBoardEvent",function(t,u){s.remove();r.getTaskLineData(u.targetLineName,"",u.targetLineId)});s.off("moveToOtherLineEvent").on("moveToOtherLineEvent",function(u,v){var t=r.projectTaskContainer.find("ul > li[data-id='"+v.targetLineId+"']");if(v.status==o){t.find(".taskDoneList").append(s)}else{t.find(".taskList").append(s)}i.updateTaskCount(t);i.updateTaskCount(r.projectTaskContainer.find("ul > li[data-id='"+v.selfLineId+"']"))});s.off("taskCheckBoxSelectEvent").on("taskCheckBoxSelectEvent",function(v,w){var t=r.projectTaskContainer.find("ul > li[data-id='"+w.taskLineId+"']");var u=t.find("div.block[data-id='"+w.taskId+"']");if(w.select){u.appendTo(t.find(".taskDoneList"));u.find("i").show()}else{u.find("i").hide();u.appendTo(t.find(".taskList"))}i.updateTaskCount(t)});s.off("taskContentEvent").on("taskContentEvent",function(t,u){s.find("div.word").text(u.content)});s.off("taskExecutorEvent").on("taskExecutorEvent",function(u,v){var t=r.getUserInfo(v.executor);s.find("img").attr("src",t.logo).attr("title",t.name)});s.off("taskStatusEvent").on("taskStatusEvent",function(t,u){if(u.status==e){s.find(".taskPriority").removeClass("border-red").addClass("border-yellow").attr("title",f("#toCheckText").val())}else{if(u.status==n){s.find(".taskPriority").removeClass("border-yellow border-red").removeAttr("title")}else{if(u.status==d){s.find(".taskPriority").removeClass("border-yellow").addClass("border-red").attr("title",f("#noPassText").val())}else{if(u.status==o){s.find(".taskPriority").removeClass("border-yellow border-red").addClass("border-green").attr("title",f("#completeText").val())}}}}});s.off("taskPriorityEvent").on("taskPriorityEvent",function(t,u){if(u.priority==g){s.addClass("block-green").attr("title",f("#level1Text").val())}else{s.removeClass("block-green").removeAttr("title")}})},getUserInfo:function(t){var s={logo:"",name:""};var r=window.projectUserList[t];if(t>0){if(r){s.logo=r.logo;s.name=r.name}}else{s.logo=context+"/static/images/pic-shelters.png";s.name="待认领"}return s}};var c={init:function(){this.switchButton=a.find("#switchTaskBoard");this.setEvent()},taskBoardGroupHtml:function(){var s=this.switchButton.data("taskBoardList");var t="";var r=window.readOnly?"":"<a id='addTaskBoardBtn'><i class='icon-plus-circle'></i>添加</a>";t+="<div class='layer-left  boardBackground clear-radius'><div class='layer-top task-infor '><h5>任务板</h5>"+r+"</div><ul id='addTaskBoardGroup' style='display:none'><li><input class='form-control' type='text' placeholder='任务板名称'><textarea class='form-control'  placeholder='任务板描述'></textarea><button class='btn green btn-common'>新建</button></li></ul> <ul id='taskBoardList'>";if(s){f.each(s,function(v,x){var w={logo:"",name:""};var u=window.projectUserList[x.boardAdmin];if(u){w.logo=u.logo;w.name=u.name}t+="<li data-id='"+x.taskBoardId+"' title='"+x.name+"'><a>"+i.getStrActualLen(x.name,24)+"</a>";if(!window.readOnly&&((f.inArray("TASK_BOARD:SET",x.permits)>=0&&loginUserInfo.userId==x.boardAdmin)||f.inArray("PRJ:ADMIN_ACCESS",x.permits)>=0)){t+="<span class='pull-right'><i class='icon-pencil' title='修改'></i><i class='icon-trash' title='删除'></i></span>"}t+="<span class='creator'>管理员：<a><img data-id='"+x.boardAdmin+"' src='"+w.logo+"' class='img-circle little-pic'>"+w.name+"</a></span><span class='desc'>"+(x.remark?x.remark:"")+"</span></li>"})}t+="</ul></div>";return t},updateTaskBoardGroupHtml:function(){return"<ul id='updateTaskBoardGroup'><li><input class='form-control' type='text' placeholder='任务板名称'><textarea class='form-control' placeholder='任务板描述'></textarea><button class='btn green btn-common'>保存</button></li></ul>"},updateBoardInfo:function(t,s){var v=this.switchButton.data("taskBoardList");if(v){var u=v.length;for(var r=0;r<u;r++){if(v[r].taskBoardId==s.taskBoardId){if(t=="update"){f.each(s,function(x,w){v[r][x]=w})}else{v.splice(r,1)}this.switchButton.data("taskBoardList",v);break}}}},setEvent:function(){var r=this;r.switchButton.off("click").on("click",function(){layer.closeAll();var s=a.data("projectId");f.ajax({type:"post",data:{projectId:s},url:context+"/task/listTaskBoard.htm"}).done(function(t){if(t&&t.success){if(t.resultData&&t.resultData.length){r.switchButton.data("taskBoardList",t.resultData);f.layer({type:1,title:false,area:["auto","auto"],offset:["50px","100px"],shade:[0],border:[0],zIndex:1000,closeBtn:[0],shift:"left",page:{html:r.taskBoardGroupHtml()},success:function(u){r.layerSetEvent(u)}})}}else{if(t&&!t.success){layer.msg(t.errormsg)}else{layer.msg("请求失败")}}});return false})},layerSetEvent:function(r){var s=this;var v=f(r).find("#addTaskBoardGroup");var t=new InputValidate(v.find("input"),true,40);var u=new InputValidate(v.find("textArea"),false,600);f(r).on("click",function(){v.hide();f("div#selectUserLayer").closest(".xubox_layer").remove();f(r).find("#taskBoardList li").show();f(r).find("#updateTaskBoardGroup").remove();return false});f(r).find("#taskBoardList").on("click","li",function(){var w=s.switchButton.data("id");if(w==f(this).data("id")){return false}k.getTaskLineData(f(this).attr("title"),f(this).find("span.desc").text(),f(this).data("id"));layer.closeAll();return false});v.on("click",function(){return false});f(r).on("click","#addTaskBoardBtn",function(){f(r).find("#taskBoardList li").show();f(r).find("#updateTaskBoardGroup").remove();if(v.is(":hidden")){v.show()}else{v.hide()}return false});v.on("click","button",function(){var x=v.find("input");var y=v.find("textarea");var z=f(this);if(!t.checkValidate()||!u.checkValidate()){return false}z.prop("disabled",true);var w=a.data("projectId");f.ajax({type:"post",data:{projectId:w,name:x.val(),remark:y.val()},url:context+"/task/addTaskBoard.htm"}).done(function(A){if(A&&A.success){if(A.resultData){layer.closeAll();k.getListTaskBoard()}}else{if(A&&!A.success){layer.msg(A.errormsg)}else{layer.msg("请求失败")}}z.prop("disabled",false)}).fail(function(){layer.msg("请求失败");z.prop("disabled",false)});return false});f(r).find("#taskBoardList").find(".creator").on("click","a",function(){var y=f(this).find("img").data("id").toString(),w=f(this).closest("li");if(w.find(".pull-right").length<=0){return}var x="updateAdmin";b.init({searchInput:true,data:window.projectUserList,claiming:false,selectData:[y],dom:f(this),container:f(this),isClose:true,eventType:x});f(this).off(x).on(x,function(A,B){var z={boardId:w.data("id"),boardAdmin:B.ids[0]};f.ajax({type:"post",data:z,url:context+"/task/updateBoardAdmin.htm"}).done(function(C){if(C&&C.success){a.load(context+"/task/loadTaskBoard.htm",{projectId:a.data("projectId")});B.callback();s.updateBoardInfo("update",{taskBoardId:z.boardId,boardAdmin:z.boardAdmin})}else{if(C&&!C.success){layer.msg(C.errormsg)}else{layer.msg("请求失败")}}})});return false});f(r).find("#taskBoardList").on("click",".icon-pencil",function(){var y=f(this).closest("li").find("img").data("id");v.hide();f(r).find("#taskBoardList li").show();f(r).find("#updateTaskBoardGroup").remove();var C=s.switchButton.data("taskBoardList");var x=f(this).closest("li");x.hide();var B=f(s.updateTaskBoardGroupHtml());B.find("input").val(x.attr("title"));var z=new InputValidate(B.find("input"),true,40);var A=new InputValidate(B.find("textArea"),false,600);var w=x.data("id");f.each(C,function(D,E){if(E.taskBoardId==w){B.find("textarea").val(E.remark);return false}});B.insertAfter(x);B.on("click",function(){return false});B.on("click","button",function(){var E=B.find("input").val();var F=B.find("textarea").val();if(!z.checkValidate()||!A.checkValidate()){return false}var D={taskBoardId:w,name:E,remark:F,admin:y};var G=f(this);G.prop("disabled",true);f.ajax({type:"post",data:D,url:context+"/task/updateTaskBoard.htm"}).done(function(H){if(H&&H.success){x.children("a").text(i.getStrActualLen(D.name,24)).end().attr("title",D.name);x.find("span.desc").text(F);f(r).find("#taskBoardList li").show();if(D.taskBoardId==s.switchButton.data("id")){s.switchButton.find("span.name").text(i.getStrActualLen(E,24)).attr("title",E)}f(r).find("#updateTaskBoardGroup").remove();s.updateBoardInfo("update",D)}else{if(H&&!H.success){layer.msg(H.errormsg)}else{layer.msg("请求失败")}}G.prop("disabled",false)}).fail(function(){layer.msg("请求失败");G.prop("disabled",false)});return false});return false});f(r).find("#taskBoardList").on("click",".icon-trash",function(){var w=f(this).closest("li").data("id");var x=f(this);var z=s.switchButton.data("id");if(z==w){layer.alert("不能删除当前任务板,请切换任务板之后再操作");return false}var y=f(this);y.prop("disabled",true);f.ajax({type:"post",data:{taskBoardId:w},url:context+"/task/delTaskBoard.htm"}).done(function(A){if(A&&A.success){s.updateBoardInfo("delete",{taskBoardId:w});f(r).find("#taskBoardList li").show();f(r).find("#updateTaskBoardGroup").remove();x.closest("li").remove();v.hide()}else{if(A&&!A.success){layer.msg(A.errormsg)}else{layer.msg("请求失败")}}y.prop("disabled",false)}).fail(function(){layer.msg("请求失败");y.prop("disabled",false)});return false})}};return k});