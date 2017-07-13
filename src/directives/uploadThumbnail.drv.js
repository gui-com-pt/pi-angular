(function(){
    'use strict';
    var UploadThumbnail = function(Upload, piHttp){

        var linkFn = function(scope, elem, attrs, ngModel){
            var self = this;


            //scope.thumbnailSrc = _.isString(ngModel.$viewValue) ? ngModel.$viewValue : 'http://fitting.pt/dist/images/event-thumbnail.jpg';
            attrs.$observe('ngModel', function(value){ // Got ng-model bind path here
              scope.$watch(value,function(newValue){ // Watch given path for changes
                  scope.thumbnailSrc = _.isString(ngModel.$viewValue) ? ngModel.$viewValue : 'http://fitting.pt/dist/images/event-thumbnail.jpg';
              });
           });

            scope.$watch('files', function () {
                scope.upload(scope.files);
            });

            scope.upload = function (files) {

                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var url = piHttp.getBaseUrl() + '/filesystem';

                        Upload.upload({
                            url: url,
                            fields: {},
                            file: file
                        }).progress(function (evt) {
                            scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function (data, status, headers, config) {
                            ngModel.$setViewValue(data.uri);
                            scope.thumbnailSrc = data.uri;
                        });
                    }
                }
            };


            scope.getTemplate = function(){
                if(!_.isUndefined(attrs.piTemplate)){
                    return attrs.piTemplate;
                }

                return 'html/upload-thumbnail.html';
            }
        };

        return {
            require: '^ngModel',
            scope: {

            },
            link: linkFn,
            template: '<ng-include class="upload-thumbnail" src="getTemplate()"></ng-include>'
        }
    };

    UploadThumbnail.$inject = ['Upload', 'piHttp'];

    angular
        .module('pi')
        .directive('uploadThumbnail', UploadThumbnail);

})();