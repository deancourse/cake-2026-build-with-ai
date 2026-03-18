export const delay = () =>
  new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200))
