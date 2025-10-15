"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  countryCode: string;
  onCountryChange: (value: string) => void;
  countryOptions: { label: string; value: string }[];
  phoneProps?: React.ComponentProps<"input">;
  className?: string;
};

export function PhoneInput({
  countryCode,
  onCountryChange,
  countryOptions,
  phoneProps,
  className,
}: PhoneInputProps) {
  return (
    <div
      className={cn(
        "flex w-full items-stretch h-14 rounded-xl border border-neutral-200 bg-white transition-all",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:ring-destructive/40 aria-[invalid=true]:border-destructive",
        className
      )}
    >
      <div className="w-24 shrink-0 border-r border-neutral-200">
        <Combobox
          options={countryOptions}
          value={countryCode}
          onChange={onCountryChange}
          placeholder="Ülke"
          className="h-14 rounded-r-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Input
          {...phoneProps}
          className={cn(
            "h-14 rounded-l-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            phoneProps?.className
          )}
        />
      </div>
    </div>
  );
}
