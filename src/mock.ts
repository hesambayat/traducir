export const data = [
  {"source_language": "en", "word": "it", "character_grid": [["i", "a", "c"], ["e", "s", "o"], ["v", "x", "z"]], "word_locations": {"0,1,1,1,2,1": "eso"}, "target_language": "es"},
  {"source_language": "en", "word": "yes", "character_grid": [["i", "a", "c"], ["e", "s", "o"], ["v", "\u00ed", "z"]], "word_locations": {"1,1,1,2": "si"}, "target_language": "es"},
]

export const parsed = [
  {"origin": "it", "grid": [["i", "a", "c"], ["e", "s", "o"], ["v", "x", "z"]], "map": [[[0,1],[1,1],[2,1]]]},
  {"origin": "yes", "grid": [["i", "a", "c"], ["e", "s", "o"], ["v", "\u00ed", "z"]], "map": [[[1,1],[1,2]]]},
]
