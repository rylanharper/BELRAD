// Transforms text into standard kebab case
export const kebabCase = (string) => {
  return string
    .split('')
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }

      return letter
    })
    .join('')
    .trim()
    .replace(/[_\s-]+/g, '-')
}

// Transforms text into standard pascal case
export const pascalCase = (string) => {
  return transform(string)
    .split('-')
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join('')
}
