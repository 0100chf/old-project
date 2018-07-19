define(["jquery","script/common/personList",context+"/static/script/taskBoard/installHtml.js?_T="+(new Date()).valueOf(),"script/taskBoard/taskSocket","layer"],function(f,e,b,d){var c=f("div.main-content[data-id='projectTemplate']");var a={init:function(g,i){this.dom=f(i);this.userList=g;if(f(i).hasClass("addTaskForm")){this.projectId=c.data("projectId");this.boardId=c.find("#switchTaskBoard").data("id");this.taskLineId=f(i).closest("li").data("id");this.taskList=f(i).closest("li").find(".taskList")}else{var h=f(i).closest("#updateTaskRightLayer").data("taskInfo");this.projectId=h.projectId;this.boardId=f(i).closest("#updateTaskRightLayer").data("boardId");this.taskLineId=h.taskLine.taskLineId;if(c.length>0){this.taskList=c.find(".main-task").find("ul > li[data-id='"+this.taskLineId+"']").find(".taskList")}else{this.taskList=f("#futureTaskList").find("div.task-project[data-id='"+this.projectId+"']").find("ul")}}this.tarkFormDom=f(this.getFormHtml()).appendTo(f(i));this.setEvent()},getFormHtml:function(){return"<div class='block add-task'><textarea class='task-content-input form-control' rows='2' placeholder='任务内容'></textarea><label style='margin-left:10px'>执行者</label><br><div id='changeExecutor' class='task-infor'> <a><img  data-id='"+loginUserInfo.userId+"' src='"+loginUserInfo.logo+"' class='img-circle'> "+loginUserInfo.name+"</a></div><div class='task-infor add-message'><label>参与者</label><br><ul><li data-id='"+loginUserInfo.userId+"' title='"+loginUserInfo.name+"'><img src='"+loginUserInfo.logo+"' class='img-circle'><a class='remove-member-handler'>×</a></li><li id='selectPartner'><i class='icon-plus-circle icon-big'></i></li></ul></div><button id='addTaskBtn' class='btn btn-sure'>新建</button><div class='layer-group  open-layer'><ul id='taskVisibleList' class='add-message boardBackground inerLayer floatLayer' style='display:none'><li><a>所有"+TEXT_CONFIG.chengyuan+"可见</a><i class=' icon-ok'></i></li><li><a>仅参与者可见</a><i class=' icon-ok'></i></li></ul><button id='taskVisible' data-visible=true class='btn gray'><span>所有"+TEXT_CONFIG.chengyuan+"可见</span> <i class='icon-up-open-big'></i></button></div></div>"},setEvent:function(){var g=this;this.tarkFormDom.find("textarea").focus();var i=new InputValidate(this.tarkFormDom.find("textarea"),true,600);var h=this.tarkFormDom.find("#taskVisibleList");this.tarkFormDom.on("click","#addTaskBtn",function(){var m={};var l=g.tarkFormDom.find("textarea").val();if(!i.checkValidate()){return false}var j=[];var k=g.tarkFormDom.find("#selectPartner").prevAll("li");k.each(function(){j.push(f(this).data("id").toString())});m.content=l;m.projectId=g.projectId;m.taskLineId=g.taskLineId,m.partner=j.length<1?[0]:j;m.executor=g.tarkFormDom.find("#changeExecutor img").data("id");m.visible=g.tarkFormDom.find("#taskVisible").data("visible");if(f(g.dom).hasClass("addTaskForm")){m.parentTaskId=0}else{m.parentTaskId=f(g.dom).closest("#updateTaskRightLayer").data("taskInfo").taskId}f.ajax({type:"post",data:m,url:context+"/task/addTask.htm"}).done(function(n){if(n&&n.success){if(n.resultData){m.taskId=n.resultData,m.priority="00100",m.taskBoardId=g.boardId;if(f(g.dom).hasClass("addTaskForm")){d.addTask(m);g.taskList.append(b.taskHtml("add",m));g.tarkFormDom.find("textarea").val("");b.updateTaskCount(g.taskList.closest("li"))}else{if(c.length>0){f(b.taskHtml("add",m)).appendTo(g.taskList)}else{f(b.myTaskHtml(m)).appendTo(g.taskList)}g.tarkFormDom.remove();var o=f(g.dom).closest("#updateTaskRightLayer").find("#updateChildTask #childTask");if(o.find("ul").find("li").length>0){o.find("ul").append(b.childTaskHtml(g.userList,m))}else{o.find("ul").empty().append(b.childTaskHtml(g.userList,m))}if(c.length>0){b.updateTaskCount(g.taskList.closest("li"))}}}}else{if(n&&!n.success){layer.msg(n.errormsg)}else{layer.msg("请求失败")}}})});this.tarkFormDom.on("click",function(){f("div#selectUserLayer").closest(".xubox_layer").remove();h.hide();return false});this.tarkFormDom.find("#taskVisible").on("click",function(j){h.show();if(f(this).data("visible")){h.find("i:eq(0)").show();h.find("i:eq(1)").hide()}else{h.find("i:eq(1)").show();h.find("i:eq(0)").hide()}return false});h.on("click","li",function(k){var j=g.tarkFormDom.find("#taskVisible");h.find("i").hide();f(this).find("i").show();j.data("visible",!Boolean(f(this).index()));j.find("span").text(f(this).text());h.hide();return false});this.tarkFormDom.find("#changeExecutor").on("click",function(k){var m=f(this).find("img").data("id").toString();var l=f.extend(true,{},g.userList||{});for(var j in l){if(l[j].prjRoleCode=="PRJ_SUPERVISER"){delete l[j]}}e.init({searchInput:true,data:l,claiming:true,selectData:[m],dom:f(this),container:f(this),isClose:true});return false});this.tarkFormDom.on("click",".remove-member-handler",function(){f(this).closest("li").remove()});this.tarkFormDom.find("#selectPartner").on("click",function(k){var j=[];f(this).prevAll("li").each(function(){j.push(f(this).data("id").toString())});e.init({searchInput:true,data:g.userList||{},everyone:true,selectData:j,dom:f(this),container:f(this)});return false})}};return a});