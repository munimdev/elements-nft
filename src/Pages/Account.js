import React, { useEffect, useState } from "react";
import { readOnlyContract } from "../config";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";

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
    title: "Water",
    image: "water-nft-card.jpg",
    gradient: "from-blue-400 via-blue-500 to-blue-400",
    balance: 0,
    eligible: 0,
    earned: 20,
  },
  {
    id: 3,
    title: "Earth",
    image: "earth-nft-card.jpg",
    gradient: "from-green-400 via-green-500 to-green-400",
    balance: 2,
    eligible: 1,
    earned: 0,
  },
  {
    id: 4,
    title: "Fire",
    image: "fire-nft-card.jpg",
    gradient: "from-yellow-400 from-1% via-red-500 to-99% to-yellow-400",
    balance: 3,
    eligible: 2,
    earned: 40,
  },
];

function Account() {
  const { account, web3api, NFTContract } = useModal();
  const [userBalance, setUserBalance] = useState();
  const [userEligibleTokens, setUserEligibleTokens] = useState();
  const [eligibleCount, setEligibleCount] = useState(0);
  const [pricePerEligibleToken, setPricePerEligibleToken] = useState(0);
  const [bonusActive, setBonusActive] = useState(false);
  const [bonusPayoutDate, setBonusPayoutDate] = useState();
  const [totalBonusClaimed, setTotalBonusClaimed] = useState(0);
  const [userBonus, setUserBonus] = useState(0);

  useEffect(() => {
    // let account = ["0x4926eF65A449B95C04ef590EAc68eaed36Df40F1"];
    if (account) {
      readOnlyContract.methods
        .getUserOwnedTokens(account[0])
        .call()
        .then((res) => {
          console.log(res);
          setUserBalance(res);
        });
      readOnlyContract.methods
        .getEligibleTokenCount(account[0])
        .call()
        .then((res) => {
          setUserEligibleTokens(res);
          let totalCount = res.reduce((a, b) => parseInt(a) + parseInt(b), 0);
          setEligibleCount(totalCount);
        });
      readOnlyContract.methods
        .totalBonusClaimed(account[0])
        .call()
        .then((res) => {
          setTotalBonusClaimed(res);
        });
      readOnlyContract.methods
        .calculateBonus(account[0])
        .call()
        .then((res) => {
          setUserBonus(res);
        })
        .catch((err) => {
          if (
            err.message ===
            "Returned error: execution reverted: Bonus is not yet available"
          ) {
            setUserBonus(0);
          }
        });
      readOnlyContract.methods
        .bonusActive()
        .call()
        .then((res) => {
          setBonusActive(res);
        });
      readOnlyContract.methods
        .bonusPayoutDate()
        .call()
        .then((res) => {
          const date = new Date(res * 1000);
          const formattedDate = date.toLocaleString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
          setBonusPayoutDate(formattedDate);
        });
      readOnlyContract.methods
        .bonusPayoutAmount()
        .call()
        .then((res) => {
          setPricePerEligibleToken(res);
        });
    }
  }, [account]);
  const handleClaimBonus = async () => {
    if (!account) {
      toast.error("Please connect your wallet to claim bonus.");
      return;
    }

    if (userBonus === 0) {
      toast.error("You have no bonus to claim.");
      return;
    }

    const loadingToast = toast.loading("Claiming in progress...");

    try {
      const gasAmount = await NFTContract.methods
        .claimBonus()
        .estimateGas({ from: account[0] })
        .catch((error) => {
          error.message =
            "There was an error claiming your bonus. Please try again.";
          toast.dismiss(loadingToast);
          toast.error(error.message);
        });
      const gasPrice = await web3api.eth.getGasPrice();

      await NFTContract.methods
        .claimBonus()
        .send({
          from: account[0],
          gas: gasAmount,
          gasPrice: gasPrice,
        })
        .on("receipt", (receipt) => {
          toast.dismiss(loadingToast);
          toast.success("Bonus claimed successfully!");
          setTotalBonusClaimed(userBonus);
          setUserBonus(0);
          readOnlyContract.methods
            .bonusPayoutDate()
            .call()
            .then((res) => {
              setBonusPayoutDate(
                new Date(res * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ")
              );
            });
        })
        .on("error", (error) => {
          error.message =
            "There was an error claiming your bonus. Please try again.";
          toast.dismiss(loadingToast);
          toast.error(error.message);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-14">
      <div
        className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
        key={457}
      >
        {images.map((image, index) => (
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
                {userBalance ? userBalance[index] : 0}
                <span className="text-base text-white">{" Owned"}</span>
              </p>
              <div className="px-6 mt-8 mb-4 space-y-2">
                <p className="text-sm text-white font">
                  <span className="">Payout eligible NFTs: </span>
                  {/* {`${image.eligible}`} */}
                  {`${userEligibleTokens ? userEligibleTokens[index] : 0}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10" key={34985}>
        <p className="mb-4 text-xl text-white">{`Bonus Per NFT: ${pricePerEligibleToken} USD`}</p>
        <p className="mb-4 text-xl text-white">
          {`Estimated Next Bonus Payout: ${userBonus} USD`}
        </p>
        <p className="mb-4 text-xl text-white">{`Total Bonus Earned: ${totalBonusClaimed} USD`}</p>
        <p className="text-xl text-white">
          {/* {`Next Payout Date: 13 August, 2023`} */}
          {"Next Payout Date: "}
          {bonusActive ? `${bonusPayoutDate}` : "-"}
        </p>
        <button
          className="p-2 mt-4 text-white bg-black rounded-md mint__btn"
          onClick={handleClaimBonus}
        >
          Claim Bonus
        </button>
      </div>
    </div>
  );
}

export default Account;
