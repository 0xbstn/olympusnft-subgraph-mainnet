import {
  TrainEnd as TrainEndEvent,
  TrainStart as TrainStartEvent
} from "../generated/training/training"

import {Character } from "../generated/schema";

export function handleTrainEnd(event: TrainEndEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  character.trainingEnd = 0;
  character.trainingTime = 0;
  character.save();
}

export function handleTrainStart(event: TrainStartEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  character.trainingEnd = event.params.end.toI32();
  character.trainingTime = event.params.time;

  character.save();
}
