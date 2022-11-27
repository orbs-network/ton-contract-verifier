import { useLoadContractInfo } from "../lib/useLoadContractInfo";
import hljs from "highlight.js/lib/core";
// @ts-ignore
import hljsDefine from "highlightjs-func";
import { useEffect, useRef } from "react";
import "highlight.js/styles/atom-one-light.css";
hljsDefine(hljs);

export function DisassembledSourceCode() {
  const { data: contractInfo } = useLoadContractInfo();

  const ref = useRef<any>(null);

  useEffect(() => {
    hljs.highlightElement(ref.current);
  }, [contractInfo?.decompiled, ref.current]);

  return (
    <pre style={{ overflow: "auto", maxHeight: 500 }}>
      <code ref={ref} className="language-fift">
        {contractInfo?.decompiled}
      </code>
    </pre>
  );
}