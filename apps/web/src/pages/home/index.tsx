import React from "react";

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans text-gray-200 bg-[#242424]">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">White Paper</h1>
        <h2 className="text-3xl font-semibold text-gray-300">
          HORIZON: Empowering Lives with Fair and Transparent Rewards
        </h2>
      </header>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Introduction
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          HORIZON is a non-profit organization with a mission to empower individuals and improve their quality of life. By leveraging decentralized finance (DeFi) principles, we aim to create a platform that fairly redistributes contributions from various supporters, including project donors and the broader community.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Mission
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          HORIZON is committed to creating a system where users, through staking and active participation, can receive rewards and contributions from various platforms. Our model encourages fairness and long-term commitment while fostering a community-driven ecosystem of rewards.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          How It Works
        </h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Staking WBTC</h3>
          <p className="text-lg leading-relaxed text-gray-300">
            Users can stake WBTC tokens into our smart contract for a period between 1 and 30 years. For every day of staking, users earn an equity score of 1 WBTC * 1 day. This equity is crucial in determining the user's share of rewards and penalties within the system.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Withdrawal and Penalty</h3>
          <p className="text-lg leading-relaxed text-gray-300">
            To encourage long-term staking, users who wish to withdraw their staked WBTC before the lock-up period ends will be subject to a 10% penalty on their initial staked amount.
          </p>
        </div>
      </section>

      {/* Airdrops and Donations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Airdrops and Donations
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg text-gray-300">
          <li>
            <span className="font-semibold">Project Donations:</span> Any project or organization wishing to support the HORIZON ecosystem can contribute tokens to the reward pool.
          </li>
          <li>
            <span className="font-semibold">Airdrop Mechanism:</span> The platform is open to receiving tokens from various projects, which are then available for users to claim based on their staking equity.
          </li>
        </ul>
      </section>

      {/* Equity-Based Rewards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Equity-Based Rewards
        </h2>
        <div className="bg-gray-700 p-6 rounded-lg text-center my-6 font-mono text-gray-200">
          Equity = Staked WBTC × Days Staked
        </div>
        <p className="text-lg leading-relaxed text-gray-300">
          The more equity a user accumulates, the greater their share of the redistributed penalties and airdropped rewards.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Key Features
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg text-gray-300">
          <li>
            <span className="font-semibold">Non-Profit Organization:</span> HORIZON is a non-profit platform, meaning that all contributions and penalties are returned to the community.
          </li>
          <li>
            <span className="font-semibold">Fair Distribution:</span> The rewards and penalties are distributed based on user participation and equity, ensuring fairness and transparency.
          </li>
          <li>
            <span className="font-semibold">Long-Term Commitment:</span> By incentivizing users to stake for longer periods, we foster a culture of long-term financial planning.
          </li>
          <li>
            <span className="font-semibold">Flexible Participation:</span> Users have the flexibility to withdraw their stake at any time, with early withdrawal penalties benefiting remaining stakers.
          </li>
        </ul>
      </section>

      {/* Roadmap */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Roadmap
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Phase 1: Platform Launch</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Launch of staking contract on Ethereum network</li>
              <li>Implementation of the penalty and reward redistribution system</li>
              <li>Establishment of partnerships with early adopters and project donors</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Phase 2: Expansion and Airdrops</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Integration with various projects to facilitate token airdrops</li>
              <li>Launch of the rewards dashboard for users to track their equity and claim rewards</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Phase 3: Community Growth</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Expansion of the HORIZON platform to accept a wide variety of ERC-20 tokens as donations</li>
              <li>Strengthening partnerships with more projects for larger and more frequent airdrops</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Phase 4: Global Outreach</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Scaling the platform for broader participation globally</li>
              <li>Fostering a global community of supporters, stakers, and donors</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-600 text-gray-100">
          Conclusion
        </h2>
        <div className="text-lg leading-relaxed space-y-4 text-gray-300">
          <p>
            HORIZON aims to create a decentralized and equitable platform for all users, where financial rewards are distributed based on transparent and fair mechanisms. By offering a system where both penalties and project donations are redistributed, we ensure that every participant is rewarded for their long-term commitment and involvement in the ecosystem.
          </p>
          <p className="font-semibold">
            Together, we can build a future where financial empowerment and community support thrive hand in hand.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="text-center text-gray-400 mt-16 pb-8">
        <p className="italic">
          This white paper outlines the core principles and mechanisms of HORIZON. It focuses on fairness, long-term incentives, and the redistribution of rewards through community participation and external project contributions.
        </p>
      </footer>
    </div>
  );
};

export default Home;
