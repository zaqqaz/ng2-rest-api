export class Helper {

  // /**
  //  * Copy instance with their methods
  //  */
  static copyInstances(target, ...sources) {
    sources.forEach(source => {
      Object.defineProperties(target, Object.keys(source).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
      }, {}));
    });
    return target;
  }

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
  static encodeUriSegment(val) {
    return Helper.encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }

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
  static encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
  }

  // Helper functions and regex to lookup a dotted path on an object
  // stopping at undefined/null.  The path must be composed of ASCII
  // identifiers (just like $parse)
  static isValidDottedPath(path) {
    let MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
    return (path != null && path !== '' && path !== 'hasOwnProperty' &&
    MEMBER_NAME_REGEX.test('.' + path));
  }


  static lookupDottedPath(obj, path) {
    if (!Helper.isValidDottedPath(path)) {
      throw Error(`Dotted member path "${path}" is invalid.`);
    }

    var keys = path.split('.');
    for (var i = 0, ii = keys.length; i < ii && typeof obj !== 'undefined'; i++) {
      var key = keys[i];
      obj = (obj !== null) ? obj[key] : undefined;
    }

    return obj;
  }

  static extractParams(data, actionParams) {
    var ids = {};
    for (let key of Object.keys(actionParams)) {
      let value = actionParams[key];
      if (value && typeof value === 'function') {
        value = value();
      }
      ids[key] = value && value.charAt && value.charAt(0) == '@' ?
        Helper.lookupDottedPath(data, value.substr(1)) : value;
    }

    return ids;
  }

  static setUrlParams(data, params, actionUrl) {
    let protocolAndDomain = '',
      urlParams = {},
      url = actionUrl,
      PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/,
      val,
      encodedVal;

    url.split(/\W/).forEach(function (param) {
      if (param === 'hasOwnProperty') {
        throw Error("hasOwnProperty is not a valid parameter name.");
      }
      if (!(new RegExp("^\\d+$").test(param)) && param &&
        (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
        let isQueryParamValue = (new RegExp("\\?.*=:" + param + "(?:\\W|$)")).test(url);
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

    for (let urlParam of Object.keys(urlParams)) {
      let paramInfo = urlParams[urlParam];
      val = params.hasOwnProperty(urlParam) ? params[urlParam] : '';
      if (typeof val !== 'undefined' && val !== null) {

        if (paramInfo.isQueryParamValue) {
          encodedVal = Helper.encodeUriQuery(val, true);
        } else {
          encodedVal = Helper.encodeUriSegment(val);
        }
        url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), (match, p1) => encodedVal + p1);
      } else {
        url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), (match, leadingSlashes, tail) => {
          if (tail.charAt(0) == '/') {
            return tail;
          } else {
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
    let compiledUrl = protocolAndDomain + url.replace(/\/\\\./, '/.');


    // set other get params
    for (let key of Object.keys(params)) {
      let value = params[key];
      if (!urlParams[key] && value) {
        compiledUrl += (compiledUrl.indexOf("?") < 0 ? "?" : "&") + key + "=" + value;
      }
    }

    return compiledUrl;
  }

  static normalizeUrl(str) {

    // make sure protocol is followed by two slashes
    str = str.replace(/:\//g, '://');

    // remove consecutive slashes
    str = str.replace(/([^:\s])\/+/g, '$1/');

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    str = str.replace(/(\?.+)\?/g, '$1&');

    return str;
  }


  static readHeaders(headersForReading, headers) {
    let result = {};

    headersForReading.forEach((headerKey) => {
      let header = headers.get(headerKey);

      if (header) {
        result[headerKey] = header;
      }
    });

    return result;
  }
}
