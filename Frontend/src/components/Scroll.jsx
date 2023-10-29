// import { useState } from "react";

// export const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const handleScroll = () => {
//     if (window.scrollY > 300) {
//       setIsVisible(true);
//     } else {
//       {
//         setIsVisible(false);
//       }
//     }
//   };

// const scrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// };

//   window.addEventListener("scroll", handleScroll);

//   return (
//     <div className="scroll-button">
//       <button
//         className={`recom scroll-button-logo  ${
//           isVisible ? "visible" : "hidden"
//         }`}
//         onClick={scrollToTop}
//       >
//         Volver Arriba
//       </button>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-button">
      <button
        className={`scroll-button-logo  `}
        style={{ display: isVisible ? "block" : "none" }}
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
