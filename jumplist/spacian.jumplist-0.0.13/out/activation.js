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
exports.activation = void 0;
const vscode = __importStar(require("vscode"));
const jump_list_handler_1 = require("./jump_list_handler");
function activation(context) {
    const jumpListCount = vscode.workspace
        .getConfiguration('jumplist')
        .get('jumpListCount');
    for (let i = 0; i < jumpListCount; i++) {
        let registerJumpString = "jumplist.registerJump";
        if (i > 0) {
            registerJumpString = registerJumpString.concat(i.toString());
        }
        const registerJumpDisposable = vscode.commands.registerCommand(registerJumpString, () => {
            (0, jump_list_handler_1.registerJump)(context, i);
        });
        let jumpForwardString = "jumplist.jumpForward";
        if (i > 0) {
            jumpForwardString = jumpForwardString.concat(i.toString());
        }
        const jumpForwardDisposable = vscode.commands.registerCommand(jumpForwardString, () => {
            (0, jump_list_handler_1.jumpForward)(context, i);
        });
        let jumpBackString = "jumplist.jumpBack";
        if (i > 0) {
            jumpBackString = jumpBackString.concat(i.toString());
        }
        const jumpBackDisposable = vscode.commands.registerCommand(jumpBackString, () => {
            (0, jump_list_handler_1.jumpBack)(context, i);
        });
        context.subscriptions.push(registerJumpDisposable);
        context.subscriptions.push(jumpForwardDisposable);
        context.subscriptions.push(jumpBackDisposable);
    }
}
exports.activation = activation;
//# sourceMappingURL=activation.js.map