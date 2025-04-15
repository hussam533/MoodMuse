"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-200",
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={closeMenu}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-white text-sm">✨</span>
            </div>
            <span className="hidden sm:inline-block">MoodMuse</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Toggle menu" onClick={toggleMenu} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2",
                    pathname === item.href ? "text-foreground bg-muted rounded-md" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Mood Boards",
    href: "/mood-boards",
  },
]
