var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@shah/traverse-urls"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getOwlTopics = exports.OwlTopicListClassifier = exports.isOwlTopicClassifiedResource = exports.isOwlTopicClassifiableResource = void 0;
    const services = __importStar(require("@shah/traverse-urls"));
    function isOwlTopicClassifiableResource(o) {
        return o && 'owlTopicNotClassifiableResource' in o;
    }
    exports.isOwlTopicClassifiableResource = isOwlTopicClassifiableResource;
    function isOwlTopicClassifiedResource(o) {
        return o && 'owlTopicClassification' in o;
    }
    exports.isOwlTopicClassifiedResource = isOwlTopicClassifiedResource;
    class OwlTopicListClassifier {
        constructor() {
        }
        callTopicsAPI(resource, input) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield services.call(resource, input);
                if (services.isCallResult(result)) {
                    console.log('success');
                    return Object.assign(Object.assign({}, resource), { owlTopicClassification: result.callResultPOJO });
                }
                else {
                    console.log('failure');
                    return Object.assign(Object.assign({}, resource), { owlTopicNotClassifiableRemarks: `Unable to classify: ${result.error}, ${JSON.stringify(result.postBodyPOJO)}` });
                }
            });
        }
    }
    exports.OwlTopicListClassifier = OwlTopicListClassifier;
    OwlTopicListClassifier.singleton = new OwlTopicListClassifier();
    function getOwlTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            const topicObject = new OwlTopicListClassifier();
            const query = {
                query: '{\n  getClassHierarchy(rootClassName: "Collection", searchParam: "") {\n    label\n    classname\n    parentclassname\n    parentclasslabel\n  }\n}\n',
            };
            return topicObject.callTopicsAPI('https://service.ontology.attest.cloud/', query);
        });
    }
    exports.getOwlTopics = getOwlTopics;
});
//# sourceMappingURL=medigy-owl-topics.js.map