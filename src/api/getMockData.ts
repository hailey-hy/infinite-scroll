import { MOCK_DATA } from "../constants/mockData";
import { MockData, PER_PAGE } from "../types/common";

interface MockDataResult {
  datas: MockData[];
  isEnd: boolean;
}

export const getMockData = (pageNum: number): Promise<MockDataResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const datas: MockData[] = MOCK_DATA.slice(
        PER_PAGE * pageNum,
        PER_PAGE * (pageNum + 1)
      );
      const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

      resolve({ datas, isEnd });
    }, 1500);
  });
};
