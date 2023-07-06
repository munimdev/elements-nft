import React, { useEffect, useState } from "react";
import Element from "../components/Element";
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

const introductionText = `
This project is unique.

As there will not be more basic elements in the world, in this collection there will not be more than 4444 NFT bonus cards.

The holders of these bonus cards would like to take care of our planet Earth based on the 4 elements and by this way they will be part of the community which know how much important the nature is.
`;

const elementAir = `
The symbol of creativity, strategy, knowledge, communication and perception. Also vision and innovation.

The element of air is about life itself because all living creatures, animals and plants require air to live.  This element is mois, warm and provide the energy for mind and body.

Typically depicted colours are white, grey, yellow and blue.

Air sign: ♊Gemini, ♎Libra, ♒Aquarius.
`;

const elementWater = `
The symbol of change, dreaming, intuition, rebirth, clarity and fertility. Also emotions and care.

Water is smooth and calm element also it is wet and cool and it represent mind and body. This element can be found in rivers, lakes, seas, oceans and springs. Without water there would not be possible life on earth.

Typically depicted colours are black, blue, grey and silver.

Water sign: ♋Cancer, ♏Scorpio, ♓Pisces.
`;

const elementFire = `
The symbol of energy, love, desire, power, assertiveness and anger. Also challenge, goal and motivation.

Fire is warm and dry element. Predominantly associated with the sun which gives off light and protect all living creatures from the shadows.

Typically depicted colours are orange, red and yellow.

Fire Signs: ♈Aries, ♌Leo, ♐Sagittarius.
`;

const elementEarth = `
The symbol of security, health, home, stability, nourishment and fertility. Also sureness and order.

This element is the most materially grounded and it is cool and dry. It provides comfortable living space for all animals and plants. It can be found in mountains, hills and fields. This element is providing energy for all living creatures.

Typically depicted colours are brown, green and yellow.

Earth sign: ♉Taurus, ♍Virgo, ♑Capricorn.
`;

const whyThisProjectText = `
Every year the community will pick up some project focused on recovering of nature and this project will support.

Also there will be monthly bonuses (cummulated and sent once per Q) for all members of this community with ❤️ on right place.
`;

function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScrollAmount = 1000;

  const handleScroll = () => {
    const position = window.scrollY;
    console.log(position);
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bannerStyle = {
    // backgroundColor: "black",
    backgroundImage: `${
      scrollPosition > maxScrollAmount ? "" : "url(/assets/banner.gif)"
    }`,
    backgroundSize: `${
      scrollPosition <= maxScrollAmount ? 100 + scrollPosition / 10 : 100
    }%`, // increase size with scrolling
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // minWidth: "980px",
    // height: "100vh",
    minWidth: "100%",
    height: "80vh",
    // transform: `scale(${scrollPosition <= 400 ? (1 + scrollPosition / 1400): 1})`, // zoom effect
    opacity: `${
      scrollPosition <= maxScrollAmount
        ? 1 - scrollPosition / maxScrollAmount
        : 1
    }`, // fade effect
  };

  return (
    <div className="font-normal antares" style={{ backgroundColor: "#2b2a2a" }}>
      <div style={{ overflow: "hidden", backgroundColor: "black" }}>
        <div className="banner" style={bannerStyle}></div>
        <div
          className="flex justify-end text-3xl font-bold justify-self-end"
          style={{
            position: "absolute",
            top: "80%",
            right: "5%",
            left: "5%",
            color: "white",
          }}
        >
          <h1
            className=""
            // position="absolute"
          >
            Take care of the future...
          </h1>
        </div>
      </div>
      <div className="container mx-auto content pt-14 pb-28">
        <div className="mx-auto welcome" style={{ width: "55%" }}>
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
      <div className="mx-auto philospohy pb-28">
        <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
          <div
            className="grid row-span-1 mt-20 ml-48 philosophy-text mb-28 lg:col-span-1"
            style={{
              width: "50%",
            }}
          >
            <div>
              <h1
                className="text-2xl font-bold ml-14"
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
                paddingLeft: "15%",
                // paddingRight: "12.5%",
                // marginLeft: "20%",
                // marginRight: "12.5%",
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
            className="philosophy-image md:col-span-1 sm:row-span-1"
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
      <div
        className="mx-auto introduction pb-28"
        style={{
          backgroundImage: `url(assets/introduction.jpg)`,
          backgroundSize: "100% 100%",
          minHeight: "100%",
        }}
      >
        <h1
          className="pt-16 pb-40 text-5xl font-bold"
          style={{
            color: "rgba(43,42,42,1)",
            letterSpacing: "0.195em",
          }}
        >
          LET US INTRODUCE ELEMENTS NFT
        </h1>
      </div>
      <div className="mx-auto pt-14 pb-28" style={{ width: "57.5%" }}>
        {/* add two rows */}
        <div className="row-span-1 content">
          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "14px",
              lineHeight: "1.8em",
              letterSpacing: "normal",
            }}
          >
            {introductionText}
          </p>
        </div>
      </div>
      <div className="bg-black pt-14 pb-28">
        <h2 className="text-2xl font-bold">LETS EXPLORE THE ELEMENTS</h2>
      </div>
      <Element
        title={"Air"}
        text={elementAir}
        img={"/assets/air"}
        middleImg={"/assets/air-middle.png"}
        isLeft={true}
      />
      <Element
        title={"Water"}
        text={elementWater}
        img={"/assets/water"}
        middleImg={"/assets/water-middle.png"}
      />
      <Element
        title={"Fire"}
        text={elementFire}
        img={"/assets/fire"}
        middleImg={"/assets/fire-middle.png"}
        isLeft={true}
      />
      <Element
        title={"Earth"}
        text={elementEarth}
        img={"/assets/earth"}
        middleImg={"/assets/earth-middle.png"}
      />
      <div className="container pt-20 mx-auto pb-28" style={{ width: "75%" }}>
        <div className="row-span-1 content">
          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "24px",
              lineHeight: "1.8em",
              letterSpacing: "normal",
            }}
          >
            {
              "The key to an existence is to instigate balance in the universe and within ourselves."
            }
          </p>
        </div>
      </div>
      {/* Create a div with background 'project.jpg' */}
      <div
        className="mx-auto pt-14 pb-28"
        style={{
          backgroundImage: `url(assets/project.jpg)`,
          backgroundSize: "100% 100%",
          minHeight: "100%",
        }}
      >
        <div className="pt-16 pb-24 ml-24 px-14 why-this-wrapper content lg:w-[30%] md:w-[50%] sm:w-[80%]">
          <div className="grid mt-20 philosophy-text mb-28">
            <div>
              <h1
                className="text-2xl font-bold"
                style={{
                  letterSpacing: "0.35em",
                  fontStyle: "italic",
                  fontWeight: "lighter",
                }}
              >
                WHY THIS PROJECT?
              </h1>
            </div>

            <div
              className="why-left-small b-left-big"
              style={{
                paddingLeft: "15%",
                // paddingRight: "12.5%",
                // marginLeft: "20%",
                // marginRight: "12.5%",
              }}
            >
              <p
                className="py-16"
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  lineHeight: "1.8em",
                  letterSpacing: "normal",
                }}
              >
                {whyThisProjectText}
              </p>
            </div>

            <div className="b-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
