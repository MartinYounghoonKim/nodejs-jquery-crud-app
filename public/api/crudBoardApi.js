define([
	'jquery'
], function($){
	var boardApi = (function(){
		var getApiData = function (){
			var result;
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
			getApiData : getApiData
		}
	}());
	return boardApi;
})
