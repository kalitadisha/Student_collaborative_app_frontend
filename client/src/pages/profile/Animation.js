import anime from "animejs/lib/anime.es.js";
import React, { useEffect, useRef } from "react";
import "./anime.css";

const Animated = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textWrapper = textRef.current;
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime.timeline().add({
      targets: ".ml7 .letter",
      translateY: ["1.1em", 0],
      translateX: ["0.55em", 0],
      translateZ: 0,
      rotateZ: [180, 0],
      duration: 750,
      easing: "easeOutExpo",
      delay: (el, i) => 50 * i,
    });
  }, []);

  return (
    <h1 className="ml7">
      <span className="text-wrapper">
        <span className="letters" ref={textRef}>
          Hi! Akash
        </span>
      </span>
    </h1>
  );
};

export default Animated;
