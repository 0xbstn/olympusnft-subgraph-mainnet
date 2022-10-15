import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  Evolve as EvolveEvent,
  Minted as MintedEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  SetNickname as SetNicknameEvent,
  Transfer as TransferEvent
} from "../generated/character/character"


import { Character } from "../generated/schema";
import { getOrCreateUser, getRarity, getName, ZERO_ADDRESS } from "./utils";
import { log } from "@graphprotocol/graph-ts";


export function handlecharacterApproval(event: ApprovalEvent): void {}

export function handlecharacterApprovalForAll(
  event: ApprovalForAllEvent
): void {}

export function handleAuthorityUpdated(event: AuthorityUpdatedEvent): void {}

export function handleEvolve(event: EvolveEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  character.level = event.params.newLevel.toI32();
  character.save();
}

export function handleMinted(event: MintedEvent): void {
  const user = getOrCreateUser(event.params.owner);
  var character = new Character(event.params.id.toString()) as Character;

  const name = getName(event.params.character.toI32());
  const rarity = getRarity(event.params.rarity);

  character.id = event.params.id.toString();
  character.owner = user.id;
  character.name = name;
  character.rarity = rarity;
  character.level = 1;
  character.level_max = 6;
  character.trainingTime = 0;
  character.trainingEnd = 0;

  character.save();
}

export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {}


export function handleSetNickname(event: SetNicknameEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  character.nickname = event.params.name;
  character.save();
}

export function handleTransfer(event: TransferEvent): void {
  //log.warning("Send NFT : {}, from {} to {} ", [event.params.id.toString(),event.params.from.toHex(),event.params.to.toHex()]);

  if(event.params.from.toHex() != ZERO_ADDRESS){
    const character = Character.load(event.params.id.toString()) as Character;
    const user = getOrCreateUser(event.params.to);
    character.owner = user.id;
    character.save();
  }
}