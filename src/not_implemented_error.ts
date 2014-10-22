class NotImplementedError implements Error {
    public name = "NotImplementedError";
    public message: string;

    constructor(methodName: string) {
        this.message = methodName + " should be implemented by React";
    }
}

export = NotImplementedError;
