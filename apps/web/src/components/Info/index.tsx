import { useState, useEffect } from "react";
import { useReadContract, useAccount, useBlockNumber } from "wagmi";
import { formatEther } from "viem";
import { StakeAbi } from "../../config/abi/stake";
import { STAKE_CONTRACT } from "../../config";
interface StakeInfo {
  amount: bigint;
  endBlock: string;
  shares: string;
  remainingBlocks: string;
}

const calculateRemainingTime = (endBlock: string, currentBlock: number) => {
  const remaining = Number(endBlock) - currentBlock;
  if (remaining <= 0) return "Ended";

  const secondsRemaining = remaining * 12;
  const days = Math.floor(secondsRemaining / (24 * 60 * 60));
  const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));

  return `${days}d ${hours}h`;
};
const Info: React.FC = () => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [stakeInfo, setStakeInfo] = useState<StakeInfo | null>(null);
  const { data: stakeInfos } = useReadContract({
    address: STAKE_CONTRACT,
    abi: StakeAbi,
    functionName: "getStakeInfo",
    args: [address],
  });

  useEffect(() => {
    if (stakeInfos) {
      const stakeInfosArray = stakeInfos as [bigint, string, string, string];
      const data: StakeInfo = {
        amount: stakeInfosArray?.[0] ?? BigInt(0),
        endBlock: stakeInfosArray?.[1] ?? "",
        shares: stakeInfosArray?.[2] ?? "",
        remainingBlocks: stakeInfosArray?.[3] ?? "",
      };

      setStakeInfo(data);
    }
  }, [stakeInfos]);
  return (
    <>
      {stakeInfo && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <p>Current Stake: {formatEther(stakeInfo.amount as bigint)} WBTC</p>
          <p>
            End Block: {stakeInfo.endBlock.toString()} (Current:{" "}
            {blockNumber?.toString()})
          </p>
          <p>
            Remaining Time:{" "}
            {blockNumber
              ? calculateRemainingTime(stakeInfo.endBlock, Number(blockNumber))
              : "Loading..."}
          </p>
          <p>Shares: {stakeInfo.shares.toString()}</p>
          <p>Remaining Blocks: {stakeInfo.remainingBlocks.toString()}</p>
        </div>
      )}
    </>
  );
};

export default Info;
