import { useState } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { useWaitForTransaction } from "./useWaitForTransaction";
import { Erc20Abi } from "../config/abi/erc20";
import { STAKE_CONTRACT } from "../config";

export function useApprove(tokenContract: string) {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  // 检查授权额度
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenContract as `0x${string}`,
    abi: Erc20Abi,
    functionName: "allowance",
    args: [address as `0x${string}`, STAKE_CONTRACT],
    query: {
      enabled: !!address,
    },
  });

  // 授权函数
  const handleApprove = async (amount: string) => {
    try {
      setLoading(true);
      const parsedAmount = parseEther(amount);

      const hash = await writeContractAsync({
        address: tokenContract as `0x${string}`,
        abi: Erc20Abi,
        functionName: "approve",
        args: [STAKE_CONTRACT, parsedAmount],
      });

      await waitForTransaction(hash);
      await refetchAllowance();
      return true;
    } catch (error) {
      console.error("Approval failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 检查是否需要授权
  const checkNeedsApproval = (amount: string): boolean => {
    if (!allowance || !amount) return true;
    try {
      const parsedAmount = parseEther(amount);
      return (allowance as bigint) < parsedAmount;
    } catch (error) {
      console.error("Error checking approval:", error);
      return true;
    }
  };

  return {
    handleApprove,
    checkNeedsApproval,
    allowance,
    loading,
  };
}
