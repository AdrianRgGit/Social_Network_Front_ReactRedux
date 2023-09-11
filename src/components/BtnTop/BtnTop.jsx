import "./BtnTop.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const BtnTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollButton = () => {
    window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollButton);

    return () => {
      window.removeEventListener("scroll", handleScrollButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <div onClick={scrollToTop}>
          <button className="btn-top" ><FontAwesomeIcon icon={faChevronUp} /><br/> Up </button>
        </div>
      )}
    </>
  );
};

export default BtnTop;
