'use client';

import React, { useEffect } from 'react';

export function ScrollRevealProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .reveal-zoom').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const revealElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-top:not(.is-visible), .reveal-bottom:not(.is-visible), .reveal-zoom:not(.is-visible)'
      );

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight * 0.92) {
          target.classList.add('is-visible');
        }
      });
    };

    // IntersectionObserver for continuous optimal performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(
        '.reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .reveal-zoom'
      );
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    };

    observeAll();
    window.addEventListener('scroll', revealElements, { passive: true });
    window.addEventListener('resize', revealElements, { passive: true });

    // MutationObserver to capture dynamically rendered items
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', revealElements);
      window.removeEventListener('resize', revealElements);
    };
  }, []);

  return <>{children}</>;
}

interface RevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'zoom';
  delay?: number; // delay in ms
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, direction = 'bottom', delay = 0, className = '', style }: RevealProps) {
  const dirClass = `reveal-${direction}`;
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  const combinedClasses = `${dirClass} ${delayClass} ${className}`.trim();

  return (
    <div className={combinedClasses} style={style}>
      {children}
    </div>
  );
}
