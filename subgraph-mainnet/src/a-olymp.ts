import {
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/aOlymp/aOlymp"
import { getOrCreateUser, ZERO_ADDRESS } from "./utils";

export function handleTransfer(event: Transfer): void {
  if (event.params.from.toHex() != ZERO_ADDRESS) {
    let from = getOrCreateUser(event.params.from);
    from.aOlympBalance = from.aOlympBalance.minus(event.params.value);
    from.save();
  }

  if (event.params.to.toHex() != ZERO_ADDRESS) {
    let to = getOrCreateUser(event.params.to);
    to.aOlympBalance = to.aOlympBalance.plus(event.params.value);
    to.save();
  }
}

export function handleApproval(event: Approval): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
