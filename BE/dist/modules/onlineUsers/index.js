"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineState = void 0;
class OnlineUserSet {
    static instance;
    values = new Set();
    constructor() { }
    static getInstance() {
        if (!OnlineUserSet.instance) {
            OnlineUserSet.instance = new OnlineUserSet();
        }
        return OnlineUserSet.instance;
    }
    addValue(value) {
        this.values.add(value);
    }
    deleteValue(value) {
        this.values.delete(value);
    }
    getValues() {
        return Array.from(this.values);
    }
}
exports.onlineState = OnlineUserSet.getInstance();
