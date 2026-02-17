"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumpPoint = exports.JumpPointRoot = exports.JumpPointNode = void 0;
const vscode = __importStar(require("vscode"));
class JumpPointBaseNode {
    prev = null;
    next = null;
    val = null;
    constructor(val, prev, next) {
        if (val != undefined) {
            this.val = val;
        }
        if (prev != undefined) {
            this.prev = prev;
        }
        if (next != undefined) {
            this.next = next;
        }
        return;
    }
    valid() {
        return !this.isRoot() && this.prev != null && this.next != null;
    }
    hasPrev() {
        return !this.prev.isRoot();
    }
    hasNext() {
        return !this.next.isRoot();
    }
    getPrev() {
        return this.prev;
    }
    getNext() {
        return this.next;
    }
    setNext(node) {
        this.next = node;
        return;
    }
    setPrev(node) {
        this.prev = node;
        return;
    }
    delete() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.prev = null;
        this.next = null;
        this.val = null;
        return;
    }
    isRoot() {
        return this.val === null;
    }
}
class JumpPointNode extends JumpPointBaseNode {
    constructor(val, prev, next) {
        super(val, prev, next);
        return;
    }
}
exports.JumpPointNode = JumpPointNode;
class JumpPointRoot extends JumpPointBaseNode {
    constructor() {
        super();
        this.setPrev(this);
        this.setNext(this);
        return;
    }
    delete() { return; }
}
exports.JumpPointRoot = JumpPointRoot;
class JumpPoint {
    static combineLineCount = vscode.workspace.getConfiguration('jumplist').get('combineLineCount');
    row;
    col;
    uri;
    constructor(row, col, uri) {
        this.row = row;
        this.col = col;
        this.uri = uri;
    }
    equals(other) {
        return (other != null
            && Math.abs(this.row - other.row) <= JumpPoint.combineLineCount
            && this.uri.fsPath === other.uri.fsPath);
    }
    equalsStrict(other) {
        return (other != null
            && this.row - other.row === 0
            && this.uri.fsPath === other.uri.fsPath);
    }
    update(row, col, uri) {
        this.row = row;
        this.col = col;
        if (uri != undefined) {
            this.uri = uri;
        }
        return;
    }
}
exports.JumpPoint = JumpPoint;
//# sourceMappingURL=jump_point.js.map