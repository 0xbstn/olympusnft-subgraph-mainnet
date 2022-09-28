import {
  Forge as ForgeEvent,
  Redeem as RedeemEvent,
} from "../generated/furnace/furnace";

import { PendingStones } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

import { getOrCreateUser } from "./utils";

export function handleForge(event: ForgeEvent): void {
  const user = getOrCreateUser(event.params.user);
  var pendingStones = new PendingStones(
    user.id + "-" + (user.pendingStonesCount + 1).toString()
  ) as PendingStones;
  pendingStones.id = user.id + "-" +(user.pendingStonesCount + 1).toString();
  pendingStones.owner = user.id;
  pendingStones.amount = event.params.count;
  pendingStones.end = event.params.end;
  pendingStones.alreadyClaim = false;
  user.pendingStonesCount = user.pendingStonesCount + 1;
  pendingStones.save();
  user.save()
}

export function handleRedeem(event: RedeemEvent): void {
  const user = getOrCreateUser(event.params.user);
  for (var i = 1; i < user.pendingStonesCount + 1; i++) {
    let pendingStones = PendingStones.load(user.id + "-" + i.toString()) as PendingStones;
    if (
      (pendingStones.end <= event.block.timestamp) &&
      (pendingStones.alreadyClaim == false)
    ) {
      pendingStones.alreadyClaim = true;
      pendingStones.save();
    }
  }
  user.save();
}
