import React, { useEffect, useState } from "react";
import Element from "../components/Element";
import "../App.css";

const welcomeText = `
Introducing Elements_nft, a captivating collection of NFTs that celebrates the fundamental elements shaping our world: Air, Water, Fire, and Earth. Imagine immersing yourself in a digital realm where each series boasts 1111 exquisite NFT bonus cards, meticulously crafted to embody the essence of these elemental forces.

In this ever-evolving digital era, it is imperative that we redirect our focus to the planet Earth and deepen our connection with its core elements. As the world embraces the boundless possibilities of the digital realm, let us remember the irreplaceable role played by Air, Water, Fire, and Earth in sustaining life as we know it.

Join us on an enchanting journey where art and technology converge to foster a newfound appreciation for our planet's delicate balance. Through stunning visual representations and thought-provoking symbolism, these NFTs serve as reminders of the profound interdependence between humanity and the natural world.

With every pixel and brushstroke, Elements_nft beckons you to recognize the importance of environmental stewardship. Let us unite in our shared responsibility to safeguard the very elements that give us life. Together, we can leverage the power of the digital landscape to inspire collective action and forge a brighter, sustainable future for our beloved Earth.

Embark on this extraordinary voyage with Elements_nft, where art, technology, and environmental consciousness intertwine, creating a mesmerizing tapestry that celebrates the beauty and fragility of our world.
`;

const philosophyText = `The symbolism surrounding the four elements of nature—Air, Water, Fire, and Earth—resonates across all cultures worldwide.

These elements hold immense significance, for their absence would disrupt the world's delicate balance of perfection.

Imagine a mesmerizing circle unfolding before your eyes. Let's begin at the ethereal realm of Wind, where its gentle touch lifts and sculpts majestic clouds. These clouds, born from the embrace of Water, shower their nurturing essence upon the Earth below. This harmonious cycle enables the sprouting of vibrant vegetation and the growth of wood, essential for kindling the transformative power of Fire.
`;

const philosophySubText = `
These four elements we can find in the external material world but also believe that they are a part of human body. Unique personalities, moods, abilities and emotions are governed and regulated by these four elements.
`;

const introductionText = `
As we marvel at these elements in the external world, it becomes clear that they are intricately intertwined with our very being. Deeply ingrained within us, they govern and shape our individuality, evocative moods, extraordinary abilities, and profound emotions. We are, in essence, a reflection of the interplay between these four elemental forces.

Prepare to embark on a truly exceptional journey with this one-of-a-kind project.

This collection stands out as a rare gem in a world where the elements form the very foundation of existence. Limited to a remarkable 4444 NFT bonus card, it encapsulates the essence of these elemental forces.

What sets this project apart is its profound commitment to environmental stewardship. The holders of these coveted bonus cards share a deep desire to nurture and protect our precious planet Earth. By aligning themselves with this community, they become an integral part of a collective that understands and cherishes the paramount importance of nature.

Join the ranks of those who recognize the beauty and significance of the four elements, and together, let us strive to create a sustainable future for generations to come.
`;

const elementAir = `
Behold the emblem of boundless creativity, strategic prowess, profound wisdom, effective communication, and heightened perception. It is the very essence of vision and innovation.

The element of air breathes life into existence itself, for every living creature, be it animal or plant, relies on its nurturing embrace. This ethereal force imbues the world with moisture, warmth, and the vital energy that invigorates both mind and body.

When envisioning the element of air, one often visualizes a harmonious palette of colors. The ethereal hues of white, grey, yellow, and blue encapsulate its essence, evoking a sense of tranquility and serenity.

The air sign bears the emblem of intellect and adaptability within the celestial realm. ♊Gemini, ♎Libra, and ♒Aquarius, representing this elemental force, embrace the winds of change and wield the power of innovation with grace and agility.
`;

const elementWater = `
Behold the profound symbol of transformation, ethereal dreams, intuitive wisdom, rejuvenation, crystal-clear clarity, and abundant fertility. It is the essence of deep emotions and nurturing care.

Water, the element of serenity and calmness, flows gracefully through existence. It is both refreshing and cool, encapsulating the essence of tranquility, while nurturing both the mind and body. From majestic rivers to serene lakes, vast seas to expansive oceans, and enchanting springs, water pervades the earthly realm, enabling and sustaining the very essence of life.

Immerse yourself in a palette of evocative colors that reflect the spirit of water. Shades of black, blue, grey, and silver paint a mesmerizing canvas that captures the fluidity and depth of this elemental force.

Within the realm of the zodiac, the water sign embodies emotional depth and intuitive prowess. ♋Cancer, ♏Scorpio, and ♓Pisces, bearers of the water sign, dance with the tides of change and navigate the realms of empathy and compassion with remarkable grace.
`;

