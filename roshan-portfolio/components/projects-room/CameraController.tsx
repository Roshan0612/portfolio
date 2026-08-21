"use client";

import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface CameraControllerProps {
  camera: THREE.PerspectiveCamera;
}

export default function CameraController({
  camera,
}: CameraControllerProps) {
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        maxScroll > 0
          ? window.scrollY / maxScroll
          : 0;

      const targetZ =
        8 - progress * 10;

      const targetY =
        1.5 - progress * 0.5;

      gsap.to(camera.position, {
        z: targetZ,
        y: targetY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [camera]);

  return null;
}