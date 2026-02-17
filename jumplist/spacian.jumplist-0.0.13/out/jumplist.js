"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumpList = void 0;
const jumppoint_1 = require("./jumppoint");
class JumpList {
    root;
    node;
    max;
    insertJumpOnForward;
    len = 0;
    constructor(max, insertJumpOnForward) {
        this.max = max;
        this.root = new jumppoint_1.JumpPointRoot();
        this.node = this.root;
        this.insertJumpOnForward = insertJumpOnForward;
        return;
    }
    popLeft() {
        if (this.root.hasNext()) {
            const next = this.root.next;
            next.prev = null;
            this.root.next = next.next;
            this.len -= 1;
        }
        return;
    }
    insertAfterCurrent(jumpPoint) {
        const next = this.getJumpPointNode().next;
        this.getJumpPointNode().next =
            new jumppoint_1.JumpPointNode(jumpPoint, this.getJumpPointNode(), next);
        if (next != null) {
            next.prev = this.getJumpPointNode().next;
        }
        this.len += 1;
        this.goToNext();
        return;
    }
    getLength() {
        return this.len;
    }
    hasNext() {
        return this.node.hasNext();
    }
    hasPrevious() {
        return this.node.hasPrev();
    }
    goToNext() {
        if (this.hasNext()) {
            this.node = this.node.next;
        }
        return;
    }
    goToPrevious() {
        if (this.hasPrevious()) {
            this.node = this.node.prev;
        }
        return;
    }
    deleteAfterCurrent() {
        let next = this.getJumpPointNode().next;
        while (next != null) {
            this.len -= 1;
            next = next.next;
        }
        this.getJumpPointNode().disconnectNext();
        return;
    }
    limitSize() {
        while (this.getLength() > this.max) {
            this.popLeft();
        }
        return;
    }
    getNJumpPoint() {
        return this.node.val;
    }
    getJumpPoint() {
        return this.node.val;
    }
    getJumpPointNode() {
        return this.node;
    }
    amendJump(jump) {
        if (jump.equals(this.getNJumpPoint())) {
            this.getJumpPoint().col = jump.col;
            this.getJumpPoint().row = jump.row;
            return true;
        }
        return false;
    }
    internalRegisterJump(jump) {
        if (jump.equals(this.getJumpPoint())) {
            this.goToPrevious();
        }
        this.deleteAfterCurrent();
        this.insertAfterCurrent(jump);
        this.limitSize();
        return;
    }
    registerOrAmendJump(jump) {
        const didAmend = this.amendJump(jump);
        if (!didAmend) {
            this.internalRegisterJump(jump);
        }
        return;
    }
    jumpForward(jump) {
        if (!this.hasNext()) {
            return null;
        }
        const didAmend = this.amendJump(jump);
        if (!didAmend && this.insertJumpOnForward) {
            this.insertAfterCurrent(jump);
        }
        this.goToNext();
        return this.getNJumpPoint();
    }
    jumpBack(jump) {
        if (jump.equalsStrict(this.getNJumpPoint())) {
            this.goToPrevious();
            return this.getNJumpPoint();
        }
        else if (jump.equals(this.getNJumpPoint())) {
            return this.getNJumpPoint();
        }
        this.internalRegisterJump(jump);
        this.goToPrevious();
        return this.getNJumpPoint();
    }
    getRoot() {
        return this.root;
    }
    getCurrent() {
        return this.getJumpPointNode();
    }
    deleteNode(node) {
        if (this.getRoot() == node) {
            return;
        }
        if (this.getJumpPointNode() == node) {
            this.goToPrevious();
        }
        const prev = node.prev;
        node.delete();
        if (prev != this.getRoot()
            && prev.next != null
            && prev.val.equals(prev.next.val)) {
            this.deleteNode(prev.next);
        }
        return;
    }
}
exports.JumpList = JumpList;
//# sourceMappingURL=jumplist.js.map