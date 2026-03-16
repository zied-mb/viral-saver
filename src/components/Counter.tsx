import { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
}

const Counter: React.FC<CounterProps> = ({ target }) => {
  const [count, setCount] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const duration = 2000;

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
    
    const easeOutQuad = (t: number) => t * (2 - t);
    
    const currentCount = Math.floor(easeOutQuad(progress) * target);
    
    setCount(currentCount);

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    startTimeRef.current = undefined;
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
};

export default Counter;
