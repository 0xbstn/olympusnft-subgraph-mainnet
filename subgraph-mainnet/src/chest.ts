import { getOrCreateUser, ZERO_ADDRESS, getChest } from "./utils";
import {
  ApprovalForAll as ApprovalForAllEvent,
  ChestOpened as ChestOpenedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from "../generated/chest/chest";


export function handleTransferSingle(event: TransferSingleEvent): void {
  if (event.params.from.toHex() != ZERO_ADDRESS) {
    const from = getOrCreateUser(event.params.from);
    const chest = getChest(from.id + "-" + event.params.id.toString());
    chest.amount = chest.amount - event.params.amount.toI32();
    chest.save();
  }

  if (event.params.to.toHex() != ZERO_ADDRESS) {
    const to = getOrCreateUser(event.params.to);
    const chest = getChest(to.id + "-" + event.params.id.toString());
    chest.amount = chest.amount + event.params.amount.toI32();
    chest.save();
  }
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {}

export function handleChestOpened(event: ChestOpenedEvent): void {}

export function handleTransferBatch(event: TransferBatchEvent): void {
  if (event.params.from.toHex() != ZERO_ADDRESS) {
    const from = getOrCreateUser(event.params.from);
    for (let i = 0; i < event.params.ids.length; i++) {
      let chest = getChest(from.id + "-" + event.params.ids[i].toString());
      chest.amount= chest.amount - event.params.amounts[i].toI32();
      chest.save();
    }
  }

  if (event.params.to.toHex() != ZERO_ADDRESS) {
    const to = getOrCreateUser(event.params.to);
    for (let i = 0; i < event.params.ids.length; i++) {
      let chest = getChest(to.id + "-" + event.params.ids[i].toString());
      chest.amount = chest.amount + event.params.amounts[i].toI32();
      chest.save();
    }
  }
}

export function handleURI(event: URIEvent): void {}
