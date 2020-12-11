"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_integrator_factory_1 = require("./lib/app-integrator-factory");
exports.activate = (context) => {
    const appIntegrator = new app_integrator_factory_1.default().create();
    appIntegrator.integrate(context);
};
exports.deactivate = () => { };
//# sourceMappingURL=extension.js.map