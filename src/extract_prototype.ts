var ILLEGAL_KEYS: { [key: string]: boolean } = {
    constructor: true,
    refs: true,
    props: true,
    state: true,
    getDOMNode: true,
    setState: true,
    replaceState: true,
    forceUpdate: true,
    isMounted: true,
    setProps: true,
    replaceProps: true
};

function extractPrototype<T>(clazz: { new (): T }): T {
    var proto: T = (<T>{});
    for (var key in clazz.prototype) {
        if (ILLEGAL_KEYS[key] === undefined) {
            (<any>proto)[key] = clazz.prototype[key];
        }
    }
    return proto;
}

export = extractPrototype;
