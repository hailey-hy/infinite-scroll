import { useEffect, useRef, useState } from "react";
import { MockData } from "../types/common";
import { getMockData } from "../api/getMockData";
import IsLoading from "./IsLoading";
import Items from "./Items";

const InfiniteScroll = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [datas, setDatas] = useState<MockData[] | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (pageNum: number) => {
    setIsLoading(true);
    const { datas: newDatas, isEnd: newIsEnd } = await getMockData(pageNum);
    if (newDatas) {
      setDatas((prev) => [...(prev || []), ...newDatas]);
      setIsEnd(newIsEnd);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || isEnd) return;

      if (loaderRef.current) {
        const rect = loaderRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setPageNum((pageNum) => pageNum + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isEnd, isLoading]);

  useEffect(() => {
    fetchData(pageNum);
  }, [pageNum]);

  return (
    <div>
      {datas?.map((data, index) => (
        <Items key={index} item={data} />
      ))}
      {isLoading && <IsLoading />}
      <div
        ref={loaderRef}
        style={{ height: "20px", backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default InfiniteScroll;
