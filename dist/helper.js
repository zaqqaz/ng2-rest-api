"use strict";
var Helper = (function () {
    function Helper() {
    }
    /**
     * Copy instance with their methods
     */
    Helper.copyInstances = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            Object.defineProperties(target, Object.keys(source).reduce(function (descriptors, key) {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                return descriptors;
            }, {}));
        });
        return target;
    };
    /**
     * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
     * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
     * (pchar) allowed in path segments:
     *    segment       = *pchar
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    Helper.encodeUriSegment = function (val) {
        return Helper.encodeUriQuery(val, true).
            replace(/%26/gi, '&').
            replace(/%3D/gi, '=').
            replace(/%2B/gi, '+');
    };
    /**
     * This method is intended for encoding *key* or *value* parts of query component. We need a
     * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
     * have to be encoded per http://tools.ietf.org/html/rfc3986:
     *    query       = *( pchar / "/" / "?" )
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    Helper.encodeUriQuery = function (val, pctEncodeSpaces) {
        return encodeURIComponent(val).
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
    };
    Helper.entries = function (obj) {
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            yield [key, obj[key]];
        }
    };
    // Helper functions and regex to lookup a dotted path on an object
    // stopping at undefined/null.  The path must be composed of ASCII
    // identifiers (just like $parse)
    Helper.isValidDottedPath = function (path) {
        var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
        return (path != null && path !== '' && path !== 'hasOwnProperty' &&
            MEMBER_NAME_REGEX.test('.' + path));
    };
    Helper.lookupDottedPath = function (obj, path) {
        if (!Helper.isValidDottedPath(path)) {
            //noinspection TypeScriptValidateTypes
            throw Error('badmember', 'Dotted member path "@{0}" is invalid.', path);
        }
        var keys = path.split('.');
        for (var i = 0, ii = keys.length; i < ii && typeof obj !== 'undefined'; i++) {
            var key = keys[i];
            obj = (obj !== null) ? obj[key] : undefined;
        }
        return obj;
    };
    Helper.extractParams = function (data, actionParams) {
        var ids = {};
        for (var _i = 0, _a = Helper.entries(actionParams); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value && {}.toString.call(value) === '[object Function]') {
                value = value();
            }
            ids[key] = value && value.charAt && value.charAt(0) == '@' ?
                Helper.lookupDottedPath(data, value.substr(1)) : value;
        }
        return ids;
    };
    Helper.setUrlParams = function (data, params, actionUrl) {
        var protocolAndDomain = '', urlParams = {}, url = actionUrl, PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/, val, encodedVal;
        url.split(/\W/).forEach(function (param) {
            if (param === 'hasOwnProperty') {
                //noinspection TypeScriptValidateTypes
                throw Error('badname', "hasOwnProperty is not a valid parameter name.");
            }
            if (!(new RegExp("^\\d+$").test(param)) && param &&
                (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                var isQueryParamValue = (new RegExp("\\?.*=:" + param + "(?:\\W|$)")).test(url);
                urlParams[param] = {
                    isQueryParamValue: isQueryParamValue
                };
                if (!params[param] && !isQueryParamValue) {
                    params[param] = '@' + param;
                }
            }
        });
        url = url.replace(/\\:/g, ':');
        url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function (match) {
            protocolAndDomain = match;
            return '';
        });
        params = Helper.extractParams(data, params) || {};
        for (var _i = 0, _a = Helper.entries(urlParams); _i < _a.length; _i++) {
            var _b = _a[_i], urlParam = _b[0], paramInfo = _b[1];
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : '';
            if (typeof val !== 'undefined' && val !== null) {
                console.log(paramInfo);
                console.log(urlParam);
                if (paramInfo.isQueryParamValue) {
                    encodedVal = Helper.encodeUriQuery(val, true);
                }
                else {
                    encodedVal = Helper.encodeUriSegment(val);
                }
                url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function (match, p1) {
                    return encodedVal + p1;
                });
            }
            else {
                url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function (match, leadingSlashes, tail) {
                    if (tail.charAt(0) == '/') {
                        return tail;
                    }
                    else {
                        return leadingSlashes + tail;
                    }
                });
            }
        }
        url = url.replace(/\/+$/, '') || '/';
        // then replace collapse `/.` if found in the last URL path segment before the query
        // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
        url = url.replace(/\/\.(?=\w+($|\?))/, '.');
        // replace escaped `/\.` with `/.`
        var compiledUrl = protocolAndDomain + url.replace(/\/\\\./, '/.');
        // set other get params
        for (var _c = 0, _d = Helper.entries(params); _c < _d.length; _c++) {
            var _e = _d[_c], key = _e[0], value = _e[1];
            if (!urlParams[key]) {
                compiledUrl += (compiledUrl.indexOf("?") < 0 ? "?" : "&") + key + "=" + value;
            }
        }
        return compiledUrl;
    };
    return Helper;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Helper;
