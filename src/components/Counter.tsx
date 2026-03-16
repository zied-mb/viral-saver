import { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
}

const Counter: React.FC<CounterProps> = ({ target }) => {
  const [count, setCount] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const containerRef = useRef<HTMLSpanElement>(null); // 👈 نراقبوا الـ span هذا
  const [isVisible, setIsVisible] = useState(false);
  const duration = 2000;

  //Intersection Observer باش نعرفو الـ Counter دخل للشاشة ولا لا
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
    if (!isVisible) return; // 👈 ما يبدا الـ Animation كان كي يولي مرئي

    startTimeRef.current = undefined;
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [target, isVisible]); // نزيدو isVisible هنا

  return <span ref={containerRef}>{count.toLocaleString()}</span>;
};

export default Counter;
