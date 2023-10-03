import { useState } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      {
        setIsVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`recom scroll-to-top-button ${
        isVisible ? "visible" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      Volver Arriba
    </button>
  );
};
