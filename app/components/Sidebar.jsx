'use client'

import { useState } from "react"
import Link from "next/link"

const navItems = [
    {href: '/', label: 'Home'},
    {href: '/now-playing', label: 'Now Playing'},
    {href: '/popular', label: 'Popular'},
    {href: '/top-rated', label: 'Top Rated'},
    {href: '/upcoming', label: 'Upcoming'},
]

export default function Sidebar(){
    const [isOpen, setIsOpen] = useState(false);

    function closeSidebar(){
        setIsOpen(false)
    }

    return (
        <>
            <button 
            className="fixed top-0 left-0 z-40 text-white text-xl m-2"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'X' : '☰'}
            </button>
            {isOpen && (
            <div className="fixed top-0 left-0 h-full z-30 w-54 bg-gray-800 p-5 transition-all duration-300">
                <nav className="mt-8 flex flex-col">
                {
                    navItems.map((item) => (
                    <Link 
                        key={item.href} 
                        onClick={closeSidebar} 
                        href={item.href} 
                        className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">
                        {item.label}
                    </Link>
                    ))
                }
                </nav>
            </div>
        )}
      </>
    )
}
