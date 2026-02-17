"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumpListUpdater = void 0;
class JumpListUpdater {
    static updateJumpsTextDocumentChange(jumpList, changeEvent) {
        let node = jumpList.getRoot();
        while (node.hasNext()) {
            node = node.getNext();
            const jump = node.val;
            if (jump.uri.path === changeEvent.document.uri.path) {
                for (const change of changeEvent.contentChanges) {
                    JumpListUpdater.updateJumpTextDocumentChange(jump, change);
                }
            }
        }
        return;
    }
    static updateJumpsFileDeletion(jumpList, deletionEvent) {
        let node = jumpList.getRoot();
        while (node.hasNext()) {
            node = node.getNext();
            const nodePath = node.val.uri.path;
            for (const deletion of deletionEvent.files) {
                if (nodePath === deletion.path) {
                    jumpList.deleteNode(node);
                    break;
                }
            }
        }
        return;
    }
    static async updateJumpsFileRename(jumpList, renameEvent) {
        let node = jumpList.getRoot();
        while (node.hasNext()) {
            node = node.getNext();
            const nodePath = node.val.uri.path;
            for (const rename of renameEvent.files) {
                if (nodePath === rename.oldUri.path) {
                    node.val.uri = rename.newUri;
                    break;
                }
            }
        }
        return;
    }
    static updateJumpTextDocumentChange(jump, event) {
        const rel = JumpListUpdater.getJumpRelativity(jump, event.range);
        if (rel === 0) {
            JumpListUpdater.updateJumpWithChangeAtLine(jump, event);
        }
        else if (rel === 1) {
            JumpListUpdater.updateJumpWithChangeBeforeLine(jump, event);
        }
        return;
    }
    static getJumpRelativity(jump, range) {
        if (jump.row > range.end.line) {
            return 1;
        }
        if (jump.row < range.start.line) {
            return -1;
        }
        if (jump.row === range.end.line) {
            if (jump.col < range.start.character) {
                return -1;
            }
            if (jump.col >= range.end.character) {
                return 1;
            }
        }
        return 0;
    }
    static updateJumpWithChangeAtLine(jump, changeEvent) {
        const range = changeEvent.range;
        const lines = changeEvent.text.split("\n");
        const multiline = lines.length > 1;
        if (multiline) {
            jump.row = range.start.line + lines.length - 1;
            jump.col = range.end.character + lines[lines.length - 1].length;
        }
        else {
            jump.row = range.start.line;
            jump.col = range.start.character + lines[lines.length - 1].length;
        }
        return;
    }
    static updateJumpWithChangeBeforeLine(jump, event) {
        const range = event.range;
        const lines = event.text.split("\n");
        const multiline = lines.length > 1;
        if (range.end.line === jump.row) {
            const lastLine = lines[lines.length - 1];
            if (multiline) {
                jump.col += lastLine.length - range.end.character;
            }
            else {
                jump.col += lastLine.length - (range.end.character - range.start.character);
            }
        }
        jump.row += lines.length - (range.end.line - range.start.line) - 1;
        return;
    }
}
exports.JumpListUpdater = JumpListUpdater;
//# sourceMappingURL=jump_list_updater.js.map