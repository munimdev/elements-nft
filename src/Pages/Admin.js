import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { readOnlyContract, web3, NFTAddress } from "../config";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";

function Admin() {
  const { account, web3api, NFTContract } = useModal();

  const [totalMinted, setTotalMinted] = useState([]);
  const [totalEligible, setTotalEligible] = useState([]);
  const [payoutActive, setPayoutActive] = useState(false);
  const [totalBonusClaimed, setTotalBonusClaimed] = useState(0);
  const [bonusAmountPerNFT, setBonusAmountPerNFT] = useState(0);
  const [bonusPayoutDate, setBonusPayoutDate] = useState();
  const [bonusPayoutAmount, setBonusPayoutAmount] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);

  const [payoutInput, setPayoutInput] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const totalAir = await readOnlyContract.methods.tokenSupply(1).call();
      const totalWater = await readOnlyContract.methods.tokenSupply(2).call();
      const totalEarth = await readOnlyContract.methods.tokenSupply(3).call();
      const totalFire = await readOnlyContract.methods.tokenSupply(4).call();
      const totalEligible = await readOnlyContract.methods
        .getEligibleTokenCountTotal()
        .call();
      const payoutActive = await readOnlyContract.methods.bonusActive().call();
      setPayoutActive(payoutActive);
      const bonusAmount = await readOnlyContract.methods
        .bonusPayoutAmount()
        .call();
      let payoutCycleTime = await readOnlyContract.methods
        .BONUS_PAYOUT_CYCLE()
        .call();
      let bonusPayoutDate = payoutActive
        ? await readOnlyContract.methods.latestCycle().call()
        : "-";
      if (payoutActive) {
        let date = new Date(bonusPayoutDate * 1000);
        const currentDate = new Date();

        while (date < currentDate) {
          date = new Date(date.getTime() + payoutCycleTime * 1000);
        }

        const formattedDate = date.toLocaleString();
        setBonusPayoutDate(formattedDate);
      }
      const bonusPayoutAmount =
        totalEligible.reduce((a, b) => parseInt(a) + parseInt(b), 0) *
        bonusAmount;
      console.log(bonusPayoutAmount);
      const totalBonus = await readOnlyContract.methods.totalBonus().call();
      const balance = await web3.eth.getBalance(NFTAddress);
      setContractBalance(
        web3.utils.fromWei(balance, "ether").toString().slice(0, 6)
      );
      setTotalMinted([totalAir, totalWater, totalEarth, totalFire]);
      setTotalEligible(totalEligible);
      setPayoutActive(payoutActive);
      setBonusAmountPerNFT(bonusAmount);
      setBonusPayoutAmount(bonusPayoutAmount);
      setTotalBonusClaimed(totalBonus);
    }
    fetchData();
  }, []);

  const handlePayout = async () => {
    if (!account) {
      toast.error("Please connect your wallet first.");
      return;
    }

    const loadingToast = toast.loading("Transaction in progress...");

    const gasAmount = await NFTContract.methods
      .setBonusPayoutAmount(payoutInput)
      .estimateGas({
        from: account[0],
      })
      .catch((error) => {
        error.message =
          "There was an error with the transaction. Please try again.";
        toast.dismiss(loadingToast);
        toast.error(error.message);
        return;
      });
    const gasPrice = await web3api.eth.getGasPrice();

    await NFTContract.methods
      .setBonusPayoutAmount(payoutInput)
      .send({
        from: account[0],
        gas: gasAmount,
        gasPrice: gasPrice,
      })
      .then((receipt) => {
        toast.dismiss(loadingToast);
        toast.success("Bonus amount set successfully!");
      })
      .catch((error) => {
        console.log(error);
        error.message =
          "There was an error while setting the bonus amount. Please try again.";
        toast.dismiss(loadingToast);
        toast.error(error.message);
      });
  };

  const handleWithdraw = async () => {
    if (!account) {
      toast.error("Please connect your wallet first.");
      return;
    }

    const loadingToast = toast.loading("Withdrawal in progress...");

    const gasAmount = await NFTContract.methods
      .withdraw()
      .estimateGas({
        from: account[0],
      })
      .catch((error) => {
        console.log(error);
        error.message =
          "There was an error while withdrawing. Please try again.";
        toast.dismiss(loadingToast);
        toast.error(error.message);
        return;
      });

    const gasPrice = await web3api.eth.getGasPrice();

    await NFTContract.methods
      .withdraw()
      .send({
        from: account[0],
        gas: gasAmount,
        gasPrice: gasPrice,
      })
      .then((receipt) => {
        toast.dismiss(loadingToast);
        toast.success("Withdrawal successful!");
        setContractBalance(0);
      })
      .catch((error) => {
        console.log(error);
        error.message =
          "There was an error while withdrawing. Please try again.";
        toast.dismiss(loadingToast);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="container grid grid-cols-1 gap-6 mt-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <GridItem title="Total Air NFTs Minted" content={totalMinted[0]} />
          <GridItem title="Total Water NFTs Minted" content={totalMinted[1]} />
          <GridItem title="Total Earth NFTs Minted" content={totalMinted[2]} />
          <GridItem title="Total Fire NFTs Minted" content={totalMinted[3]} />
          <GridItem
            title="Total Air NFTs Eligible"
            content={totalEligible[0]}
          />
          <GridItem
            title="Total Water NFTs Eligible"
            content={totalEligible[1]}
          />
          <GridItem
            title="Total Earth NFTs Eligible"
            content={totalEligible[2]}
          />
          <GridItem
            title="Total Fire NFTs Eligible"
            content={totalEligible[3]}
          />
          <GridItem
            title="Payout Activated"
            content={payoutActive ? "Yes" : "No"}
          />
          <GridItem
            title="Bonus Amount per NFT"
            content={`${bonusAmountPerNFT} USD`}
          />
          <GridItem
            title="Total Bonus Paid Out"
            content={`${totalBonusClaimed} USD`}
          />
          <GridItem title="Next Payout Date" content={bonusPayoutDate} />
          <GridItem
            title="Estimated Next Payout Amount"
            content={`${bonusPayoutAmount} USD`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 m-auto mt-10 place-items-center w-60">
        <label className="text-white">Set Payout Amount per NFT (USD)</label>
        <input
          className="text-black border-2 rounded-md border-slate-400"
          type="number"
          value={payoutInput}
          onChange={(e) => setPayoutInput(e.target.value)}
        />

        <button
          className="px-4 py-2 mt-2 text-white bg-black border rounded-md border-slate-400"
          onClick={handlePayout}
        >
          Set
        </button>
      </div>
      <button
        className="px-4 py-2 mt-6 text-white bg-black border rounded-md border-slate-400"
        onClick={handleWithdraw}
      >
        {`Withdraw ${contractBalance} ETH`}
      </button>
    </div>
  );
}

const GridItem = ({ title, content }) => {
  return (
    <div className="">
      <p className="py-2 border-2 rounded-t-lg border-slate-400">{title}</p>
      <p className="py-4 border-2 border-t-0 rounded-b-lg border-slate-400">
        {content}
      </p>
    </div>
  );
};

export default Admin;
