(function(){
	angular
		.module('pi')
		.provider('facebookMetaService', [function(){

			var _meta = {},
				_author = 'https://www.facebook.com/living.with.jesus',
				_publisher = 'https://www.facebook.com/codigo.ovh',
				_locale = 'pt_PT',
				_type = 'article',
				_siteName = 'Codigo',
				_image = '',
				_description = 'Os artigos que escrevo são daquilo que aprendo e faço, desde linguagens de programação e segurança informática a notícias e tutoriais.',
				_image = '';

			var setDefault = function() {
				_meta = {
					'og:site_name': _siteName,
					'og:type': _type,
					'og:locale': _locale,
					'og:image': _image,
					'article:author': _author,
					'article:publisher': _publisher,
					'og:description': _description,
					'description': _description
				};
			}

			setDefault();

			return {
				$get: function() {
					return {
						clean: function(){
							setDefault();
						},
						set: function(title, description, image) {
							_meta['og:locale'] = 'pt_PT';
							_meta['og:title'] = title;
							_meta['og:description'] = description;
							_meta['description'] = description;
							_meta['og:image'] = image;
						},
						meta: function(){
							return _meta;
						}
					}
				},
				setDescription: function(type) {
					_description = type;
				},
				setImage: function(image) {
					_image = image;
				},
				setAuthor: function(author){
					_author = author;
				},
				setPublisher: function(publisher) {
					_publisher = publisher;
				},
				setLocale: function(locale) {
					_locale = locale;
				},
				setType: function(type) {
					_type = type;
				},
				setSiteName: function(siteName) {
					_siteName = siteName;
				}
			}

			
		}])
		.directive('facebookMeta', [function(){
			return {
				replace: true,
				template: '<meta ng-repeat="(key, value) in $root.metas" property="{{key}}" content="{{value}}">',
				controller: ['$rootScope', '$scope', 'facebookMetaService', function($rootScope, $scope, facebookMetaService) {
					facebookMetaService.set('Codigo', 'Site de Programação', 'http://codigo.ovh/logo.png');
					$rootScope.metas = facebookMetaService.meta();
				}]
			}
		}])
})();