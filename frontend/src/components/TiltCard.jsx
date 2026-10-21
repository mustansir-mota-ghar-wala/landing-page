import { useRef } from "react";

export default function TiltCard({ as: Tag = "div", className = "", children, ...props }) {
  const node = useRef(null);

  function move(event) {
    const el = node.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.style.transform = `perspective(920px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  }

  function leave() {
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
