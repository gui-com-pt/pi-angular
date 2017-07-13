(function(){

	var piFileManager = function(){



		return {

			$get: {

			}
		}
	}

	var piUploadService = function(){

		var upload = function(file, uploadDto){

		}
		return {
			upload: upload
		}
	}

	var piFileDashboard = function(){

		return {
			templateUrl: '/html/pi/file-dashboard.html'
		}
	}
	var piFileUpload = function(){

		var link = function(scope, elem, attr){

		}

		var controller = function($scope){
			this.upload = function(){

			}
		}
		return {
			link: link,
			controller: controller,
			controllerAs: 'ctrl'
		}
	}

	var  piFileUploadArea = function(){

		return {
			templateUrl: '/html/pi/file-upload-area.html'
		}
	}

	var piFileUploadBrowse = function(){
		return {
			templateUrl: '/html/pi/file-upload-browser.html'
		}
	}

	var piFileEditCard = function(){
		return {
			templateUrl: '/html/pi/file-edit-card.html'
		}
	}

	var piFileCard = function(){
		return {
			templateUrl: '/html/pi/file-card.html'
		}
	}

	
})();