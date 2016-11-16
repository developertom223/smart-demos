$(function() {
	var toggle = '[chosen-toggle="open"]';
	$(document).click(function(event){
		clearMenu(event);
	});
	function clearMenu(e){
		if (e && e.which === 3) return;
	    $(toggle).each(function () {
	      var $this = $(this);
	      var $parent = $this.parents(".chosen-container");

	      if (!$parent.hasClass('chosen-with-drop')) return;
	      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
	      if (e.isDefaultPrevented()) return;
	      $parent.removeClass('chosen-with-drop');
	      $this.attr("chosen-toggle","close");
	    });
	}
	function chosenSearch(target,request){
		var datas = [{"dataValue":1,"dataTxt":"阿林西ID能发到您"},{"dataValue":2,"dataTxt":"伯伯解放军减肥减肥"},{"dataValue":3,"dataTxt":"刺刺经济法解放军解放"},{"dataValue":4,"dataTxt":"弟弟方法可罚款扣分"},{"dataValue":5,"dataTxt":"岳岳非进口咖啡苦咖啡"}],
			dataLen = datas.length,
			html = '',
			chosenContainer = target.closest(".chosen-container");
		if(request==''){
			for(var i=0;i<dataLen;i++){
				html +='<li data-value="'+datas[i].dataValue+'">'+datas[i].dataTxt+'</li>';
			}
			chosenContainer.find(".chosen-results").html(html);
		}else{
			var sub = new RegExp(request); 
			for(var i=0;i<dataLen;i++){
				if(sub.test(datas[i].dataTxt) > 0){
					html +='<li  data-value="'+datas[i].dataValue+'">'+datas[i].dataTxt+'</li>';
				}
			}
			chosenContainer.find(".chosen-results").html(html);
		}

	}
	$(".chosen-single").click(function(e){
		clearMenu(e);
		chosenSearch($(this),'');
		$(this).closest(".chosen-container").addClass("chosen-with-drop").find(".J_chosen-search").val("").focus();
		$(this).attr("chosen-toggle","open");
		toggle = '[chosen-toggle="open"]';
		e.stopPropagation();
	});
	
	$('.J_chosen-search').bind("keyup",function(){
		var request = $.trim($(this).val());
		chosenSearch($(this),request);
    });
    $(".J_searchicon").click(function(){
    	var request = $.trim($(this).closest(".chosen-container").find(".J_chosen-search").val());;
		chosenSearch($(this),request);
    })
    //粘贴
	$.fn.pasteEvents = function(delay) {
	    if (delay == undefined) delay = 20;
	    return $(this).each(function() {
	        var $el = $(this);
	        $el.on("paste", function() {
	            $el.trigger("prepaste");
	            setTimeout(function() { $el.trigger("postpaste"); }, delay);
	        });
	    });
	};
	$('.J_chosen-search').on("postpaste", function() { 
	   var copyVal=$.trim($(this).val());
	   // var copyVal=Tool.StringTrim($(this).val());
		chosenSearch($(this),copyVal);
	}).pasteEvents();

    $(".chosen-results").on("click","li",function(){
    	var chosenTxt = $.trim($(this).text()),
    		chosenValue = $.trim($(this).data("value")),
    		chosenContainer = $(this).closest(".chosen-container");
    	chosenContainer.removeClass("chosen-with-drop").find(".chosen-value").val(chosenValue);
    	chosenContainer.find(".chosen-single").addClass("hascontent").find(".txt").text(chosenTxt);
    	return false;
    });
    $(".search-choice-close").click(function(e){
    	e.stopPropagation();
    	var chosenContainer = $(this).closest(".chosen-container");
    	chosenContainer.find(".chosen-value").val("");
    	chosenContainer.find(".chosen-single").removeClass("hascontent").find(".txt").text("");
    });
});