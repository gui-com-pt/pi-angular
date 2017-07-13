(function(){
  angular
      .module('pi.admin', []);

  angular
    .module('pi.admin')
    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('admin', {
          url: '/admin',
          controller: 'pi.admin.adminCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'admin/admin.html'
        })
        .state('article-manage', {
          url: '/admin/article',
          controller: 'pi.admin.articleManageCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'admin/article-manage.html'
        })
        .state('article-edit', {
          url: '/admin/article/:id',
          controller: 'pi.admin.articleEditCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'admin/article-edit.html'
        })
        .state('event-manage', {
          url: '/admin/event',
          controller: 'pi.admin.eventManageCtrl',
          controllerAsl: 'ctrl',
          templateUrl: 'admin/event-manage.html'
        })
        .state('event-edit', {
          url: '/admin/event/:id',
          controller: 'pi.admin.eventEditCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'admin/event-edit.html'
        });
    }]);
})();
