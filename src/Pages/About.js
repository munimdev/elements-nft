import React from "react";

const aboutTextHeading =
  "Welcome to Elements NFT! Follow these simple steps to mint your own unique NFT:";

const aboutText = `

1. Login to our website and connect your MetaMask wallet.

2. Click on the "Collection" tab in the navigation menu.

3. On the NFT minting page, browse through the available elemental NFTs using the arrow buttons. Select the one you would like to mint by ensuring its image is fully displayed.

4. Once you've picked your favorite element, click the "Mint" button to start the minting process.

5. After a few moments, you'll receive a confirmation message indicating your new NFT was minted along with its unique token ID number.

6. Your newly minted NFT will now be visible in your connected wallet.

7. You can also view details about your NFT in the "Account" section, including the number of NFTs you own, bonus eligibility, and estimated bonus rewards.

Congratulations! You now own your very own unique Elements-NFT. Thank you for choosing us. Please let us know if you have any other questions!

`;

const importantTextHeading = `IMPORTANT INFORMATION ABOUT BONUS REWARDS:`;

const importantText = `

1. To be eligible for rewards, you must hold your NFT for at least 20 days.

2. Once the bonus rewards system is activated, it will repeat every 90 days.

3. If you are eligible for rewards, you can claim it by clicking the "Claim Bonus" button in the "Account" section.

4. If you are eligible for rewards, you must claim it before the next payout date. Otherwise, you will lose your rewards.

5. Expanding on the previous point, you are eligible for only one payout. If you fail to claim your reward within the 90-day period, you will lose your rewards but will be eligible for the next payout.`;

const About = () => {
  return (
    <>
      <p
        className="flex justify-center mx-auto mt-10 underline"
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "18px",
          lineHeight: "1.8em",
          letterSpacing: "normal",
          maxWidth: "60%",
        }}
      >
        {aboutTextHeading}
      </p>
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
        {aboutText}
      </p>
      <p
        className="flex justify-center mx-auto mt-10 underline"
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "18px",
          lineHeight: "1.8em",
          letterSpacing: "normal",
          maxWidth: "60%",
        }}
      >
        {importantTextHeading}
      </p>
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
    </>
  );
};

export default About;
