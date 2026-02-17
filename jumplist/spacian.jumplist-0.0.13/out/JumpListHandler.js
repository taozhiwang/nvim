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
exports.jumpBack = exports.jumpForward = exports.registerJump = void 0;
const vscode = __importStar(require("vscode"));
const jumplist_1 = require("./jumplist");
const jumppoint_1 = require("./jumppoint");
const jumplistupdater_1 = require("./jumplistupdater");
class JumpHandler {
    jumpList;
    textDocumentChangeListener = null;
    fileRenameListener = null;
    fileDeletionListener = null;
    constructor() {
        const maxSize = vscode.workspace
            .getConfiguration('jumplist')
            .get('maximumJumpPoints');
        const insertOnJumpForward = vscode.workspace
            .getConfiguration('jumplist')
            .get('insertJumpPointOnForwardJump');
        this.jumpList = new jumplist_1.JumpList(maxSize, insertOnJumpForward);
        this.textDocumentChangeListener =
            vscode.workspace.onDidChangeTextDocument((change) => {
                jumplistupdater_1.JumpListUpdater.updateJumpsTextDocumentChange(this.jumpList, change);
            });
        this.fileRenameListener =
            vscode.workspace.onDidRenameFiles((rename) => {
                jumplistupdater_1.JumpListUpdater.updateJumpsFileRename(this.jumpList, rename);
            });
        this.fileDeletionListener =
            vscode.workspace.onDidDeleteFiles((deletion) => {
                jumplistupdater_1.JumpListUpdater.updateJumpsFileDeletion(this.jumpList, deletion);
            });
    }
    getJumpPoint() {
        const editor = vscode.window.activeTextEditor;
        if (editor != undefined) {
            const jumpPoint = new jumppoint_1.JumpPoint(editor.selection.active.line, editor.selection.active.character, editor.document.uri);
            return jumpPoint;
        }
        return null;
    }
    registerJump() {
        const jumpPoint = this.getJumpPoint();
        if (jumpPoint != null) {
            this.jumpList.registerOrAmendJump(jumpPoint);
        }
        return;
    }
    jumpForward() {
        const currentPoint = this.getJumpPoint();
        if (currentPoint == null) {
            return;
        }
        const jumpPoint = this.jumpList.jumpForward(currentPoint);
        if (jumpPoint == null) {
            return;
        }
        this.jumpTo(jumpPoint);
        return;
    }
    jumpBack() {
        const currentPoint = this.getJumpPoint();
        if (currentPoint == null) {
            return;
        }
        const jumpPoint = this.jumpList.jumpBack(currentPoint);
        if (jumpPoint == null) {
            return;
        }
        this.jumpTo(jumpPoint);
    }
    dispose() {
        if (this.textDocumentChangeListener != null) {
            this.textDocumentChangeListener.dispose();
            this.textDocumentChangeListener = null;
        }
        if (this.fileDeletionListener != null) {
            this.fileDeletionListener.dispose();
            this.fileDeletionListener = null;
        }
        if (this.fileRenameListener != null) {
            this.fileRenameListener.dispose();
            this.fileRenameListener = null;
        }
        return;
    }
    jumpTo(jump) {
        if (jump.uri != null) {
            vscode.window.showTextDocument(jump.uri);
            if (vscode.window.activeTextEditor
                && vscode.window.activeTextEditor.document.uri.path === jump.uri.path) {
                const jumpPosition = new vscode.Position(jump.row, jump.col);
                const selection = new vscode.Selection(jumpPosition, jumpPosition);
                vscode.window.activeTextEditor.selection = selection;
                vscode.window.activeTextEditor.revealRange(selection, vscode.TextEditorRevealType.InCenter);
            }
        }
        return;
    }
}
let jumpHandler = null;
function getJumpHandler(context) {
    if (jumpHandler == null) {
        jumpHandler = new JumpHandler();
        context.subscriptions.push(jumpHandler);
    }
    return jumpHandler;
}
function registerJump(context) {
    const handler = getJumpHandler(context);
    handler.registerJump();
    return;
}
exports.registerJump = registerJump;
function jumpForward(context) {
    const handler = getJumpHandler(context);
    handler.jumpForward();
    return;
}
exports.jumpForward = jumpForward;
function jumpBack(context) {
    const handler = getJumpHandler(context);
    handler.jumpBack();
    return;
}
exports.jumpBack = jumpBack;
//# sourceMappingURL=jumplisthandler.js.map