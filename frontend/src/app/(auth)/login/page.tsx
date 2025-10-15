"use client";
import Image from "next/image";
import Link from "next/link";
import { Quote, EyeOff, Eye, Headset, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { Icons } from "@/components/icons";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* --- Sol Taraf: Tanıtım --- */}
      <section className="relative hidden flex-col justify-between bg-neutral-900 p-10 text-white lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center"
          // Yeni referans görsele uygun bir görsel ekle: public/images/atropos-bg.jpg
          style={{ backgroundImage: "url(/images/login-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-neutral-900/60" />

        <div className="relative z-20">
          <Icons.logo />
        </div>

        <div className="relative z-20 mt-auto max-w-lg">
          <Quote className="h-16 w-16 text-primary-400" />
          <Typography variant="heading-4" className="mt-4 text-white">
            İşletmenizin ihtiyaç duyduğu her şeyi, herkesin kolaylıkla
            anlayabileceği basit bir tasarımda sunuyoruz.
          </Typography>
          <div className="mt-6 flex items-center gap-4">
            <Image
              // Bu görseli public/images/avatar.png adresine eklemelisin
              src="/images/avatar.png"
              alt="Osmanbey"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <Typography variant="body-m" weight="semibold" className="text-white">
                Osmanbey
              </Typography>
              <Typography variant="body-s" className="text-neutral-300">
                Masis Erekli
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* --- Sağ Taraf: Giriş Formu --- */}
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
            <Typography variant="heading-3">
              Atropos'a Hoşgeldiniz
            </Typography>
            <Typography variant="body-l" className="mt-2 text-neutral-500 dark:text-neutral-300">
              Lütfen üyelik bilgileriniz ile giriş yapınız
            </Typography>
          </div>

          <form className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-body-m">E-Posta Adresi veya Telefon Numarası</Label>
              <Input id="email" type="email" placeholder="ornek@email.com" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-body-m">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-12"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 z-10 flex items-center pr-4 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" className="h-5 w-5"/>
                <Label htmlFor="remember-me" className="cursor-pointer text-neutral-600 dark:text-neutral-300">
                  Beni Hatırla
                </Label>
              </div>
              <Link href="/forgot-password">
                <Typography variant="body-s" weight="medium" className="text-[#35C56E] hover:underline">
                  Şifremi Unuttum?
                </Typography>
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex-1 h-px bg-neutral-200"></div>
              <Typography variant="body-m" className="text-neutral-600 font-semibold">
                Veya
              </Typography>
              <div className="flex-1 h-px bg-neutral-200"></div>
            </div>
            
            <Button variant="outline" className="w-full text-body-m" type="button">
              <Plus className="w-6 h-6 mr-2" />
              <Typography as="span" variant="body-m" className="whitespace-pre">Üye Değil Misiniz? </Typography>
              <Typography as="span" variant="body-m" weight="semibold" className="text-primary">Şimdi Kaydolun</Typography>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
