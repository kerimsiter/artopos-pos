"use client";

import * as React from "react";
import { Check, ChevronDown, Search, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  countriesData, 
  formatPhoneNumber, 
  validatePhoneNumber, 
  getCountryByCode,
  type Country 
} from "@/lib/countries-data";

interface PhoneInputAdvancedProps {
  value?: string;
  onChange?: (value: string, isValid: boolean, country: Country) => void;
  defaultCountry?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showValidation?: boolean;
  autoFormat?: boolean;
}

export function PhoneInputAdvanced({
  value = "",
  onChange,
  defaultCountry = "TR",
  placeholder = "Telefon numaranızı girin",
  required = false,
  disabled = false,
  error = false,
  className,
  showValidation = true,
  autoFormat = true,
}: PhoneInputAdvancedProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(value);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    getCountryByCode(defaultCountry) || countriesData[0]
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  const filteredCountries = React.useMemo(() => {
    if (!search) return countriesData;
    
    const searchLower = search.toLowerCase();
    return countriesData.filter(
      (country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.dialCode.includes(search) ||
        country.code.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const isValid = React.useMemo(() => {
    if (!phoneNumber) return false;
    return validatePhoneNumber(phoneNumber, selectedCountry);
  }, [phoneNumber, selectedCountry]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Sadece rakam girişine izin ver
    const cleanValue = inputValue.replace(/\D/g, '');
    
    // Maksimum uzunluğu kontrol et
    if (cleanValue.length > (selectedCountry.maxLength || 10)) {
      return;
    }
    
    // Otomatik formatlama
    const formattedValue = autoFormat && selectedCountry.format
      ? formatPhoneNumber(cleanValue, selectedCountry.format)
      : cleanValue;
    
    setPhoneNumber(formattedValue);
    setIsTouched(true);
    
    // onChange callback
    if (onChange) {
      const isValidNumber = validatePhoneNumber(cleanValue, selectedCountry);
      onChange(formattedValue, isValidNumber, selectedCountry);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
    setSearch("");
    
    // Ülke değiştiğinde telefon numarasını temizle
    setPhoneNumber("");
    
    if (onChange) {
      onChange("", false, country);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleanValue = pastedText.replace(/\D/g, '');
    
    if (cleanValue.length <= (selectedCountry.maxLength || 10)) {
      const formattedValue = autoFormat && selectedCountry.format
        ? formatPhoneNumber(cleanValue, selectedCountry.format)
        : cleanValue;
      
      setPhoneNumber(formattedValue);
      setIsTouched(true);
      
      if (onChange) {
        const isValidNumber = validatePhoneNumber(cleanValue, selectedCountry);
        onChange(formattedValue, isValidNumber, selectedCountry);
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "flex w-full items-stretch h-14 rounded-xl border bg-white dark:bg-neutral-900 transition-all duration-200",
          isFocused && !error && "border-primary ring-2 ring-primary/20",
          error && "border-destructive ring-2 ring-destructive/20",
          !isFocused && !error && "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
          disabled && "opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-800"
        )}
      >
        {/* Ülke Seçici */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "h-full px-3 rounded-l-xl rounded-r-none border-r justify-start gap-2",
                "hover:bg-neutral-50 dark:hover:bg-neutral-800",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                disabled && "cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                  {selectedCountry.code}
                </span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {selectedCountry.dialCode}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="min-w-[400px] max-w-[500px] p-0" align="start">
            <Command>
              <div className="flex items-center border-b px-3 pb-2 pt-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Input
                  placeholder="Ülke ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 border-0 p-0 placeholder:text-neutral-500 focus-visible:ring-0"
                />
              </div>
              
              <CommandList className="max-h-[300px]">
                {filteredCountries.length === 0 ? (
                  <CommandEmpty className="py-6 text-center text-sm text-neutral-500">
                    Ülke bulunamadı.
                  </CommandEmpty>
                ) : (
                  <CommandGroup>
                    {filteredCountries.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={() => handleCountrySelect(country)}
                        className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md mx-1"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 w-8">
                            {country.code}
                          </span>
                          <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium whitespace-nowrap">{country.name}</span>
                            <span className="text-xs text-neutral-500">
                              {country.dialCode}
                            </span>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4 text-primary flex-shrink-0 ml-2",
                            selectedCountry.code === country.code
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Telefon Numarası Girişi */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Phone className="h-4 w-4 text-neutral-400" />
          </div>
          
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={selectedCountry.format?.replace(/X/g, '•') || placeholder}
            required={required}
            disabled={disabled}
            className={cn(
              "h-full w-full bg-transparent pl-10 pr-10 text-base",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
              "focus:outline-none disabled:cursor-not-allowed",
              "rounded-r-xl"
            )}
          />
          
          {/* Validation İkonu */}
          {showValidation && isTouched && phoneNumber && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {isValid ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 animate-in fade-in zoom-in duration-200" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 animate-in fade-in zoom-in duration-200" />
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Validation Mesajı */}
      {showValidation && isTouched && phoneNumber && !isValid && (
        <div className="flex items-center justify-end px-1">
          <p className="text-xs text-amber-600 dark:text-amber-500 animate-in fade-in slide-in-from-right-1 duration-200">
            Lütfen geçerli bir telefon numarası girin
          </p>
        </div>
      )}
    </div>
  );
}
