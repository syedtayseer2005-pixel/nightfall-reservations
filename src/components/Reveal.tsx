import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "scale";

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(variantClass[variant], className)}
    >
      {children}
    </Tag>
  );
}