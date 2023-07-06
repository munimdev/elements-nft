import React from "react";
import { useModal } from "../context/ModalContext";

const images = [
  {
    id: 1,
    title: "Air",
    image: "air-nft-card.jpg",
    gradient: "from-white to-white",
    balance: 1,
    eligible: 1,
    earned: 20,
  },
  // 3 gradients, from via to
  {
    id: 2,
    title: "Fire",
    image: "fire-nft-card.jpg",
    gradient: "from-yellow-400 from-1% via-red-500 to-99% to-yellow-400",
    balance: 3,
    eligible: 2,
    earned: 40,
  },
  {
    id: 3,
    title: "Water",
    image: "water-nft-card.jpg",
    gradient: "from-blue-400 via-blue-500 to-blue-400",
    balance: 0,
    eligible: 0,
    earned: 20,
  },
  {
    id: 4,
    title: "Earth",
    image: "earth-nft-card.jpg",
    gradient: "from-green-400 via-green-500 to-green-400",
    balance: 2,
    eligible: 1,
    earned: 0,
  },
];

function Account() {
  const handleClaimBonus = async () => {};

  return (
    <div className="container mt-14">
      <div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {images.map((image) => (
            <div className="" id={image.id}>
              <span
                className={`text-xl text-transparent text-white bg-clip-text bg-gradient-to-r ${image.gradient}`}
              >
                {image.title}
              </span>
              <div className="border border-white rounded-xl">
                <img
                  className="mb-2 rounded-tr-xl rounded-tl-xl"
                  src={`/assets/${image.image}`}
                  alt={image.title}
                />
                <p className="text-xl text-white">
                  <span className="text-sm text-white">x</span>
                  {image.balance}
                  <span className="text-base text-white">{" Owned"}</span>
                </p>
                <div className="px-6 mt-8 mb-4 space-y-2">
                  <p className="text-sm text-white font">
                    <span className="">Payout eligible NFTs: </span>
                    {`${image.eligible}`}
                  </p>
                  <p className="text-sm text-white">
                    <span className="">USDC Earned: </span>
                    {`${image.earned} USDC`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <p className="mb-4 text-xl text-white">{`Estimated Total Payout: 80 USDC`}</p>
          <p className="text-xl text-white">
            {`Next Payout Date: 13 August, 2023`}
          </p>
          <button
            className="p-2 mt-4 text-white bg-black rounded-md mint__btn"
            onClick={handleClaimBonus}
          >
            Claim Bonus
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
