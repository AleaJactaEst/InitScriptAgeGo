(function () {
    var getCookie = function (name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return '';
    };

    var getC01 = function () {
        try {
            var c = JSON.parse(getCookie('ag-s9803'));
        } catch (e) {
            return '';
        }

        if (!c.hasOwnProperty('c01')) {
            return '';
        }

        return c.c01;
    };

    var blurElements = function () {
        var bodyElements = document.body.children;
        const node_reference = document.querySelectorAll('*');

        for (var i in bodyElements) {
            var element = bodyElements.item(i);

            if (null === element) {
                continue;
            }
            if ("string" !== typeof(element.className)) {
                continue;
            }
            if (
                undefined !== element.className &&
                -1 !== element.className.indexOf('ag-overlay')
            ) {
                continue;
            }
            element.className += ' ag-blurry';
        }

        for (const node of node_reference) {
            if (node.tagName === 'BODY' || node.tagName === 'HTML') {
                node.className += ' ag-overflow';
                continue;
            }
            node.style.filter = 'blur(10px)';
        }
    };

    var removePreLoadBlurring = function () {
        if (0 < document.getElementsByTagName('body').length) {
            var element = document.getElementsByTagName('body')[0];
            element.className = element.className.replace(' ag-body-pre-blurring', '');
        }
    };

    var initialHtmlBlur = function(blur) {
        for (const node of document.children) {
            node.style.filter = blur;
        }
    };

    var loadStylesheets = function () {
        initialHtmlBlur('blur(10px)');
        var css = 'div.ag-overlay{position:absolute;top:0;left:0;width:100%;height:100vh;height: calc(var(--vh, 1vh) * 100);' +
            'max-height:142vw;background-color:rgba(20, 20, 20, 0.6);z-index:99999999}' +
            'div.ag-overlay iframe{width:100%;height:100vh;height:calc(var(--vh, 1vh) * 100);border:none}' +
            '.ag-overflow{height:100vh;height:calc(var(--vh, 1vh) * 100);overflow:hidden}' +
            '.ag-no-scroll{overflow:hidden}.ag-blurry{filter:blur(10px)}';
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        if (styleNode.styleSheet) {// IE
            styleNode.styleSheet.cssText = css;
        } else {
            var cssNode = document.createTextNode(css);
            styleNode.appendChild(cssNode);
        }

        if (0 < document.getElementsByTagName('head').length) {
            document.getElementsByTagName('head')[0].appendChild(styleNode);
        }


    };

    loadStylesheets();
    window.onload = function() {
        var agWidget = document.createElement('script');
        agWidget.src = 'https\u003A\/\/verify0.agego.com\/verify.js?siteid=1&flowid=12&subid=&fulllog=&sid='
            + getCookie('ag-se9803') + '&aid=' + getC01() + '&test=&advertiser=';
        document.body.appendChild(agWidget);
        removePreLoadBlurring();
        initialHtmlBlur(null);
        blurElements();
    }
})();
