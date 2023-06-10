import React, { useEffect, useState } from "react";
import "../App.css";

const welcomeText = `
Elements_nft is a unique collections of 4 series NFTs which each of serie have 1111 pcs NFT bonus cards  representing 4 elements same as a basic components of this world.

The world could not function in the perfect without Air, Water, Fire and Earth.

As the world becomes more and more digital it is time to start more caring about the planet Earth based on these 4 elements.
`;

const philosophyText = `
Across the world and all cultures there exists symbolism related to 4 nature elements. Air, Water, Fire and Earth.

Without these the world could not exist in the perfect.

You can imagine the circle. If we start with the Wind (Air) - it raises the clouds. Clouds are created by Water that nurtures down the Earth. This allows to grow the vegetation and the wood that kindles the fire.
`;

const philosophySubText = `
These four elements we can find in the external material world but also believe that they are a part of human body. Unique personalities, moods, abilities and emotions are governed and regulated by these four elements.
`;

function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bannerStyle = {
    backgroundImage: `url(assets/banner.gif)`,
    backgroundSize: `${100 + scrollPosition / 10}%`, // increase size with scrolling
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minWidth: "980px",
    height: "100vh",
    transform: `scale(${1 + scrollPosition / 1000})`, // zoom effect
    opacity: `${1 - scrollPosition / 1000}`, // fade effect
  };

  return (
    <div className="font-normal" style={{ backgroundColor: "#2b2a2a" }}>
      <div style={{ overflow: "hidden" }}>
        <div className="banner" style={bannerStyle}></div>
      </div>
      <div className="content container mx-auto pt-14 pb-28">
        <div className="welcome mx-auto" style={{ width: "55%" }}>
          <h1 className="text-3xl font-bold">Welcome to our website!</h1>
          <div>
            <p
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                lineHeight: "1.8em",
                letterSpacing: "normal",
              }}
            >
              {welcomeText}
            </p>
          </div>
        </div>
      </div>
      <div className="philospohy mx-auto pb-28">
        <div className="grid grid-cols-2">
          <div
            className="philosophy-text mx-auto mt-20 mb-28 grid"
            style={{
              width: "50%",
            }}
          >
            <div>
              <h1
                className="text-2xl font-bold"
                style={{
                  letterSpacing: "0.35em",
                  fontStyle: "italic",
                  fontWeight: "lighter",
                }}
              >
                Philosophy
              </h1>
            </div>

            <div className="b-top"></div>

            <div
              className="b-left-small b-left-big"
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
              }}
            >
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  lineHeight: "1.8em",
                  letterSpacing: "normal",
                }}
              >
                {philosophyText}
              </p>
            </div>

            <div className="b-bottom"></div>
          </div>
          <div
            className="philosophy-image"
            style={{
              backgroundImage: `url(assets/philosophy.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // width: "100%",
              // minWidth: "100%",
              height: "auto",
              minHeight: "100%",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
      <div>
        <div className="container mx-auto pb-28" style={{ width: "57.5%" }}>
          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "14px",
              lineHeight: "1.8em",
              letterSpacing: "normal",
            }}
          >
            {philosophySubText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
