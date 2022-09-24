import {
  Approval as ApprovalEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  Transfer as TransferEvent
} from "../generated/stones/stones"

import { getOrCreateUser, ZERO_ADDRESS, FURNACE_CONTRACT } from "./utils";

export function handleTransfer(event: TransferEvent): void {

  if (event.params.from.toHex() != ZERO_ADDRESS) {
    let from = getOrCreateUser(event.params.from);
    from.stonesBalance = from.stonesBalance - event.params.amount.toI32();
    from.save();
  }
  if (event.params.to.toHex() != ZERO_ADDRESS) {
    let to = getOrCreateUser(event.params.to);
    to.stonesBalance = to.stonesBalance + event.params.amount.toI32();
    to.save();
  }
}

export function handleApproval(event: ApprovalEvent): void {
  let user = getOrCreateUser(event.params.owner);
  if (event.params.spender.toHex() == FURNACE_CONTRACT) {
    user.amountApprovedFurnace = event.params.amount;
    user.save();
  }
}

export function handleAuthorityUpdated(event: AuthorityUpdatedEvent): void {}

export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {}

