import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkSide from '../hook/dark'

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  )

  const toggleDarkMode = checked => {
    setTheme(colorTheme)
    setDarkSide(checked)
  }

  return (
    <>
      <div className='bg-[transparent]'>
        <DarkModeSwitch
          size={40}
          sunColor='#006'
          moonColor='#ffff'
          checked={darkSide}
          onChange={toggleDarkMode}
        />
      </div>
    </>
  )
}
