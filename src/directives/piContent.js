(function(){
  "use strict";

  var piContentCtrl = function($scope)
  {
     var ctrl = this;
        ctrl.model = $scope.model = {view: 'normal'};

     var normalView = function()
     {
       $scope.model.view = "normal";
       ctrl.model.view = "normal";
       $scope.$broadcast('view',{"name":'normal'})
     };

     ctrl.getView = $scope.getView = function()
     {
       return $scope.view;
     }

     ctrl.viewEdit = $scope.viewEdit = function()
     {
         $scope.model.view = "edit";
         ctrl.model.view = "edit";
         $scope.$broadcast('view',{"name":'edit'})
     };

     ctrl.endEdit = $scope.endEdit = function()
     {
       normalView();
     };

     ctrl.cancelEdit = $scope.cancelEdit = function()
     {
       normalView();
     };
   };

  var piContent = function(){

       var linkFn = function(scope, elem, attrs)
       {
           elem.addClass('pi-content');

           if(scope.piContentEditable){
               elem.addClass('pi-content-editable');
           }

           elem.on('mouseenter', function(){
               elem.addClass('pi-content--hover');
           });

           elem.on('mouseleave', function(){
               elem.removeClass('pi-content--hover');
           });

           scope.$on('view', function(event, args){
             if(args.name == 'normal'){
               elem.removeClass('pi-content--edit');
             } else if(args.name == 'edit') {
               elem.addClass('pi-content--edit');
             }
           });

       };

       return {
           link: linkFn,
           restrict: 'A',
           controller: 'PiContentCtrl',
           scope: true
       }
   };

   var piContentView = function()
   {
       var linkFn = function(scope, elem, attrs, piContentCtrl)
       {
         scope.$on('view', function(event, args){
           if(args.name == 'normal'){
               elem.removeClass('hide');
           } else if(args.name == 'edit'){
               elem.addClass('hide');
           }
         });

         scope.ctrl = piContentCtrl;
         elem.addClass('pi-content-view');
       }
       return {
           link: linkFn,
           restrict: 'A',
           require: '^piContent',
           scope: {
             'view': '@'
           }
       }
   };

   var piContentEditable = function()
   {
       var linkFn = function(scope, elem, attrs, piContentCtrl)
       {
         elem.addClass('hide');

         scope.$on('view', function(event, args){
           if(args.name == 'edit'){
               elem.removeClass('hide');
           } else if(args.name == 'normal'){
               elem.addClass('hide');
           }
         });
           elem.addClass('pi-content-editable');
       }
       return {
           link: linkFn,
           restrict: 'A',
           require: '^piContent',
           scope: {
             'view': '='
           }
       }
   };

   var piContentEdit = function()
   {
       var linkFn = function(scope, elem, attrs, piContentCtrl)
       {
           elem.addClass('pi-content-edit');

           elem.bind('click', function(){
               piContentCtrl.viewEdit();
           })
       }
       return {
           link: linkFn,
           restrict: 'A',
           require: '^piContent'
       }
   };

   var piContentEditableCancel = function()
   {
       var linkFn = function(scope, elem, attrs, piContentCtrl)
       {
           elem.addClass('pi-content-editable-cancel');

           elem.bind('click', function(){
               piContentCtrl.cancelEdit();
           })
       }
       return {
           link: linkFn,
           restrict: 'A',
           require: '^piContent'
       }
   };
   var piContentEditableSubmit = function()
   {
       var linkFn = function(scope, elem, attrs, piContentCtrl)
       {
           elem.addClass('pi-content-editable-submit');

           elem.bind('click', function(){
               scope.onSubmit();
               piContentCtrl.endEdit();
           })
       }
       return {
           link: linkFn,
           restrict: 'A',
           require: '^piContent',
           scope: {
             'onSubmit': '&'
           }
       }
   };

   angular
    .module('pi')
      .controller('PiContentCtrl', piContentCtrl)
      .directive('piContent', piContent)
      .directive('piContentView', piContentView)
      .directive('piContentEditable', piContentEditable)
      .directive('piContentEditableCancel', piContentEditableCancel)
      .directive('piContentEditableSubmit', piContentEditableSubmit)
      .directive('piContentEdit', piContentEdit);
})();
