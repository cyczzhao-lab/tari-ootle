//   Copyright 2026 The Tari Project
//   SPDX-License-Identifier: BSD-3-Clause

import { describe, expect, it } from "vitest";
import { isSubstateIdString, shortenString, shortenSubstateId } from "./helpers";

describe("walletd web_ui substate helpers", () => {
  it("preserves the trailing identifier of multi-segment substate ids", () => {
    const utxoId =
      "utxo_0000000000000000000000000000000000000000000000000000000000000000_abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123459876";
    const coutputId =
      "coutput_7cbfe29101c24924b1b6ccefbfff98986d648622272ae24f7585dab5eeeeeeee_11223344556677889900aabbccddeeff11223344556677889900aabbccddff00";
    const nftId = "nft_0101010101010101010101010101010101010101010101010101010101010101_str_token_42";

    expect(shortenSubstateId(utxoId)).toBe("utxo_0000...9876");
    expect(shortenSubstateId(coutputId)).toBe("coutput_7cbf...ff00");
    expect(shortenSubstateId(nftId)).toBe("nft_0101...n_42");
  });

  it("handles null, undefined, and strings without an underscore", () => {
    expect(shortenSubstateId(null)).toBe("");
    expect(shortenSubstateId(undefined)).toBe("");
    expect(shortenSubstateId("no-underscore-here")).toBe("no-underscore-here");
    expect(shortenString(null)).toBe("");
    expect(shortenString("short")).toBe("short");
  });

  it("recognises all substate address prefixes in isSubstateIdString", () => {
    for (const prefix of [
      "component_",
      "vault_",
      "resource_",
      "nft_",
      "tombstone_",
      "txreceipt_",
      "template_",
      "vnfp_",
      "utxo_",
      "coutput_",
    ]) {
      expect(isSubstateIdString(`${prefix}0000`)).toBe(true);
    }
    expect(isSubstateIdString("account_plain_text")).toBe(false);
    expect(isSubstateIdString(null)).toBe(false);
  });
});
