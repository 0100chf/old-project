require(["jquery","layer"],function(a){var c;var b=TEXT_CONFIG.global_edition.toLowerCase();if(b=="enterprice"){a("#gerenxiangmu").remove()}c={dom:a("div[data-id='projectHomePage']"),init:function(){this.panel=a("#home_body");this.organizationDiv=this.panel.find(".organizationprojects");this.pprojectDiv=this.panel.find(".personprojects");this.cprojectDiv=this.panel.find(".commomuseprojects");this.setEvent();this.findOtherProject();this.createProject()},setEvent:function(){var e=this;e.dom.on("click",".project-block",function(){var g=a(this).data("projectid");var f=a(this).data("status");var h=a(this).data("uuid");var i=e.dom.data("deletestatus");if(f==i){return false}location.href=context+"/project/"+h+"/gotoProject.htm";return false});var d;e.dom.on("click",".icon-pencil",function(i){var h=a(this).closest("div.project-block"),f=h.data("projectid");var g=a("#projectSettingBootstrapLayer");g.load(context+"/project/projectSetting.htm?proId="+f,function(){g.modal("show")});return false});e.dom.on("click",".icon-star",function(m){var k=a(this).closest("div.project-block"),l=k.data("projectid"),o=k.find("h3").html(),g=k.find("h3").attr("title"),n=k.data("status"),h=k.find(".describe").html();uuid=k.data("uuid"),commonUse=a(this).hasClass("select");var f=e.dom.data("deletestatus");if(n==f){return false}var j=k.css("background-image");var i=j.replace("url(","").replace(")","");a.ajax({type:"post",url:context+"/project/isCoummonUse.htm",data:{projectId:l,isCommonUse:!commonUse?true:false}}).done(function(){var q={logoStr:i,projectId:l,name:o,statusType:n,uuid:uuid,status:h,commonUse:true,title:g};if(commonUse){e.cprojectDiv.find('div[data-projectid="'+l+'"]').remove()}else{e.panel.find(".commomuseprojects").append(e.getCommonUseProjectHtml(q))}var p=e.dom.find('div.project-block[data-projectid="'+l+'"] .icon-star');if(commonUse){p.removeClass("select")}else{p.addClass("select")}});return false});e.dom.on("click",".goOrganization",function(f){var g=a(this).data("uuid");window.location=context+"/org/"+g+"/organization.htm"})},getProjectInitData:function(){var d=this;d.pprojectDiv.empty();d.cprojectDiv.empty();d.organizationDiv.empty();a.ajax({type:"post",url:context+"/project/initProject.htm",success:function(e){if(e&&e.success){var f=e.resultData;d.initProjectModule(f)}else{if(e&&!e.success){layer.msg(e.errormsg)}else{layer.msg("请求失败")}}},error:function(e){}})},getCommonUseProjectHtml:function(f){var d=a('<div class="project-block common corner-6" data-uuid = "'+f.uuid+'" data-status = "'+f.statusType+'" data-projectid="'+f.projectId+'" style= background-image:url('+f.logoStr+');><div class="operate"><em class="icon-pencil"></em><em class=" icon-star"></em></div><h3 title="'+f.title+'">'+f.name+'</h3><div class="describe">'+f.status+"</div></div>");var e=d.find(".describe");if(f.commonUse){d.find(".icon-star").addClass("select")}if(f.logo==location.href){d.append('<i class="icon-inbox"></i>')}return d},createProject:function(){var d=this;var e;d.dom.on("click",".creatOrgProject",function(h){var g=a("<div></div>");var i=a(this).closest("div").prevAll("h4").data("orgid");var f=a("#addProjectBootstrapLayer");f.load(context+"/project/addProject.htm",function(){f.modal("show");if(i){f.find("#organizationId").val(i)}});return false})},findOtherProject:function(){var d=this;a(document).on("click",function(e){d.dom.find(".project-state-larer").hide()});d.dom.on("click",".project-state",function(f){a(this).next().show();EventUtil.stopPropagation(f)});d.dom.find(".project-state-larer").on("click","li",function(){var e=a(this).closest(".project-state-larer");e.find("li i").hide();a(this).find("i").show();e.prev().html(a(this).text()+'<i class="icon-down-open-big"></i>');e.hide();var g=0;if(e.siblings("h4.goOrganization").length>0){g=a(e.siblings("h4.goOrganization")[0]).data("orgid")}e.nextAll("div").hide();var f=a(this).data("status");var h=a("<div></div>");h.load(context+"/project/findProjectByStatus.htm",{status:f,orgId:g},function(i){e.after(i)})})}};c.init()});