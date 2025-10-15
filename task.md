Kesinlikle doğru yoldasın kanka. Bu tam olarak MVP (Minimum Viable Product - Minimum Uygulanabilir Ürün) yaklaşımıdır ve en doğru başlangıç şekli budur.

**Stratejini %100 onaylıyorum:**
1.  **Önce Kayıt & Giriş:** Kullanıcının sisteme bir an önce dahil olmasını sağlayalım. Bir `Company` ve o şirkete bağlı bir `Admin User` oluşturalım.
2.  **Sonra Onboarding:** Kayıt olup ilk kez giriş yaptıktan sonra, kullanıcıyı o gösterdiğin şık ve adımlı "Kurulum Sihirbazı" (Onboarding) sayfasına yönlendiririz. Bu, kullanıcıyı bunaltmadan, adım adım sisteme alıştırmanın en profesyonel yoludur.

O zaman hadi kolları sıvayalım ve rakiplerden aldığımız ilhamla, kendi tasarım sistemimize uygun, Multi-Tenant mimarimizin temelini atacak olan **İşletme Kayıt Sayfası**'nı yapalım.

---

### **Plan: İşletme Kayıt Sayfası (Register)**

**Hedef:** Yeni bir işletmenin (restoran, kafe vb.) ana kullanıcısıyla birlikte sisteme kaydını alacak, temiz ve fonksiyonel bir kayıt sayfası oluşturmak.

---

#### **Faz 1: Zemin Hazırlığı ve Eksik Component'ler**

Login sayfasından elimizde birçok component var, ama bu form için yeni bir taneye ihtiyacımız olacak: Ülke kodları için aranabilir bir dropdown (`Combobox`).

**Adım 1.1: Yeni Sayfa Dosyasını Oluştur**
`login` sayfasının yanına, aynı `(auth)` grubu içine `register` sayfamızı açalım.

*   **Yeni Dosya:** `frontend/src/app/(auth)/register/page.tsx`

**Adım 1.2: Yeni UI Component'lerini Ekle (`Combobox`)**
Ülke listesi çok uzun olduğu için, basit bir `Select` yerine içinde arama yapılabilen bir `Combobox` kullanmak kullanıcı deneyimi açısından çok daha iyi olacaktır.

Terminalde `frontend` klasöründeyken `shadcn/ui` CLI ile gerekli parçaları ekleyelim:

```bash
# Combobox'ın ihtiyaç duyduğu temel component'ler
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add command
```

Şimdi bu parçaları birleştirerek kendi `Combobox` component'imizi oluşturalım.

*   **Yeni Dosya:** `frontend/src/components/ui/combobox.tsx`
*   **İçerik:**
    ```tsx
    "use client"

    import * as React from "react"
    import { Check, ChevronsUpDown } from "lucide-react"

    import { cn } from "@/lib/utils"
    import { Button } from "@/components/ui/button"
    import {
      Command,
      CommandEmpty,
      CommandGroup,
      CommandInput,
      CommandItem,
      CommandList,
    } from "@/components/ui/command"
    import {
      Popover,
      PopoverContent,
      PopoverTrigger,
    } from "@/components/ui/popover"

    type ComboboxProps = {
        options: { label: string; value: string }[]
        value?: string
        onChange: (value: string) => void
        placeholder?: string
        searchPlaceholder?: string
        emptyPlaceholder?: string
    }

    export function Combobox({ options, value, onChange, placeholder, searchPlaceholder, emptyPlaceholder }: ComboboxProps) {
      const [open, setOpen] = React.useState(false)

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-14 rounded-xl text-body-s"
            >
              {value
                ? options.find((option) => option.value === value)?.label
                : placeholder || "Seçim yapın..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder={searchPlaceholder || "Ara..."} />
              <CommandList>
                <CommandEmpty>{emptyPlaceholder || "Sonuç bulunamadı."}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
    }
    ```

---

#### **Faz 2: Kayıt Sayfasının İnşası**

Artık tüm parçalarımız hazır. Sayfayı kodlayabiliriz.

