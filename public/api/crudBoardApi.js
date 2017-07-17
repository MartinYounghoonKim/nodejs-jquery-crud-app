define([
	'jquery'
], function($){
	var boardApi = (function(){
		function callDataApi(apiType, apiUrl, apiDataType, datas){
			var dataInformation;
			if(datas){
				dataInformation = datas;
			}
			var result;
			// FIXME: async : false, 옵션을 사용하지 않으면 console에 내용이 찍히지 않음
			$.ajax({
				type:apiType,
				url:apiUrl,
				async : false,
				dataType:apiDataType,
				data: dataInformation,
				success : function(data){
					if(!data){
						return false;
					}
					result=data;
				},
				error : function(xhr, status, error) {
					console.log(xhr, + "\n" + status,+ "\n" + error)
					alert("에러가 발생했습니다.");
				}
			});
			return result;
		}

		var getApiData = function (){
			var result;
			function callDataApi(apiType, apiUrl){
				$.ajax({
					type:apiType,
					url:apiUrl,
					dataType:"JSON",
					success : function(data){
						//return data;
					},
					error : function(xhr, status, error) {
						alert("에러가 발생했습니다.");
					}
				});
			}
			$.ajax({
				type:"GET",
				url:"/api/Board",
				async: false,
				dataType:"JSON",
				success : function(data){
					result = data;
				},
				error : function(xhr, status, error) {
					alert("에러가 발생했습니다.");
				}
			});
			return result;
		}
		return {
			getApiData : getApiData,
			callDataApi : callDataApi
		}
	}());
	return boardApi;
})
