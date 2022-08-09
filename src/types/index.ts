export enum Move {
  DOWN = 'DOWN',
  MOVE = 'MOVE',
  UP = 'UP',
}

export type SourceRaw = {
  character_grid: string[][];
  source_language: string;
  target_language: string;
  word: string;
  word_locations: any;
}

export type SourceParsed = {
  grid: string[][];
  map: number[][][];
  origin: string;
}