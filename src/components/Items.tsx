import { MockData } from "../types/common";

interface ItemsProps {
  item: MockData;
}

const Items = ({ item }: ItemsProps) => {
  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <span>{item.productName}</span>
      <span>{item.productId}</span>
      <span>{item.price}</span>
      <span>{item.boughtDate}</span>
    </div>
  );
};

export default Items;
