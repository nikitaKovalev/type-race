export enum LetterClass {
  Positive = '-positive',
  Negative = '-negative',
  Neutral = '-neutral',
}

const LETTER_CLASS_MAP = new Map([
  [true, LetterClass.Positive],
  [false, LetterClass.Negative],
  [null, LetterClass.Neutral],
]);

export const splitText = (text: string) => text.trim().split(/(\s+)/);
export const splitWords = (words: string[]) => words.flatMap(word => word.split(''));
export const letterClass = (keyPressed: string, currentLetter: string) => {
  if (!keyPressed) {
    return LetterClass.Neutral;
  }

  return LETTER_CLASS_MAP.get(keyPressed === currentLetter) ?? LetterClass.Neutral;
};
