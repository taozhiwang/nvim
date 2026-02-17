"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumpList = void 0;
const jump_point_1 = require("./jump_point");
class JumpList {
    root;
    node;
    max;
    insertJumpOnForward;
    len = 0;
    constructor(max, insertJumpOnForward) {
        this.max = max;
        this.root = new jump_point_1.JumpPointRoot();
        this.node = this.root;
        this.insertJumpOnForward = insertJumpOnForward;
        return;
    }
    popLeft() {
        if (this.root.hasNext()) {
            this.root.getNext().delete();
            this.len -= 1;
        }
        return;
    }
    popRight() {
        if (this.root.hasPrev()) {
            this.root.getPrev().delete();
            this.len -= 1;
        }
        return;
    }
    insertAfterCurrent(jumpPoint) {
        const next = this.node.getNext();
        this.node.setNext(new jump_point_1.JumpPointNode(jumpPoint, this.node, next));
        next.setPrev(this.node.getNext());
        this.len += 1;
        return;
    }
    insertBeforeCurrent(jumpPoint) {
        const prev = this.node.getPrev();
        this.node.setPrev(new jump_point_1.JumpPointNode(jumpPoint, prev, this.node));
        prev.setNext(this.node.getPrev());
        this.len += 1;
        return;
    }
    goToNext() {
        this.cleanup_forwards();
        if (this.node.hasNext()) {
            this.node = this.node.getNext();
        }
        return;
    }
    goToPrevious() {
        this.cleanup_backwards();
        if (this.node.hasPrev()) {
            this.node = this.node.getPrev();
        }
        return;
    }
    deleteAfterCurrent() {
        while (!this.node.getNext().isRoot()) {
            this.node.getNext().delete();
            this.len -= 1;
        }
        return;
    }
    limitSizeAtStart() {
        while (this.len > this.max) {
            this.popLeft();
        }
        return;
    }
    limitSizeAtEnd() {
        while (this.len > this.max) {
            this.popRight();
        }
    }
    amendJump(jump) {
        if (jump.equals(this.node.val)) {
            this.node.val.update(jump.row, jump.col);
            return true;
        }
        return false;
    }
    internalRegisterJump(jump) {
        this.deleteAfterCurrent();
        this.insertAfterCurrent(jump);
        this.limitSizeAtStart();
        return;
    }
    registerOrAmendJump(jump) {
        const didAmend = this.amendJump(jump);
        if (!didAmend) {
            this.internalRegisterJump(jump);
            this.goToNext();
        }
        return;
    }
    jumpForward(jump, insert) {
        if (!this.node.hasNext()) {
            return null;
        }
        const didAmend = this.amendJump(jump);
        if (this.insertJumpOnForward && insert && !didAmend) {
            this.insertAfterCurrent(jump);
            this.goToNext();
        }
        this.goToNext();
        return this.node.val;
    }
    jumpBack(curr, insert) {
        // base case: current is root -> create jump point
        if (this.node.isRoot()) {
            this.internalRegisterJump(curr);
            this.goToNext();
            return this.node.val;
        }
        // previous is root: amend insert new jump point before current
        else if (this.node.getPrev().isRoot()) {
            const didAmend = this.amendJump(curr);
            if (!didAmend) {
                this.insertBeforeCurrent(curr);
                this.goToPrevious();
                this.limitSizeAtEnd();
            }
            return this.node.val;
        }
        // on strict equality, move back a jump point
        else if (curr.equalsStrict(this.node.val)) {
            this.goToPrevious();
            return this.node.val;
        }
        // on normal equality, return current jump point location
        else if (curr.equals(this.node.val)) {
            return this.node.val;
        }
        else if (insert) {
            this.internalRegisterJump(curr);
            return this.node.val;
        }
        return this.node.val;
    }
    getRoot() {
        return this.root;
    }
    getCurrent() {
        return this.node;
    }
    deleteNode(node) {
        const prev = node.getPrev();
        var next = node.getNext();
        node.delete();
        if (!this.node.valid()) {
            if (!prev.isRoot()) {
                this.node = prev;
            }
            else if (!next.isRoot()) {
                this.node = next;
            }
            else {
                this.node = this.root;
            }
        }
        return;
    }
    cleanup_backwards() {
        if (this.node.isRoot()) {
            return;
        }
        var prev = this.node.getPrev();
        const val = this.node.val;
        while (!prev.isRoot() && val.equals(prev.val)) {
            const t = prev.getPrev();
            prev.delete();
            this.len -= 1;
            prev = t;
        }
    }
    cleanup_forwards() {
        if (this.node.isRoot()) {
            return;
        }
        var next = this.node.getNext();
        const val = this.node.val;
        while (!next.isRoot() && val.equals(next.val)) {
            const t = next.getNext();
            next.delete();
            this.len -= 1;
            next = t;
        }
    }
}
exports.JumpList = JumpList;
//# sourceMappingURL=jump_list.js.map