define([
	'jquery'
	,'handlebars'
	,'boardApi'
], function($,handlebars, data){
	var bindTable = (function(){
		var wrapper;
		var bindTarget;
		var bindButton;
		var INDEX;

		function init(options){
			wrapper = $(options.wrapper);
			bindTarget=$(options.bindTarget);
			bindButton=$(options.bindButton);

			bindEvents()

		}

		function bindEvents(){
			bindButton.on("click", insertData);
			getData();
		}

		function getData(){
			if(bindTarget.children("tr").size()>0){
				bindTarget.children("tr").remove();
			}
			var dummyDom = wrapper.html();
			var template= handlebars.compile(dummyDom);
			var dataItem="";

			for(var i in data.getApiData()){
				dataItem += template( data.getApiData()[i]);
			}

			var makeDom=( function(){
				bindTarget.append(dataItem);
			}());
			dynamicInit().bindEvents();
		}

		function insertData(){
			if(INDEX){
				$.ajax({
					type:"POST",
					url:"/edit/Board",
					dataType:"JSON",
					data:{
						'title':$("#title").val(),
						'creator_id':$("#creator_id").val(),
						'content':$("#content").val(),
						'idx':INDEX
					},
					complete:function(){
						// TODO: 재로딩 하면 됨
						//alert("완료")
						getData();
						INDEX=undefined;
					}
				});
			} else {
				$.ajax({
					type:"POST",
					url:"/new/Board",
					dataType:"JSON",
					data:{
						'title':$("#title").val(),
						'creator_id':$("#creator_id").val(),
						'content':$("#content").val()
					},
					complete:function(){
						//alert("완료")
						getData();
						INDEX=undefined;
					}
				});
			}

		}
		var dynamicInit = function(){
			var editButton = $("[data-module-btn='edit']");
			var deleteButton = $("[data-module-btn='delete']");
			var creator_id = $("#creator_id");
			var title = $("#title");
			var content = $("#content");
			function bindEvents(){
				editButton.on("click", function(){
					setEachData($(this));
				});
				deleteButton.on("click", function(){
					deleteFunction($(this));
				});
			}
			function deleteFunction(me){
				var parent = me.closest("[data-module-idx]");
				$.ajax({
					type:"POST",
					url:"/delete/Board",
					dataType:"JSON",
					data:{
						'idx':parent.data("module-idx")
					},
					complete:function(){
						console.log(11);
						getData();
					},
					success:function(){
						console.log(2);
					}
				})
			}
			function setEachData(me){
				var parents =me.closest("[data-module-idx]");
				var creatorIdContent = parents.find("[data-module-contents='creator_id']").text();
				var titleContent = parents.find("[data-module-contents='title']").text();
				var contentContent = parents.find("[data-module-contents='content']").text();
				INDEX = parents.data("module-idx");

				creator_id.val(creatorIdContent);
				title.val(titleContent);
				content.val(contentContent);
			}
			function makeDim(){
				bindTarget.parent("table").append("<div class='dim'></div>");
			}
			return {
				bindEvents:bindEvents
			}
		};

		return{
			init: init
		}
	})();
	return bindTable;
})
