import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  readOnlyContract,
  oracleContract,
  activeChain,
  chainNames,
} from "../config";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";
import Slider from "react-animated-slider";

const images = [
  {
    id: 1,
    title: "Air",
    image: "air-middle.png",
    an: true,
    // image: "air-nft-card.jpg",
  },
  {
    id: 2,
    title: "Water",
    image: "water-middle.png",
    an: false,
    // image: "water-nft-card.jpg",
  },
  {
    id: 3,
    title: "Earth",
    image: "earth-middle.png",
    an: true,
    // image: "earth-nft-card.jpg",
  },
  {
    id: 4,
    title: "Fire",
    image: "fire-middle.png",
    an: false,
    // image: "fire-nft-card.jpg",
  },
];

function Mint() {
  const { account, web3api, NFTContract } = useModal();

  const [slideUpdate, setSlideUpdate] = useState(false);
  const slideIndex = useRef(1);
  const [count, setCount] = useState(1);
  const [mintCost, setMintCost] = useState(444);

  useEffect(() => {
    readOnlyContract.methods
      .PRICE_PER_NFT()
      .call()
      .then((result) => {
        setMintCost(parseInt(result));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSlideChange = (event) => {
    slideIndex.current = event.slideIndex + 1;
    console.log(slideIndex.current);
    setSlideUpdate(!slideUpdate);
  };

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const mintNFT = async () => {
    try {
      if (!account) {
        toast.error("Please connect your wallet first to mint NFTs");
        return;
      }

      if ((await web3api.eth.getChainId()) !== activeChain) {
        toast.error(
          `Please switch to ${chainNames[activeChain]} network to mint NFT`
        );
        try {
          await web3api.currentProvider
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: `0x${activeChain}` }],
            })
            .then((result) => {
              toast.info("Network changed successfully. You can mint now.");
            })
            .catch((error) => {
              if (error.code === -32002) return;
            });
        } catch (switchError) {
          if (switchError.code === -32002) return;
        }

        return;
      }

      const loadingToast = toast.loading("Minting in progress...");

      // toast.info(`Minting ${images[slideIndex.current - 1].title}`);

      // console.log("slideIndex.current", slideIndex.current);

      const ethPrice = await oracleContract.methods
        .latestAnswer()
        .call()
        .catch((error) => {
          error.message =
            "There was an error minting your NFT. Please try again.";
          toast.dismiss();
          toast.error(error.message);
        });
      console.log("ethPrice", ethPrice);
      const mintPriceInWei = Math.ceil(
        (mintCost + 0.1) * count * (10 ** 26 / parseInt(ethPrice))
      );
      console.log("mintCost", mintCost);
      console.log(mintCost + 0.1);
      console.log("count", count);
      console.log(count * 10 ** 26);
      console.log("mintPriceInWei", mintPriceInWei);
      const gasAmount = await NFTContract.methods
        .mint(slideIndex.current, count)
        .estimateGas({
          from: account[0],
          value: mintPriceInWei,
        })
        .catch((error) => {
          error.message =
            "There was an error minting your NFT. Please try again.";
          toast.dismiss();
          toast.error(error.message);
        });
      const gasPrice = await web3api.eth.getGasPrice();

      await NFTContract.methods
        .mint(slideIndex.current, count)
        .send({
          from: account[0],
          gas: Math.floor(gasAmount * 1.1),
          gasPrice: Math.floor(gasPrice * 1.1),
          value: mintPriceInWei,
        })
        .on("receipt", (receipt) => {
          toast.dismiss();
          toast.success("NFT minted successfully");
        })
        .on("error", (error) => {
          error.message =
            "There was an error minting your NFT. Please try again.";
          toast.dismiss();
          toast.error(error.message);
        });
    } catch (err) {
      toast.dismiss();
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col mt-10 antares">
      {/* <div className="mint-left">
        <div className="mint-left-video">
          <video autoPlay loop muted src="/assets/mint-video.mp4" />
        </div>
      </div> */}
      <div className="container w-[95%] md:w-3/4 mx-auto lg:w-1/2 mint-right">
        <h1 className="mb-5 text-2xl mint-header">
          Mint {images[slideIndex.current - 1].an ? "an" : "a"}{" "}
          <span className={`mint-element `}>{`${
            images[slideIndex.current - 1].title
          }`}</span>{" "}
          Element NFT
        </h1>
        <Slider onSlideChange={handleSlideChange}>
          {images.map((item, index) => (
            <div
              key={index}
              className="mint-slide flex justify-center"
              style={{
                // background: `url('assets/${item.image}') no-repeat center center`,
                filter: "url(#gotham)",
              }}
            >
              <img
                className="border border-white"
                src={`/assets/${item.image}`}
                alt="nft"
              />

              {/* <div className="center">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button>{item.button}</button>
              </div> */}
            </div>
          ))}
        </Slider>
      </div>
      <div className="gap-5 mt-6 mb-10">
        <p className="m-0 price-text">
          The price of <span id="price">{mintCost * count}</span> USD
        </p>
        <div className="mx-auto mt-3 input__div">
          <button onClick={decrement} className="minus">
            -
          </button>
          <input
            disabled={true}
            className="nft-num"
            placeholder="0"
            readyonly="true"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            type="text"
          />
          <button onClick={increment} className="plus">
            +
          </button>
        </div>
        <button onClick={mintNFT} className="mt-6 md:mt-8 mint__btn">
          Mint Now
        </button>
      </div>
      <svg id="svg_comp-ld62gke7" className="hidden gSXewE">
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
}

export default Mint;
