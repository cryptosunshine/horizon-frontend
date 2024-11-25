import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import Info from "../../components/Info";
import { useWaitForTransaction } from "../../hooks/useWaitForTransaction";
import { StakeAbi } from "../../config/abi/stake";
import { STAKE_CONTRACT } from "../../config";

const Withdraw: React.FC = () => {
  const { address } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const { waitForTransaction: waitForWithdraw } = useWaitForTransaction();

  const handleWithdraw = async () => {
    try {
      setIsPending(true);

      const withdrawHash = await writeContractAsync({
        abi: StakeAbi,
        functionName: "withdraw",
        args: [],
        address: STAKE_CONTRACT,
      });

      await waitForWithdraw(withdrawHash);
      // 可以添加成功提示
    } catch (error: any) {
      console.error(error?.message);
      // 可以添加错误提示
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Withdraw</h2>
      <Info />
      <button
        onClick={handleWithdraw}
        disabled={!address || isPending}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isPending ? "Withdrawing..." : "Withdraw"}
      </button>
    </div>
  );
};

export default Withdraw;
