import { Address, fromNano, Cell } from "ton";
import { useQuery } from "@tanstack/react-query";

import { fromCode } from "tvm-disassembler";
import { getClient } from "./getClient";
import { useContractAddress } from "./useContractAddress";

export function useLoadContractInfo() {
  const { contractAddress } = useContractAddress();

  const { isLoading, error, data } = useQuery([contractAddress, "info"], async () => {
    if (!contractAddress) return null;
    const client = await getClient();

    const _address = Address.parse(contractAddress);
    let { code } = await client.getContractState(_address);
    let codeCell = Cell.fromBoc(code!)[0];

    const b = await client.getBalance(_address);

    let decompiled;
    try {
      decompiled = fromCode(codeCell);
    } catch (e) {
      decompiled = e?.toString();
    }

    return {
      hash: codeCell.hash().toString("base64"),
      decompiled,
      balance: fromNano(b),
    };
  });

  return { isLoading, error, data };
}
