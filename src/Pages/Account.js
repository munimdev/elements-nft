import React, { useEffect, useState } from "react";
import { readOnlyContract } from "../config";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

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

const importantText = `
1. To be eligible for rewards, you must hold your NFT for at least 20 days.

2. Once the bonus rewards system is activated, it will repeat every 90 days.

3. If you are eligible for rewards, you can claim it by clicking the "Claim Bonus" button in the "Account" section.

4. If you are eligible for rewards, you must claim it before the next payout date. Otherwise, you will lose your rewards.

5. Expanding on the previous point, you are eligible for only one payout. If you fail to claim your reward within the 90-day period, you will lose your rewards but will be eligible for the next payout.`;

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
  // const [lastBonusClaim, setLastBonusClaim] = useState(0);
  const [payoutCycleTime, setPayoutCycleTime] = useState(0);

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
    }
  }, [account]);

  // use effect to set interval to update bonus payout date after every bonus payout cycle time
  // however, for first set interval, it should check how many seconds are left for next payout
  // and then set interval for that time
  // this is to ensure that the payout date is updated at the correct time
  // useEffect(() => {

  // }, [bonusActive, payoutCycleTime, bonusPayoutDate]);

  useEffect(() => {
    const fetchPageData = async () => {
      const isBonusActive = await readOnlyContract.methods.bonusActive().call();
      setBonusActive(isBonusActive);
      let payoutCycleTime = await readOnlyContract.methods
        .BONUS_PAYOUT_CYCLE()
        .call();
      console.log(payoutCycleTime);
      let bonusPayoutDate = isBonusActive
        ? await readOnlyContract.methods.latestCycle().call()
        : "-";
      if (isBonusActive) {
        let date = new Date(bonusPayoutDate * 1000);
        const currentDate = new Date();

        while (date < currentDate) {
          date = new Date(date.getTime() + parseInt(payoutCycleTime) * 1000);
        }

        const formattedDate = date.toLocaleString();
        setBonusPayoutDate(formattedDate);
      }
      setPayoutCycleTime(parseInt(payoutCycleTime));
      setPricePerEligibleToken(
        await readOnlyContract.methods.bonusPayoutAmount().call()
      );
    };

    fetchPageData();
  }, []);

  const handleClaimBonus = async () => {
    if (!account) {
      toast.error("Please connect your wallet to claim bonus.");
      return;
    }

    if (userBonus === 0) {
      toast.error("You have no bonus to claim.");
      return;
    }
    toast.dismiss();
    const loadingToast = toast.loading("Claiming in progress...");

    try {
      const gasAmount = await NFTContract.methods
        .claimBonus()
        .estimateGas({ from: account[0] })
        .catch((error) => {
          console.log(error);
          error.message =
            "There was an error claiming your bonus. Please try again.";
          toast.dismiss();
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
          toast.dismiss();
          console.log("here");
          toast.success("Bonus claimed successfully!");
          // setTotalBonusClaimed(
          //   parseInt(userBonus) + parseInt(totalBonusClaimed)
          // );
          setTotalBonusClaimed((t) => parseInt(t) + parseInt(userBonus));
          setUserBonus(0);
          // readOnlyContract.methods
          //   .bonusPayoutDate()
          //   .call()
          //   .then((res) => {
          //     const date = new Date(res * 1000);
          //     const formattedDate = date.toLocaleString(undefined, {
          //       day: "2-digit",
          //       month: "2-digit",
          //       year: "numeric",
          //       hour: "2-digit",
          //       minute: "2-digit",
          //       second: "2-digit",
          //       timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          //     });
          //     setBonusPayoutDate(formattedDate);
          //   });
          setUserEligibleTokens(["0", "0", "0", "0"]);
        })
        .on("error", (error) => {
          console.log(error);
          error.message =
            "There was an error claiming your bonus. Please try again.";
          toast.dismiss();
          toast.error(error.message);
        });
    } catch (err) {
      console.error(err.message);
      err.message = "There was an error claiming your bonus. Please try again.";
      toast.dismiss();
      toast.error(err.message);
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
          {`Bonus Payout Available: ${userBonus} USD`}
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
      <div>
        <div className="w-full px-4 pt-6">
          <div className="w-full p-2 mx-auto rounded-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-center w-3/5 px-4 py-2 mx-auto text-sm font-medium text-left bg-white rounded-lg hover:bg-slate-300 focus:outline-none">
                    <span className="text-center text-black">
                      Important Information regarding bonus rewards
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
                    <p
                      className="flex justify-center mx-auto"
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "14px",
                        lineHeight: "1.8em",
                        letterSpacing: "normal",
                        maxWidth: "60%",
                      }}
                    >
                      {importantText}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
