import confetti from "canvas-confetti";
import { haptic } from "./haptic";

export const celebrate = () => {
  haptic()
  const duration = 1000;
  const animationEnd = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.6 }
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.6 }
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
};