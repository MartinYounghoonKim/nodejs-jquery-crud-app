define([
	'jquery'
	,'handlebars'
	,'crudBoardApi'
], function($,handlebars, getApiData){
	var bindTable = (function(){
		var obj;
		var OPTIONS = {
			IS_BIND_DATA : false,
			INDEX : undefined
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
				editingLayerPop : $(options.editingLayerPop),
				layerPopUp : $(options.layerPopUp),
				creatorIdTextArea : $("#creator_id"),
				titleTextArea : $("#title"),
				contentTextArea : $("#content")
			}
		}

		function bindEvents(){
			obj.bindButton.on("click", insertUserBoardData);
			$(document).on("click","[data-module-btn='edit']", function(){
				setEachData($(this));
				editUserBoardData($(this));
			});
			$(document).on("click", "[data-module-btn='delete']", function(){
				deleteUserBoardData($(this));
			})
		}

		function getData(){
			//데이터가 바인딩 되어있는 상태면 OPTIONS.IS_BIND_DATA가 true
			if(OPTIONS.IS_BIND_DATA === true){
				obj.bindTarget.children("tr").remove();
			}
			var dummyDom = obj.wrapper.html();
			var template= handlebars.compile(dummyDom);
			var data = { "boardData" : getApiData.callDataApi("GET","/api/Board","JSON") }
			var dataItem = template(data);
			obj.bindTarget.append(dataItem);
			OPTIONS.IS_BIND_DATA = true;
		}

		function insertUserBoardData(){
			var titleUserData = $("#title").val();
			var creatorIdUserData = $("#creator_id").val();
			var contentUserData = $("#content").val();

			if(OPTIONS.INDEX){
				getApiData.callDataApi("POST","/edit/Board","Text", {
					'title':titleUserData,
					'creator_id':creatorIdUserData,
					'content':contentUserData,
					'idx':OPTIONS.INDEX
				});
				OPTIONS.INDEX = undefined;
			} else {
				getApiData.callDataApi("POST","/new/Board","Text", {
					'title':titleUserData,
					'creator_id':creatorIdUserData,
					'content':contentUserData
				});
			}
			getData();
			clearUserTextArea();
		};

		function editUserBoardData(me){
			var dataEditTargetIndex = me.data("temp-index");
			var data = getApiData.callDataApi("GET","/edit/board1","JSON", {
				'idx': dataEditTargetIndex
			});
			var dummyDom = obj.editingLayerPop.html();
			var template = handlebars.compile(dummyDom);
			var dataItem = template(data[0]);
			obj.layerPopUp.append(dataItem);
			$(".layer-wrapper").show();
		}

		function setEachData(me){
			var parents = me.closest("[data-module-idx]");
			var creatorIdContent = parents.find("[data-module-contents='creator_id']").text();
			var titleContent = parents.find("[data-module-contents='title']").text();
			var contentContent = parents.find("[data-module-contents='content']").text();
			OPTIONS.INDEX = me.data("temp-index");

			obj.creatorIdTextArea.val(creatorIdContent);
			obj.titleTextArea.val(titleContent);
			obj.contentTextArea.val(contentContent);
		};
		function deleteUserBoardData(me){
			var isDelete = confirm("삭제하시겠습니까?");
			if(isDelete === false){
				return false;
			}
			var deleteTarget = me.data("delete-target-index");
			getApiData.callDataApi("POST","/delete/Board","Text", {
				'idx':deleteTarget
			});
			getData();
		}

		function clearUserTextArea(){
			obj.creatorIdTextArea.val("");
			obj.titleTextArea.val("");
			obj.contentTextArea.val("");
		}

		return{
			init: init
		}
	})();
	return bindTable;
})
