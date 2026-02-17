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
        return this.val != null;
    }
    hasPrev() {
        return this.prev != null && this.prev.valid();
    }
    hasNext() {
        return this.next != null;
    }
    disconnectNext() {
        this.next = null;
    }
}
;
class JumpPointNode extends JumpPointBaseNode {
    constructor(val, prev) {
        super(val, prev);
        return;
    }
}
exports.JumpPointNode = JumpPointNode;
;
class JumpPointRoot extends JumpPointBaseNode {
    constructor() {
        super();
    }
}
exports.JumpPointRoot = JumpPointRoot;
class JumpPoint {
    static combineLineCount = vscode.workspace.getConfiguration('jumplist').get('combineLineCount');
    row;
    col;
    doc;
    constructor(row, col, doc) {
        this.row = row;
        this.col = col;
        this.doc = doc;
    }
    equals(other) {
        return (other != null
            && Math.abs(this.row - other.row) <= JumpPoint.combineLineCount
            && this.doc.fileName == other.doc.fileName);
    }
}
exports.JumpPoint = JumpPoint;
;
//# sourceMappingURL=interfaces.js.map