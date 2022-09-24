import {
  Approval as ApprovalEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent
} from "../generated/busd/busd"

import { CHEST_CONTRACT, getOrCreateUser } from "./utils";

export function handleApproval(event: ApprovalEvent): void {
  let user = getOrCreateUser(event.params.owner);
  if (event.params.spender.toHex() == CHEST_CONTRACT) {
    user.amountApprovedChest = event.params.value;
    user.save();
  }
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handleTransfer(event: TransferEvent): void {}
