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
    <div className="scroll-button">
      <button
        className={`recom scroll-button-logo  ${
          isVisible ? "visible" : "hidden"
        }`}
        onClick={scrollToTop}
      >
        Volver Arriba
      </button>
    </div>
  );
};
