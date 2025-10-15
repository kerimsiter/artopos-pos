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
        <div className="absolute right-8 top-8">
          <Button variant="outline" size="sm" asChild className="text-body-s">
            <Link href="/support">
              <Headset className="mr-2 h-4 w-4" />
              Destek İste
            </Link>
          </Button>
        </div>

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
              <Label htmlFor="business-name" className="text-body-m">İşletme Adı</Label>
              <Input id="business-name" placeholder="Örn: Atropos Kafe" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="full-name" className="text-body-m">İsim Soyisim</Label>
              <Input id="full-name" placeholder="Adınız ve Soyadınız" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-body-m">Güncel Mail Adresiniz</Label>
              <Input id="email" type="email" placeholder="ornek@email.com" required />
            </div>
            <div className="space-y-3">
                <Label className="text-body-m">Cep Telefonu</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <Combobox
                      options={countries}
                      value={countryCode}
                      onChange={setCountryCode}
                      placeholder="Ülke"
                      className="z-10"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input id="phone" type="tel" placeholder="555 123 4567" required />
                  </div>
                </div>
            </div>
            
            {/* Şifre alanları */}
            <div className="flex gap-4">
                <div className="w-1/2 space-y-3">
                  <Label htmlFor="password" className="text-body-m">Şifre</Label>
                  <div className="relative"><Input id="password" type={showPassword ? "text" : "password"} required className="pr-12" /><button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500">{showPassword ? <Eye/> : <EyeOff/>}</button></div>
                </div>
                <div className="w-1/2 space-y-3">
                  <Label htmlFor="password-confirm" className="text-body-m">Şifre Tekrar</Label>
                  <div className="relative"><Input id="password-confirm" type={showPasswordConfirm ? "text" : "password"} required className="pr-12" /><button type="button" onClick={() => setShowPasswordConfirm(v => !v)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500">{showPasswordConfirm ? <Eye/> : <EyeOff/>}</button></div>
                </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="block cursor-pointer text-body-s leading-6 text-neutral-600 dark:text-neutral-300">
                    <Link href="/terms" className="text-primary hover:text-primary-600 underline-offset-4 hover:underline">Kullanım Sözleşmesini</Link>
                    {" "}ve{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary-600 underline-offset-4 hover:underline">Aydınlatma Metnini</Link>{" "}
                    okudum, kabul ediyorum.
                </Label>
            </div>
            
            <Button type="submit" className="w-full">
              Hesabımı Oluştur
            </Button>
          </form>

          <Button variant="outline" className="w-full text-body-m" asChild>
            <Link href="/login">
              <ArrowLeft className="w-6 h-6 mr-2" />
              <span className="whitespace-pre">Zaten bir hesabınız var mı? </span>
              <span className="font-semibold text-primary hover:text-primary-600">Giriş Yapın</span>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
