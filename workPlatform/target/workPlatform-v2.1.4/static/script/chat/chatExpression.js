define(["jquery"],function(){var a={init:function(b){var c={tab:"",ele:"",col:4,num:16,gifUrl:"/static/images/expression/",text:["微笑","流泪","龇牙","害羞","睡","流汗","憨笑","No","再见","拥抱","月亮","强","握手","胜利","抱拳","Ok"]};this.options=$.extend(c,b||{});if($(this.options.tab).length<1||$(this.options.ele).length<1||this.options.text.length<1||this.options.col>this.options.num){return false}this.loadImg();this.setEvent()},loadImg:function(){$(this.options.tab).find("tbody").append(this.createExpressionHtml())},createExpressionHtml:function(){var d="<tr>";var b=this.options.gifUrl;for(var c=0;c<this.options.num;c++){if(c%this.options.col==0&&c){d+="</tr><tr><td class='face-img-td' data-index='"+c+"'><div class='wrapper-td'><img src='"+context+b+parseInt(c+1)+".gif' title='"+this.options.text[c]+"'></div></td>"}else{d+="<td class='face-img-td' data-index='"+c+"'><div class='wrapper-td'><img src='"+context+b+parseInt(c+1)+".gif' title='"+this.options.text[c]+"'></div></td>"}}d+="</tr>";return d},setEvent:function(){var b=this;$(this.options.tab).on("click","td",function(){$(b.options.ele).val($(b.options.ele).val()+"[em_"+parseInt($(this).data("index")+1)+"]")});$(window).on("click",function(c){$(b.options.tab).addClass("g-hide")})}};return a});