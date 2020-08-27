import * as services from "@shah/traverse-urls";
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

export function isOwlTopicClassifiableResource(
  o: any
): o is OwlTopicNotClassifiableResource {
  return o && 'owlTopicNotClassifiableResource' in o;
}

export interface OwlTopicClassifiedResource {
  readonly owlTopicClassification: OwlTopicClassificationResults;
}

export function isOwlTopicClassifiedResource(
  o: any
): o is OwlTopicClassifiedResource {
  return o && 'owlTopicClassification' in o;
}

export class OwlTopicListClassifier {
  static readonly singleton = new OwlTopicListClassifier();
  constructor() { 
  }
  async callTopicsAPI(
    resource: any,
    input: any
  ): Promise<OwlTopicNotClassifiableResource | OwlTopicClassifiedResource> {
    const result = await services.call(
      resource,
      input
    );
    if (services.isCallResult(result)) {
      console.log('success');
      return {
        ...resource,
        owlTopicClassification: result.callResultPOJO,
      };
    } else {
      console.log('failure');
      return {
        ...resource,
        owlTopicNotClassifiableRemarks: `Unable to classify: ${
          result.error
          }, ${JSON.stringify(result.postBodyPOJO)}`,
      };
    }
  }
} 
export async function getOwlTopics(): Promise < OwlTopicNotClassifiableResource | OwlTopicClassifiedResource > {
  
  const topicObject = new OwlTopicListClassifier();
  const query = {
    query:
      '{\n  getClassHierarchy(rootClassName: "Collection", searchParam: "") {\n    label\n    classname\n    parentclassname\n    parentclasslabel\n  }\n}\n',
  };
  return topicObject.callTopicsAPI('https://service.ontology.attest.cloud/', query);
}

