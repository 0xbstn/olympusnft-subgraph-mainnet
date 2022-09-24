import {
  Approval as ApprovalEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  Transfer as TransferEvent,
} from "../generated/bOlymp/bOlymp";

import { getOrCreateUser, ZERO_ADDRESS } from "./utils";


export function handleTransfer(event: TransferEvent): void {
  if (event.params.from.toHex() != ZERO_ADDRESS) {
    let from = getOrCreateUser(event.params.from);
    from.bOlympBalance = from.bOlympBalance.minus(event.params.amount);
    from.save();
  }

  if (event.params.to.toHex() != ZERO_ADDRESS) {
    let to = getOrCreateUser(event.params.to);
    to.bOlympBalance = to.bOlympBalance.plus(event.params.amount);
    to.save();
  }
}


export function handleApproval(event: ApprovalEvent): void {}

export function handleAuthorityUpdated(event: AuthorityUpdatedEvent): void {}

export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {}
