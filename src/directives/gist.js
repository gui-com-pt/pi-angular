/**
 * @ng-doc directive
 * @name gist
 * @description
 *
 * Directive to embed a iframe from GitHub Gist service.
 * Original directive: https://gist.github.com/tleunen/5277011
 */
(function(){
	var directiveFn = function() { 
	    return function(scope, elm, attrs) {
	        var gistId = attrs.gistId;

	        var iframe = document.createElement('iframe');
	        iframe.setAttribute('width', '100%');
	        iframe.setAttribute('frameborder', '0');
	        iframe.id = "gist-" + gistId;
	        elm[0].appendChild(iframe);

	        var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js"></sc'+'ript></body></html>';

	        var doc = iframe.document;
	        if (iframe.contentDocument) doc = iframe.contentDocument;
	        else if (iframe.contentWindow) doc = iframe.contentWindow.document;

	        doc.open();
	        doc.writeln(iframeHtml);
	        doc.close();
	    };
	 };

	 angular
	 	.module('pi')
	 	.directive('gist', directiveFn);
})();