import { useState } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { useWaitForTransaction } from "../../hooks/useWaitForTransaction";
import { StakeAbi } from "../../config/abi/stake";
import { Erc20Abi } from "../../config/abi/erc20";
import { STAKE_CONTRACT, TOKEN_CONTRACT } from "../../config";
import Info from "../../components/Info";
import { useApprove } from "../../hooks/useApprove";

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [lockPeriod, setLockPeriod] = useState("201600");
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const {
    handleApprove,
    checkNeedsApproval,
    loading: approveLoading,
  } = useApprove(TOKEN_CONTRACT);

  const [loading, setLoading] = useState(false);

  const { waitForTransaction: waitForStake } = useWaitForTransaction();

  const { data: balance } = useReadContract({
    address: TOKEN_CONTRACT,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [address],
  });

  const needsApproval = checkNeedsApproval(amount);

  const handleApproveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setLoading(true);

    try {
      await handleApprove(amount);
    } catch (error) {
      console.error("Error staking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setLoading(true);

    try {
      const stakeHash = await writeContractAsync({
        abi: StakeAbi,
        functionName: "stake",
        args: [parseEther(amount), lockPeriod],
        address: STAKE_CONTRACT,
      });
      await waitForStake(stakeHash);

      setAmount("");
    } catch (error) {
      console.error("Error staking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Stake Tokens</h2>
      <Info />

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 flex justify-between">
            <div>Amount</div>
            <div>
              Balance: {balance ? formatEther(balance as bigint) : "0"} WBTC
            </div>
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Lock Period (blocks)
          </label>
          <select
            value={lockPeriod}
            onChange={(e) => setLockPeriod(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="201600">Minimum (201,600 blocks)</option>
            <option value="604800">1 Week (604,800 blocks)</option>
            <option value="2419200">1 Month (2,419,200 blocks)</option>
            <option value="42048000">Maximum (42,048,000 blocks)</option>
          </select>
        </div>

        {amount && needsApproval ? (
          <button
            type="button"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
            onClick={handleApproveClick}
            disabled={approveLoading || !amount}
          >
            {approveLoading ? "Approving..." : "Approve"}
          </button>
        ) : (
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              loading || needsApproval || !amount
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={loading || needsApproval || !amount}
            onClick={handleStake}
          >
            {loading ? "Staking..." : "Stake"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Deposit;
