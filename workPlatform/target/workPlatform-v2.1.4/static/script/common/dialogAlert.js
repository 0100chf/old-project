define(["jquery","layer"],function(b){var a={alert:function(e,d){var c=0;if(d!==null&&d!="undefined"&&!isNaN(d)){c=d}b.layer({title:"信息",shade:[0.5,"#000"],shadeClose:false,closeBtn:false,fix:true,move:".xubox_title",btn:["确定"],dialog:{type:c,msg:e},yes:function(f){b("#xubox_shade"+f).remove();b("#xubox_layer"+f).remove();return false}})}};return a});