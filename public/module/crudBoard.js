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
		//FIXME : INDEX를 저장할 필요없이, view 화면에서 가져오면 될것.
		var INDEX;
		var userTextId = $("#creator_id");
		var userTextTitle = $("#title");
		var userTextContent = $("#content");

		function init(options){
			bindSelector(options);
			bindEvents();
			setUserDataToView();
		}

		function bindSelector(options){
			obj = {
				wrapper : $(options.wrapper),
				bindTarget : $(options.bindTarget),
				bindButton : $(options.bindButton),
				editingLayerPop : $(options.editingLayerPop),
				creatorIdTextArea : $("#creator_id"),
				titleTextArea : $("#title"),
				contentTextArea : $("#content"),
				layerPopUp : $(options.layerPopUp),
				layerCancelButton : $(options.layerPopUpCancelButton),
				layerEditButton : $(options.layerPopUpEditButton),
				dataFilters : $("[data-filters]")
			}
		}

		function bindEvents(){
			obj.bindButton.on("click", insertUserBoardData);
			$(document).on("click","[data-module-btn='edit']", function(){
				getUserDataToLayerPop($(this));
			});
			obj.dataFilters.on("click", function(){filteringData($(this))})
			$(document).on("click", "[data-module-btn='delete']", function(){
				deleteUserBoardData($(this));
			})
			obj.layerCancelButton.on("click", function(){
				closeLayerPop();
			});
			obj.layerEditButton.on("click", function(){
				editUserBoardData();
			});
		}
		//FIXME: api와 서비스가 존재.서비스 메소드 - 1. 패치 2.insert 3. delete 4.put()
		// FIXME: 함수명의 의미가 맞지 않음. 네이밍을 좀더 신경써야함.
		function setUserDataToView(){
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
			var userType= $("#sort option:selected").val();

			getApiData.callDataApi("POST","/new/Board","Text", {
				'user_type' :userType,
				'title':titleUserData,
				'creator_id':creatorIdUserData,
				'content':contentUserData
			});
			setUserDataToView();
			clearUserTextArea();
		};

		// TODO: MVC 를 분리( MVC 패턴 )- INDEX 값 제거
		function editUserBoardData(){
			var titleUserData = $("#edit-title").val();
			var contentUserData = $("#edit-content").val();
			getApiData.callDataApi("POST","/edit/Board","Text", {
				'title':titleUserData,
				'content':contentUserData,
				'idx':OPTIONS.INDEX
			});
			OPTIONS.INDEX = undefined;
			setUserDataToView();
			clearUserTextArea();
			closeLayerPop();
		}
		//FIXME : 코드가 한 함수 안에 계속 추가되고있음. 변수의 네이밍이 가독성이 없음.
		function getUserDataToLayerPop(me){
			var dataEditTargetIndex = me.data("temp-index");
			var data = getApiData.callDataApi("GET","/edit/board1","JSON", {
				'idx': dataEditTargetIndex
			});
			//FIXME : 예제로 editLayerPopString, source
			var dummyDom = obj.editingLayerPop.html();
			var template = handlebars.compile(dummyDom);
			var dataItem = template(data[0]);
			obj.layerPopUp.append(dataItem);
			OPTIONS.INDEX = me.data("temp-index");
			$(".layer-wrapper").show();
			// FIXME : modalFormShow, modalFormHide을 별도로 만들고, 옵션을 날림
			/*
			modalFormShow(template)
				.then({id, title, comment}} => update(id, title, comment))
				.then(() => modalFormHide())
				.catch(errorMessage => alert(errorMessage));*/
		}

		function closeLayerPop(){
			obj.layerPopUp.children().remove();
			$(".layer-wrapper").hide();
		}
		function deleteUserBoardData(me){
			var isDelete = confirm("삭제하시겠습니까?");
			if(isDelete === false){
				return false;
			}
			var deleteTarget = me.data("delete-target-index");
			getApiData.callDataApi("POST","/delete/Board","Text", {
				'idx':deleteTarget
			});
			setUserDataToView();
		}

		function clearUserTextArea(){
			obj.creatorIdTextArea.val("");
			obj.titleTextArea.val("");
			obj.contentTextArea.val("");
		}

		function filteringData(me){
			if(OPTIONS.IS_BIND_DATA === true){
				obj.bindTarget.children("tr").remove();
			}
			var filterFlag = me.data("filters");
			var dummyDom = obj.wrapper.html();
			var template= handlebars.compile(dummyDom);
			var data = { "boardData" : getApiData.callDataApi("GET","/api/FiltersData/" + filterFlag, "JSON") };
			var dataItem = template(data);
			obj.bindTarget.append(dataItem);
			OPTIONS.IS_BIND_DATA = true;
		}

		handlebars.registerHelper('checkBoolean', function(boolean){
			if(boolean == true){
				return new handlebars.SafeString(
					"<div>참이당</div>"
				)
			} else {
				return new handlebars.SafeString(
					"<div>거짓이당</div>"
				)
			}
		})

		return{
			init: init
		}
	})();
	return bindTable;
})
