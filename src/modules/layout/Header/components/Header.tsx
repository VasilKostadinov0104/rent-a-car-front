import React from 'react'
import { HeaderConstants } from '../constants'
import Tab from './Tab'

const Header = () => {
  return (
    <nav className="flex smp:!flex-row flex-col items-start px-[20px] bg-[#F6F6F9] h-[45px]  w-full relative">
      <header className="flex flex-col">
        <h1 className="text-[30px] font-bold whitespace-nowrap mr-[50px] text-[#4945FF]">
          ULTIMATE CAR RENTAL
        </h1>
      </header>
      <div className="flex w-full h-full justify-between smp:!pr-[100px]">
        {HeaderConstants.links.map((button, key) => (
          <Tab
            slug={button.link}
            index={button.index}
            mapIndex={key}
            name={button.name}
            key={key}
          />
        ))}
      </div>
    </nav>
  )
}

export default Header
