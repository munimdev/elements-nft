import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Admin() {
  return (
    <div className="container grid grid-cols=1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20">
      <GridItem title="Total Fire NFTs Minted" content="0" />
      <GridItem title="Total Water NFTs Minted" content="0" />
      <GridItem title="Total Earth NFTs Minted" content="0" />
      <GridItem title="Total Air NFTs Minted" content="0" />
      <GridItem title="Total Fire NFTs Eligible" content="0" />
      <GridItem title="Total Water NFTs Eligible" content="0" />
      <GridItem title="Total Earth NFTs Eligible" content="0" />
      <GridItem title="Total Air NFTs Eligible" content="0" />
      <GridItem title="Payout Activated" content="No" />
      <GridItem title="Bonus Amount per NFT" content="0" />
      <GridItem title="Total Bonus Paid Out" content="0" />
      <GridItem title="Next Payout Date" content="-" />
      <GridItem title="Estimated Next Payout Amount" content="-" />
    </div>
  );
}

const GridItem = ({ title, content }) => {
  return (
    <div classname="flex flex-col items-center justify-centers el p-4">
      <p className="border-2 border-slate-400 rounded-t-lg py-2">{title}</p>
      <p className="border-2 border-t-0 border-slate-400 rounded-b-lg py-4">
        {content}
      </p>
    </div>
  );
};

export default Admin;
