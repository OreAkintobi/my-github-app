export enum Theme {
  Blue = 'blue',
  Red = 'red',
  Green = 'green',
  Purple = 'purple',
}

export const themes = Object.keys(Theme).map(
  (key) => Theme[key as keyof typeof Theme]
) as Theme[];

export * from './context';
