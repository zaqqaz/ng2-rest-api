export default class Helper {
    /**
     * Copy instance with their methods
     */
    static copyInstances(target: any, ...sources: any[]): any;
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
    static encodeUriSegment(val: any): string;
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
    static encodeUriQuery(val: any, pctEncodeSpaces: any): string;
    static entries(obj: any): {};
    static isValidDottedPath(path: any): boolean;
    static lookupDottedPath(obj: any, path: any): any;
    static extractParams(data: any, actionParams: any): {};
    static setUrlParams(data: any, params: any, actionUrl: any): string;
}
