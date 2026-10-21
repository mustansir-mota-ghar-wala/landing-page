import { useRef } from "react";

export default function TiltCard({ as: Tag = "div", className = "", children, ...props }) {
  const node = useRef(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  function move(event) {
    const el = node.current;
    if (!el) return;
    point.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      if (!node.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const box = node.current.getBoundingClientRect();
      const px = (point.current.x - box.left) / box.width - 0.5;
      const py = (point.current.y - box.top) / box.height - 0.5;
      node.current.style.transform = `perspective(1100px) rotateY(${px * 8}deg) rotateX(${-py * 6}deg) translateZ(6px)`;
    });
  }

  function leave() {
    window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (node.current) node.current.style.transform = "";
  }

  return (
    <Tag
      ref={node}
      className={`tilt-card ${className}`.trim()}
      onPointerMove={move}
      onPointerLeave={leave}
      {...props}
    >
      {children}
    </Tag>
  );
}
