define([
	'jquery'
	,'handlebars'
	,'crudBoardApi'
], function($,handlebars, getApiData){
	var bindTable = (function(){
		var obj;
		var OPTIONS = {
			IS_BIND_DATA : false
		}
		var INDEX;

		function init(options){
			bindSelector(options);
			bindEvents();
			getData();
		}

		function bindSelector(options){
			obj = {
				wrapper : $(options.wrapper),
				bindTarget : $(options.bindTarget),
				bindButton : $(options.bindButton),
				creatorIdTextArea : $("#creator_id"),
				titleTextArea : $("#title"),
				contentTextArea : $("#content")
			}
		}

		function bindEvents(){
			obj.bindButton.on("click", insertData);
			$(document).on("click","[data-module-btn='edit']", function(){
				setEachData($(this));
			});
			$(document).on("click", "[data-module-btn='delete']", function(){
				deleteUserBoardData($(this));
			})
		}

		function getData(){
			//데이터가 바인딩 되어있으면 OPTIONS.IS_BIND_DATA가 true
			if(OPTIONS.IS_BIND_DATA === true){
				obj.bindTarget.children("tr").remove();
			}
			var dummyDom = obj.wrapper.html();
			var template= handlebars.compile(dummyDom);
			var dataItem = template({
				"boardData" : getApiData.callDataApi("GET","/api/Board","JSON")
			});
			obj.bindTarget.append(dataItem);
			OPTIONS.IS_BIND_DATA = true;
		}

		function insertData(){
			if(INDEX){
				getApiData.callDataApi("POST","/edit/Board","Text", {
					'title':$("#title").val(),
					'creator_id':$("#creator_id").val(),
					'content':$("#content").val(),
					'idx':INDEX
				});
			} else {
				getApiData.callDataApi("POST","/new/Board","Text", {
					'title':$("#title").val(),
					'creator_id':$("#creator_id").val(),
					'content':$("#content").val()
				});
			}
			INDEX=undefined;
			getData();
		};
		function setEachData(me){
			var parents = me.closest("[data-module-idx]");
			var creatorIdContent = parents.find("[data-module-contents='creator_id']").text();
			var titleContent = parents.find("[data-module-contents='title']").text();
			var contentContent = parents.find("[data-module-contents='content']").text();
			INDEX = me.data("temp-index");

			obj.creatorIdTextArea.val(creatorIdContent);
			obj.titleTextArea.val(titleContent);
			obj.contentTextArea.val(contentContent);
		};
		function deleteUserBoardData(me){
			var deleteTarget = me.data("delete-target-index");
			getApiData.callDataApi("POST","/delete/Board","Text", {
				'idx':deleteTarget
			});
			getData();
		}

		return{
			init: init
		}
	})();
	return bindTable;
})
