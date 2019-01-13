define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Role;
    (function (Role) {
        Role[Role["Admin"] = 1] = "Admin";
        Role[Role["Chef"] = 2] = "Chef";
        Role[Role["Customer"] = 3] = "Customer";
        Role[Role["SuperAdmin"] = 4] = "SuperAdmin";
    })(Role = exports.Role || (exports.Role = {}));
});