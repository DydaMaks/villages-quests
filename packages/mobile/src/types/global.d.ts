// Глобальні типи для модулів
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

// Глобальні типи для React
declare module 'react' {
  export = React;
  export as namespace React;
}

// Глобальні типи для Expo
declare module 'expo' {
  export = Expo;
  export as namespace Expo;
}