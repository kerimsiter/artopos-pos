"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Very lightweight Command primitives to satisfy UI needs without external deps
// Provides basic search filtering and item selection

type CommandContextType = {
  query: string
  setQuery: (v: string) => void
}

const CommandContext = React.createContext<CommandContextType | null>(null)

function Command({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("")
  return (
    <CommandContext.Provider value={{ query, setQuery }}>
      <div className={cn("flex flex-col gap-0 p-2", className)}>{children}</div>
    </CommandContext.Provider>
  )
}

function CommandInput({ className, placeholder }: React.InputHTMLAttributes<HTMLInputElement>) {
  const ctx = React.useContext(CommandContext)
  return (
    <input
      placeholder={placeholder}
      value={ctx?.query ?? ""}
      onChange={(e) => ctx?.setQuery(e.target.value)}
      className={cn(
        "w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-body-s outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
    />
  )
}

function CommandList({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-2 max-h-60 overflow-auto", className)}>{children}</div>
}

function CommandGroup({ className, children, heading }: React.HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div className={cn("py-1", className)}>
      {heading ? <div className="px-2 py-1 text-body-xs text-neutral-500">{heading}</div> : null}
      <div>{children}</div>
    </div>
  )
}

function CommandEmpty({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(CommandContext)
  // Render when there is a query but no visible items. We can't easily know matches, so show only when query not empty.
  if (!ctx?.query) return null
  return <div className={cn("px-3 py-6 text-center text-body-s text-neutral-500", className)}>{children}</div>
}

type CommandItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string
  onSelect?: (value: string) => void
}

function CommandItem({ className, children, value = "", onSelect, ...props }: CommandItemProps) {
  const ctx = React.useContext(CommandContext)
  const label = typeof children === "string" ? children : (Array.isArray(children) ? children.map((c: any) => (typeof c === 'string' ? c : '')).join(' ') : "")
  const text = (value || label).toLowerCase()
  const q = (ctx?.query ?? "").toLowerCase()
  const visible = !q || text.includes(q)
  if (!visible) return null
  return (
    <div
      role="option"
      tabIndex={0}
      onClick={() => onSelect?.(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(value)
        }
      }}
      className={cn(
        "flex cursor-pointer items-center px-2 py-2 text-body-s hover:bg-neutral-100 rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList }
