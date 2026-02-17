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
exports.JumpHandler = void 0;
const vscode = __importStar(require("vscode"));
const jump_list_1 = require("./jump_list");
const jump_point_1 = require("./jump_point");
const jump_list_updater_1 = require("./jump_list_updater");
class JumpHandler {
    jumpLists = [];
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
        const jumpListCount = vscode.workspace
            .getConfiguration('jumplist')
            .get('jumpListCount');
        for (let i = 0; i < jumpListCount; i++) {
            this.jumpLists.push(new jump_list_1.JumpList(maxSize, insertOnJumpForward));
        }
        this.textDocumentChangeListener =
            vscode.workspace.onDidChangeTextDocument((change) => {
                for (const jumpList of this.jumpLists) {
                    jump_list_updater_1.JumpListUpdater.updateJumpsTextDocumentChange(jumpList, change);
                }
            });
        this.fileRenameListener =
            vscode.workspace.onDidRenameFiles((rename) => {
                for (const jumpList of this.jumpLists) {
                    jump_list_updater_1.JumpListUpdater.updateJumpsFileRename(jumpList, rename);
                }
            });
        this.fileDeletionListener =
            vscode.workspace.onDidDeleteFiles((deletion) => {
                for (const jumpList of this.jumpLists) {
                    jump_list_updater_1.JumpListUpdater.updateJumpsFileDeletion(jumpList, deletion);
                }
            });
        return;
    }
    getJumpPoint() {
        const editor = vscode.window.activeTextEditor;
        if (editor != undefined && editor.document.uri.path.length > 0) {
            const jumpPoint = new jump_point_1.JumpPoint(editor.selection.active.line, editor.selection.active.character, editor.document.uri);
            return jumpPoint;
        }
        return null;
    }
    registerJump(jumpListId) {
        if (jumpListId >= this.jumpLists.length) {
            return;
        }
        const jumpPoint = this.getJumpPoint();
        if (jumpPoint != null) {
            this.jumpLists[jumpListId].registerOrAmendJump(jumpPoint);
        }
        return;
    }
    jumpForward(jumpListId) {
        if (jumpListId >= this.jumpLists.length) {
            return;
        }
        const currentPoint = this.getJumpPoint();
        if (currentPoint === null) {
            return;
        }
        const insert = (jumpListId === 0);
        const jumpPoint = this.jumpLists[jumpListId].jumpForward(currentPoint, insert);
        if (jumpPoint === null) {
            return;
        }
        this.jumpTo(jumpPoint);
        return;
    }
    jumpBack(jumpListId) {
        if (jumpListId >= this.jumpLists.length) {
            return;
        }
        const currentPoint = this.getJumpPoint();
        if (currentPoint === null) {
            return;
        }
        const insert = (jumpListId === 0);
        const jumpPoint = this.jumpLists[jumpListId].jumpBack(currentPoint, insert);
        if (jumpPoint === null) {
            return;
        }
        this.jumpTo(jumpPoint);
        return;
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
    async jumpTo(jump) {
        if (jump.uri != null) {
            let editor = await vscode.window.showTextDocument(jump.uri);
            if (editor.document.uri.path === jump.uri.path) {
                const jumpPosition = new vscode.Position(jump.row, jump.col);
                const selection = new vscode.Selection(jumpPosition, jumpPosition);
                editor.selection = selection;
                editor.revealRange(selection, vscode.TextEditorRevealType.InCenter);
            }
        }
        return;
    }
}
exports.JumpHandler = JumpHandler;
//# sourceMappingURL=jump_list_handler.js.map