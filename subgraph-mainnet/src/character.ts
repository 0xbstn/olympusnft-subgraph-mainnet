import {
  characterApproval as characterApprovalEvent,
  characterApprovalForAll as characterApprovalForAllEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  Evolve as EvolveEvent,
  Minted as MintedEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  SetNickname as SetNicknameEvent,
  characterTransfer as characterTransferEvent,
} from "../generated/character/character";

import { Character } from "../generated/schema";
import { getOrCreateUser, getRarity, getName } from "./utils";


export function handlecharacterApproval(event: characterApprovalEvent): void {}

export function handlecharacterApprovalForAll(
  event: characterApprovalForAllEvent
): void {}

export function handleAuthorityUpdated(event: AuthorityUpdatedEvent): void {}

export function handleEvolve(event: EvolveEvent): void {
  const user = getOrCreateUser( event.params._event.transaction.from)
  const character = Character.load(event.params.id.toString()) as Character;
  character.level = event.params.newLevel.toI32();
  user.stonesBalance = user.stonesBalance - event.params.newLevel.toI32();
  user.save();
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

export function handlecharacterTransfer(event: characterTransferEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  const user = getOrCreateUser(event.params.to);

  character.owner = user.id;
  character.save();
}
