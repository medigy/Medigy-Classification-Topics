
import { Expect, Test, TestFixture, Timeout } from 'alsatian';
import * as tpList from './medigy-owl-topics';

@TestFixture('Medigy Topics Test Suite')
export class TestSuite {
  @Timeout(60000)
  @Test('Test a topics API Call')
  async testMeshApiCall(): Promise<void> {
    const resource: any = await tpList.getOwlTopics();
    // const resource:any = await object.flow();
    Expect(resource).toBeDefined();
    Expect(tpList.isOwlTopicClassifiedResource(resource)).toBe(true);
  }
}
