import React from "react";

const Element = ({ isLeft, title, text, img, middleImg }) => {
  return (
    <div className="relative mx-auto philospohy">
      <div className="lg:grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
        {isLeft ? (
          <>
            <div className="grid mt-20 element-text-right mb-28">
              <div
                className="lg:justify-self-start justify-self-center w-full md:w-[75%] lg:w-[60%]"
              
              >
                <div>
                  <h1
                    className="text-2xl font-bold text-left md:text-center px-10"
                    style={{
                      letterSpacing: "0.35em",
                      fontStyle: "italic",
                      fontWeight: "lighter",
                    }}
                  >
                    {title}
                  </h1>
                </div>

                <div className="b-top"></div>

                <div
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
                    {text}
                  </p>
                </div>

                <div className="b-bottom"></div>
              </div>
            </div>
            <div
              className="relative philosophy-image bg-contain md:bg-cover h-[380px] lg:min-h-[100%] lg:h-auto"
              style={{
                backgroundImage: `url(${img}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",      
                overflow: "hidden",
              }}
            >
              <video
                className="absolute inset-0 object-cover w-full h-full"
                autoPlay
                muted
                loop
                src={`${img}.mp44`}
              />
            </div>
          </>
        ) : (
          <>
            <div
              className="hidden lg:flex relative philosophy-image h-[380px] md:min-h-[100%] md:h-auto"
              style={{
                backgroundImage: `url(${img}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

             
                overflow: "hidden",
              }}
            >
              <video
                className="absolute inset-0 object-cover w-full h-full"
                autoPlay
                muted
                loop
                src={`${img}.mp44`}
              />
            </div>
            <div className="grid mt-20 element-text-right mb-28">
              <div
                className="md:pt-10 lg:justify-self-end lg:pt-0 justify-self-center  w-full md:w-[75%] lg:w-[60%]"
               
              >
                <div>
                  <h1
                    className="text-2xl px-10 font-bold text-left md:text-center"
                    style={{
                      letterSpacing: "0.35em",
                      fontStyle: "italic",
                      fontWeight: "lighter",
                    }}
                  >
                    {title}
                  </h1>
                </div>

                <div className="b-top"></div>

                <div
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
                    {text}
                  </p>
                </div>

                <div className="b-bottom"></div>
              </div>
            </div>

            <div
              className="block lg:hidden relative philosophy-image h-[380px] lg:min-h-[100%] lg:h-auto"
              style={{
                backgroundImage: `url(${img}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

             
                overflow: "hidden",
              }}
            >
              <video
                className="absolute inset-0 object-cover w-full h-full"
                autoPlay
                muted
                loop
                src={`${img}.mp44`}
              />
            </div>
          </>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          className="object-contain middle-img"
          width={"30%"}
          // height={}
          src={middleImg}
          alt=""
          style={{ filter: "url(#gotham)" }}
        />
      </div>
      <svg id="svg_comp-ld62gke7" class="gSXewE hidden">
        <defs>
          <filter id="gotham" color-interpolation-filters="sRGB">
            <feComponentTransfer result="srcRGB" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.95" />
              <feFuncG type="linear" slope="0.95" />
              <feFuncB type="linear" slope="0.95" />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.35" intercept="-0.18" />
              <feFuncG type="linear" slope="1.35" intercept="-0.18" />
              <feFuncB type="linear" slope="1.35" intercept="-0.18" />
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0.5" result="saturation" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.5764705882352941
              0 0 0 0 0.403921568627451
              0 0 0 0 0.43529411764705883
              0 0 0 1 0"
              in="SourceGraphic"
              result="color"
            />
            <feComponentTransfer in="color" result="color_alpha">
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feBlend
              mode="multiply"
              in="color_alpha"
              in2="saturation"
              result="source"
            />
            <feComponentTransfer />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Element;