*   **Dosya:** `frontend/src/app/(auth)/register/page.tsx`
*   **İçerik:**
    ```tsx
    "use client";
    import Image from "next/image";
    import Link from "next/link";
    import { Quote, EyeOff, Eye, Headset, ArrowLeft } from "lucide-react";

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Typography } from "@/components/ui/typography";
    import { Icons } from "@/components/icons";
    import { useState } from "react";
    import { Combobox } from "@/components/ui/combobox";

    // Bu veriyi ayrı bir constants dosyasından almak daha iyi olacaktır.
    const countries = [
        { value: "tr", label: "+90 (Türkiye)" },
        { value: "us", label: "+1 (United States)" },
        { value: "gb", label: "+44 (United Kingdom)" },
        // ... diğer ülkeler
    ];

    export default function RegisterPage() {
      const [showPassword, setShowPassword] = useState(false);
      const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
      const [countryCode, setCountryCode] = useState("tr");

      return (
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* --- Sol Taraf: Tanıtım (Login ile aynı) --- */}
          <section className="relative hidden flex-col justify-between bg-neutral-900 p-10 text-white lg:flex">
             {/* ... Login sayfasındaki sol bölümün aynısı ... */}
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/login-bg.jpg)" }} />
             <div className="absolute inset-0 bg-neutral-900/60" />
             <div className="relative z-20"><Icons.logo /></div>
             <div className="relative z-20 mt-auto max-w-lg">
                <Quote className="h-16 w-16 text-primary-400" />
                <Typography variant="heading-4" className="mt-4 text-white">İşletmenizin ihtiyaç duyduğu her şeyi, herkesin kolaylıkla anlayabileceği basit bir tasarımda sunuyoruz.</Typography>
                <div className="mt-6 flex items-center gap-4">
                    <Image src="/images/avatar.png" alt="Osmanbey" width={48} height={48} className="rounded-full" />
                    <div>
                        <Typography variant="body-m" weight="semibold" className="text-white">Osmanbey</Typography>
                        <Typography variant="body-s" className="text-neutral-300">Masis Erekli</Typography>
                    </div>
                </div>
             </div>
          </section>

          {/* --- Sağ Taraf: Kayıt Formu --- */}
          <section className="flex flex-col items-center justify-center bg-white p-8 dark:bg-neutral-800">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <Typography variant="heading-3">Hemen Kaydolun, Ücretsiz Deneyin</Typography>
                <Typography variant="body-l" className="mt-2 text-neutral-500 dark:text-neutral-300">
                  Yeni işletme hesabınızı oluşturun
                </Typography>
              </div>

              <form className="space-y-6">
                {/* Yeni eklenen alanlar */}
                <div className="space-y-3">
                  <Label htmlFor="business-name">İşletme Adı</Label>
                  <Input id="business-name" placeholder="Örn: Atropos Kafe" required />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="full-name">İsim Soyisim</Label>
                  <Input id="full-name" placeholder="Adınız ve Soyadınız" required />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email">Güncel Mail Adresiniz</Label>
                  <Input id="email" type="email" placeholder="ornek@email.com" required />
                </div>
                <div className="space-y-3">
                    <Label>Cep Telefonu</Label>
                    <div className="flex gap-2">
                        <div className="w-1/3">
                            <Combobox
                                options={countries}
                                value={countryCode}
                                onChange={setCountryCode}
                                placeholder="Ülke"
                            />
                        </div>
                        <div className="w-2/3">
                            <Input id="phone" type="tel" placeholder="555 123 4567" required />
                        </div>
                    </div>
                </div>
                
                {/* Şifre alanları */}
                <div className="flex gap-4">
                    <div className="w-1/2 space-y-3">
                      <Label htmlFor="password">Şifre</Label>
                      <div className="relative"><Input id="password" type={showPassword ? "text" : "password"} required className="pr-12" /><button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500">{showPassword ? <Eye/> : <EyeOff/>}</button></div>
                    </div>
                    <div className="w-1/2 space-y-3">
                      <Label htmlFor="password-confirm">Şifre Tekrar</Label>
                      <div className="relative"><Input id="password-confirm" type={showPasswordConfirm ? "text" : "password"} required className="pr-12" /><button type="button" onClick={() => setShowPasswordConfirm(v => !v)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500">{showPasswordConfirm ? <Eye/> : <EyeOff/>}</button></div>
                    </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="cursor-pointer text-sm text-neutral-600 dark:text-neutral-300">
                        <Link href="/terms" className="text-primary hover:underline">Kullanım Sözleşmesini</Link> ve <Link href="/privacy" className="text-primary hover:underline">Aydınlatma Metnini</Link> okudum, kabul ediyorum.
                    </Label>
                </div>
                
                <Button type="submit" className="w-full">
                  Hesabımı Oluştur
                </Button>
              </form>

              <Typography variant="body-m" className="text-center text-neutral-600 dark:text-neutral-300">
                Zaten bir hesabınız var mı?{' '}
                <Link href="/login">
                  <span className="font-semibold text-primary hover:underline">
                    Giriş Yapın
                  </span>
                </Link>
              </Typography>
            </div>
          </section>
        </main>
      );
    }
    ```

---

### **Özetle Ne Yaptık?**

1.  **Stratejiyi Belirledik:** Sadece temel kayıt işlemini yapıp, detaylı kurulumu (onboarding) sonraya bıraktık.
2.  **Yeni Component Ekledik:** Kullanıcı dostu, aranabilir bir `Combobox` component'i oluşturduk ve projeye ekledik.
3.  **Kayıt Formunu Oluşturduk:** Referans tasarımlardaki tüm gerekli alanları (İşletme Adı, İsim Soyisim vb.) içeren, kendi modern tasarım sistemimizle uyumlu bir form inşa ettik.
4.  **Yapıyı Koruduk:** Yeni sayfamızı da `(auth)` route group içine koyarak projenin tutarlı yapısını devam ettirdik.

Artık hem giriş hem de kayıt sayfalarımızın UI'ı hazır. Bir sonraki mantıklı adım, bu formları `React Hook Form` ile canlandırıp, backend'deki ilgili servislerle konuşturmak olacak.