const elementFire = `
Behold the captivating symbol of unbridled energy, passionate love, unwavering desire, indomitable power, assertiveness, and fiery anger. It represents the essence of challenge, ambition, and relentless motivation.

Fire, the element that radiates warmth and exudes a dry heat, is intrinsically linked to the celestial sun. Like a celestial guardian, the sun illuminates our world, banishing shadows and providing protection to all living creatures.

Vivid and evocative colors manifest in depictions of fire, with hues of orange, red, and yellow igniting the senses. These fiery shades encapsulate the intensity and vibrancy of this elemental force, stirring the soul with their brilliance.

Embracing the realm of the zodiac, fire signs embody the unyielding spirit of adventure and unapologetic self-expression. ♈Aries, ♌Leo, and ♐Sagittarius, bearers of the fire sign, blaze a trail of passion, radiating confidence, and unrelenting determination in their pursuit of greatness.
`;

const elementEarth = `
Witness the profound embodiment of security, vitality, sanctuary, unwavering stability, nourishing sustenance, and abundant fertility. It carries the essence of unwavering assurance and harmonious order.

The element of Earth, firmly rooted in the material realm, exudes a cool and dry nature. It serves as the very foundation of existence, providing a comforting haven for all creatures, both animal and plant alike. Mountains, hills, and fields bear the imprint of Earth, offering a harmonious dwelling place and serving as a wellspring of energy for all living beings.

Delve into a captivating palette of colors that artistically captures the essence of Earth. Rich shades of brown, vibrant greens and warm yellows paint a vivid canvas, evoking a sense of abundance, growth, and natural splendor.

In the realm of the zodiac, Earth signs symbolize practicality and unwavering resilience. ♉Taurus, ♍Virgo, and ♑Capricorn, bearers of the Earth sign, embody steadfastness and forge a deep connection to the tangible world. Rooted in stability, they epitomize the virtues of patience, industriousness, and a profound understanding of the importance of balance.

`;

const whyThisProjectText = `
Each year, our dedicated community selects a nature-focused endeavor aimed at restoring and revitalizing our precious environment. By participating in this project, you become a crucial supporter of these noble causes.

Additionally, as a valued member of our community, you can claim quarterly bonus available for holders NFT cards after login in their account. We wholeheartedly believe in recognizing and appreciating our members who hold a genuine passion for making a positive impact on the world.
`;

function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScrollAmount = 1000;

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
      <div className="container mx-auto content pt-14 pb-14 md:pb-28">
        <div className="mx-auto welcome md:w-[80%] lg:w-[55%]" >
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
        <div className="lg:grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
          <div
            className="grid row-span-1 mt-20 md:ml-48 philosophy-text mb-28 lg:col-span-1 w-full md:w-[65%] lg:w-[55%]"
           
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
              className="b-left-small pl-5 pr-5 md:pr-0 lg:pl-[15%] b-left-big"
              style={{
                // paddingLeft: "15%",
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
            className="philosophy-image md:col-span-1 sm:row-span-1 h-[400px] lg:h-auto lg:min-h-max"
            style={{
              backgroundImage: `url(assets/philosophy.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // width: "100%",
              // minWidth: "100%",
              // height: "auto",
              // minHeight: "100%",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
      <div>
        <div className="container mx-auto pb-28 w-full md:w-[75%] lg:w-[57%]">
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
          className="pt-16 pb-10 md:pt-16 md:pb-40 text-3xl md:text-5xl font-bold"
          style={{
            color: "rgba(43,42,42,1)",
            letterSpacing: "0.195em",
          }}
        >
          LET US INTRODUCE ELEMENTS NFT
        </h1>
      </div>
      <div className="mx-auto px-4 md:px-0 pt-14 pb-28 md:w-[75%] lg:w-[57%]" >
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
      <div className="bg-black pt-28 pb-28">
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
      <div className="container pt-20 mx-auto pb-28 w-[100%] md:w-[75%] px-[5%]" >
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
              "Unlocking the secret to a harmonious existence lies in cultivating equilibrium, both in the vast universe and within the depths of our own being."
            }
          </p>
        </div>
      </div>
      {/* Create a div with background 'project.jpg' */}
      <div
        className="mx-auto pt-14 pb-28 object-cover h-auto md:min-w-full bg_size"
        style={{
          backgroundImage: `url(assets/project.jpg)`,
      
      
        }}
      >
        <div className="pt-16 pb-24 md:ml-24 px-10 md:px-14 why-this-wrapper content mx-auto lg:w-[35%] md:w-[70%]  sm:w-[80%]">
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
              className="why-left-small b-left-big pl-[15%]"
              style={{
     
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
