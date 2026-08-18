import { useLayoutEffect, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import animationData from "../../logo/daniil-ganzina-logo-wave-only-dark-site-reverse.json";

export default function AnimatedFooterLogo({ onThemeChange }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isAtEndRef = useRef(false);
  const directionRef = useRef(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    animationRef.current = animation;
    animation.goToAndStop(0, true);

    const handleComplete = () => {
      const completedForward = directionRef.current === 1;
      const restingFrame = completedForward ? Math.max(0, animation.totalFrames - 1) : 0;

      animation.goToAndStop(restingFrame, true);
      isAtEndRef.current = completedForward;
      isAnimatingRef.current = false;
      setIsAnimating(false);
    };

    animation.addEventListener("complete", handleComplete);

    return () => {
      animation.removeEventListener("complete", handleComplete);
      animation.destroy();
      animationRef.current = null;
    };
  }, []);

  const handleClick = () => {
    const animation = animationRef.current;
    if (!animation || isAnimatingRef.current) return;

    const direction = isAtEndRef.current ? -1 : 1;
    const startingFrame = direction === 1 ? 0 : Math.max(0, animation.totalFrames - 1);

    isAnimatingRef.current = true;
    directionRef.current = direction;
    setIsAnimating(true);
    onThemeChange?.(direction === 1);
    animation.goToAndStop(startingFrame, true);
    animation.setDirection(direction);
    animation.play();
  };

  return (
    <button
      type="button"
      className="footer-lottie-button"
      onClick={handleClick}
      disabled={isAnimating}
      aria-label="Daniil Ganzina — змінити тему логотипа"
    >
      <span ref={containerRef} className="footer-lottie-logo" aria-hidden="true" />
    </button>
  );
}
