import { useState } from "react";
import { useTransactionReceipt } from "wagmi";
export function useWaitForTransaction() {
  const [hash, setHash] = useState<string | undefined>(undefined);
  const { isLoading, refetch } = useTransactionReceipt({
    hash: hash as `0x${string}`,
    query: {
      enabled: !!hash,
    },
  });

  const waitForTransaction = (transactionHash?: string) => {
    if (!transactionHash) return Promise.reject("No hash provided");

    setHash(transactionHash);

    return new Promise((resolve) => {
      async function checkReceipt() {
        const result = await refetch();
        if (result.data && !isLoading) {
          setHash(undefined);
          resolve(result.data);
        } else {
          setTimeout(checkReceipt, 1000);
        }
      }

      checkReceipt();
    });
  };

  return { waitForTransaction };
}
