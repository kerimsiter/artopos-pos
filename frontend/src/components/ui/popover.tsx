"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type PopoverContextType = {
  open: boolean
  setOpen: (v: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  triggerWidth: number
}

const PopoverContext = React.createContext<PopoverContextType | null>(null)

function usePopoverCtx() {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) throw new Error("Popover components must be used within <Popover>")
  return ctx
}

function Popover({ open: openProp, onOpenChange, children }: { open?: boolean; onOpenChange?: (v: boolean) => void; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(!!openProp)
  const triggerRef = React.useRef<HTMLElement>(null)
  const [triggerWidth, setTriggerWidth] = React.useState(0)

  React.useEffect(() => {
    if (typeof openProp === "boolean") setOpen(openProp)
  }, [openProp])

  const setOpenMerged = React.useCallback((v: boolean) => {
    if (onOpenChange) onOpenChange(v)
    if (typeof openProp !== "boolean") setOpen(v)
  }, [onOpenChange, openProp])

  React.useEffect(() => {
    if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth)
  }, [open])

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMerged(false)
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, setOpenMerged])

  return (
    <PopoverContext.Provider value={{ open, setOpen: setOpenMerged, triggerRef, triggerWidth }}>
      <div className="relative inline-block" style={{ ['--radix-popover-trigger-width' as any]: `${triggerWidth}px` }}>
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const { open, setOpen, triggerRef } = usePopoverCtx()
  const child = React.Children.only(children)
  return React.cloneElement(child, {
    ref: (node: HTMLElement) => {
      // @ts-ignore
      if (typeof child.ref === 'function') child.ref(node)
      // @ts-ignore
      else if (child.ref) (child.ref as any).current = node
      // assign our ref
      ;(triggerRef as any).current = node
    },
    onClick: (e: React.MouseEvent) => {
      child.props.onClick?.(e)
      setOpen(!open)
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
  })
}

function PopoverContent({ className, align = "start", side = "bottom", children }: { className?: string; align?: 'start' | 'end' | 'center'; side?: 'top' | 'bottom'; children: React.ReactNode }) {
  const { open, setOpen, triggerRef, triggerWidth } = usePopoverCtx()
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node
      if (!contentRef.current || !open) return
      if (contentRef.current.contains(t)) return
      if (triggerRef.current && triggerRef.current.contains(t as Node)) return
      setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [open, setOpen, triggerRef])

  if (!open) return null

  const alignClass = align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
  const sideClass = side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 rounded-xl border border-neutral-200 bg-white shadow-md",
        sideClass,
        alignClass,
        className
      )}
      style={{ width: triggerWidth ? `${triggerWidth}px` : undefined }}
      role="dialog"
    >
      {children}
    </div>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
