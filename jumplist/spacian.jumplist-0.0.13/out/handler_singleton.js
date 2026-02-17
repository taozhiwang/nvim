"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jumpBack = exports.jumpForward = exports.registerJump = void 0;
const jump_list_handler_1 = require("./jump_list_handler");
let jumpHandler = null;
function getJumpHandler(context) {
    if (jumpHandler === null) {
        jumpHandler = new jump_list_handler_1.JumpHandler();
        context.subscriptions.push(jumpHandler);
    }
    return jumpHandler;
}
function registerJump(context, jumpListId) {
    const handler = getJumpHandler(context);
    handler.registerJump(jumpListId);
    return;
}
exports.registerJump = registerJump;
function jumpForward(context, jumpListId) {
    const handler = getJumpHandler(context);
    handler.jumpForward(jumpListId);
    return;
}
exports.jumpForward = jumpForward;
function jumpBack(context, jumpListId) {
    const handler = getJumpHandler(context);
    handler.jumpBack(jumpListId);
    return;
}
exports.jumpBack = jumpBack;
//# sourceMappingURL=handler_singleton.js.map