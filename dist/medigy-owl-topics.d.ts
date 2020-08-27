export interface OwlTopicTerm {
    readonly parentclassname: string;
    readonly parentclasslabel: string;
    readonly classname: string;
}
export interface OwlTopicClassificationResults {
    readonly data: {
        getClassHierarchy: OwlTopicTerm[];
    };
}
export interface OwlTopicNotClassifiableResource {
    readonly owlTopicNotClassifiableRemarks: string;
}
export declare function isOwlTopicClassifiableResource(o: any): o is OwlTopicNotClassifiableResource;
export interface OwlTopicClassifiedResource {
    readonly owlTopicClassification: OwlTopicClassificationResults;
}
export declare function isOwlTopicClassifiedResource(o: any): o is OwlTopicClassifiedResource;
export declare class OwlTopicListClassifier {
    static readonly singleton: OwlTopicListClassifier;
    constructor();
    callTopicsAPI(resource: any, input: any): Promise<OwlTopicNotClassifiableResource | OwlTopicClassifiedResource>;
}
export declare function getOwlTopics(): Promise<OwlTopicNotClassifiableResource | OwlTopicClassifiedResource>;
