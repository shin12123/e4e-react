import { useLayoutEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import animationData from "../../logo/daniil-ganzina-logo-light-theme-no-color-wave.json";

export default function AnimatedFooterLogo() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isReadyRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    isReadyRef.current = false;
    isAnimatingRef.current = false;
    hasPlayedRef.current = false;

    let observer = null;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(animationData)),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    animationRef.current = animation;
    animation.setSubframe(false);
    animation.pause();
    animation.goToAndStop(0, true);

    const playOnce = () => {
      if (!animation.isLoaded || isAnimatingRef.current || hasPlayedRef.current) return;

      observer?.disconnect();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animation.goToAndStop(Math.max(0, animation.totalFrames - 1), true);
        hasPlayedRef.current = true;
        return;
      }

      isAnimatingRef.current = true;
      animation.setDirection(1);
      animation.goToAndPlay(0, true);
    };

    const handleComplete = () => {
      animation.goToAndStop(Math.max(0, animation.totalFrames - 1), true);
      hasPlayedRef.current = true;
      isAnimatingRef.current = false;
    };

    const handleReady = () => {
      if (isReadyRef.current) return;

      animation.pause();
      animation.setDirection(1);
      animation.goToAndStop(0, true);
      isReadyRef.current = true;

      if (!("IntersectionObserver" in window)) {
        playOnce();
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) playOnce();
        },
        { threshold: [0.7] },
      );
      observer.observe(containerRef.current);
    };

    animation.addEventListener("DOMLoaded", handleReady);
    animation.addEventListener("complete", handleComplete);
    if (animation.isLoaded) handleReady();

    return () => {
      observer?.disconnect();
      animation.removeEventListener("DOMLoaded", handleReady);
      animation.removeEventListener("complete", handleComplete);
      animation.destroy();
      animationRef.current = null;
    };
  }, []);

  return (
    <span
      className="footer-lottie-button"
      role="img"
      aria-label="Daniil Ganzina"
    >
      <span ref={containerRef} className="footer-lottie-logo" aria-hidden="true" />
    </span>
  );
}
