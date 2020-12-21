import React from 'react'
import ReactDOM from 'react-dom'
import App from './global/App'

ReactDOM.render(<App/>, document.getElementById('root'))

/*
// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
// Add or remove the "dark" class based on if the media query matches
let toggleDarkTheme = (shouldAdd: any) => {
  document.body.classList.toggle('dark', shouldAdd)
}
// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches))

toggleDarkTheme(prefersDark.matches)
*/
