import {
  Approval as ApprovalEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  Transfer as TransferEvent,
} from "../generated/powder/powder";

import { FURNACE_CONTRACT, getOrCreateUser, ZERO_ADDRESS } from "./utils";

export function handleTransfer(event: TransferEvent): void {
  if (!event.params.from.toHex().includes(ZERO_ADDRESS)) {
    let from = getOrCreateUser(event.params.from);
    from.powderBalance = from.powderBalance.minus(event.params.amount);
    from.save();
  }

  if (!event.params.to.toHex().includes(ZERO_ADDRESS)) {
    let to = getOrCreateUser(event.params.to);
    to.powderBalance = to.powderBalance.plus(event.params.amount);
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

