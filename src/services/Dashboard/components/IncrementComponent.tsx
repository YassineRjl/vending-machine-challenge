import { useState } from "react";

interface IncrementComponentProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

const IncrementComponent: React.FC<IncrementComponentProps> = ({
  quantity,
  onChange,
}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count + 1 > quantity) return;
    setCount(count + 1);
    onChange && onChange(count + 1);
  };

  const decrement = () => {
    if (count <= 0) return;
    setCount(count - 1);
    onChange && onChange(count - 1);
  };

  return (
    <div className="space-x-4">
      <button
        className="bg-white/75 400 rounded-md w-8 h-8"
        onClick={decrement}
      >
        -
      </button>
      <span className="font-semibold text-white">{count}</span>
      <button
        className="bg-white/75 400 rounded-md w-8 h-8"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default IncrementComponent;
