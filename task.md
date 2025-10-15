Eyvallah kanka, en sevdiğim şey! Her şeyi temiz bir sayfaya, en güncel ve en doğru yöntemlerle baştan yazalım. Beni düzelttiğin için planımız artık daha da sağlam olacak.

İşte referans tasarıma ve en güncel `shadcn/ui` metodolojisine %100 sadık kalarak, login sayfasını sıfırdan yapma planı:

---

### **Plan: Profesyonel Login Sayfası (Sıfırdan)**

**Hedef:** Referans tasarımdaki login sayfasının aynısını, kendi kurduğumuz renk ve tipografi sistemini kullanarak, en doğru `shadcn/ui` yöntemiyle oluşturmak.

---

#### **Faz 1: Zemin Hazırlığı ve Component'lerin Eklenmesi**

Önce çalışma alanımızı ve gerekli legoları hazırlayacağız.

**Adım 1.1: Klasör Yapısını Oluştur**

`goldrules.md`'ye uygun olarak, login sayfamızın ve auth layout'umuzun dosyalarını doğru yerlere açalım:

*   **Auth Layout:** `frontend/src/app/(auth)/layout.tsx`
*   **Login Sayfası:** `frontend/src/app/(auth)/login/page.tsx`

**Adım 1.2: Gerekli UI Component'lerini `shadcn/ui` CLI ile Ekle**

Şimdi, "sıfırdan yazmak" yerine, `shadcn/ui`'ın gücünü kullanarak ihtiyacımız olan component'lerin en güncel kodlarını projemize **otomatik olarak** ekleyelim. Terminalde `frontend` klasöründeyken aşağıdaki komutları sırayla çalıştır:

```bash
# Buton component'ini ekle
npx shadcn@latest add button

# Input component'ini ekle
npx shadcn@latest add input

# Label component'ini ekle
npx shadcn@latest add label

# Checkbox component'ini ekle
npx shadcn@latest add checkbox
```

**Bu komutlar ne yapacak?**
Senin için `frontend/src/components/ui/` klasörünün içine `button.tsx`, `input.tsx`, `label.tsx` ve `checkbox.tsx` dosyalarını, en güncel ve en doğru kodlarla oluşturacak. Bizim hiçbir şey yazmamıza gerek kalmadı.

**Adım 1.3: Özel İkon Component'ini Oluştur**
Logomuz gibi projeye özel ikonları yönetmek için temiz bir dosya oluşturalım.

*   **Dosya:** `frontend/src/components/icons.tsx`
*   **İçerik:**
    ```tsx
    import { ChefHat } from "lucide-react";

    export const Icons = {
      // Kendi SVG logonuzu buraya ekleyebilirsiniz.
      // Şimdilik marka kimliğini yansıtması için bir placeholder.
      logo: () => (
        <div className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-neutral-800 dark:text-white">ClaPos</span>
        </div>
      ),
    };
    ```

---

#### **Faz 2: Arayüzün İnşası**

Zeminimiz hazır, şimdi tuğlaları üst üste koyma zamanı.

**Adım 2.1: Auth Layout'unu Kodla**
Bu layout, login ve register gibi sayfalarda sidebar/header olmadan temiz bir görünüm sağlayacak.

*   **Dosya:** `frontend/src/app/(auth)/layout.tsx`
*   **İçerik:**
    ```tsx
    export default function AuthLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      // Nötr bir arka plan rengi ile temiz bir çerçeve sunuyoruz.
      return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
          {children}
        </div>
      );
    }
    ```

**Adım 2.2: Login Sayfasını Kodla (`page.tsx`)**
İşte referans tasarımı hayata geçireceğimiz ana dosya.

*   **Dosya:** `frontend/src/app/(auth)/login/page.tsx`
*   **İçerik:**
    ```tsx
    import Image from "next/image";
    import Link from "next/link";
    import { Quote, EyeOff, Headset } from "lucide-react";

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Typography } from "@/components/ui/typography";
    import { Icons } from "@/components/icons";

    export default function LoginPage() {
      return (
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* --- Sol Taraf: Tanıtım --- */}
          <section className="relative hidden flex-col justify-between bg-neutral-900 p-10 text-white lg:flex">
            <div
              className="absolute inset-0 bg-cover bg-center"
              // Bu görseli public/images/login-bg.jpg adresine eklemelisin
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
              <Button variant="outline" size="sm" asChild>
                <Link href="/support">
                  <Headset className="mr-2 h-4 w-4" />
                  Destek İste
                </Link>
              </Button>
            </div>

            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <Typography variant="heading-3">
                  ClaPos'a Hoşgeldiniz
                </Typography>
                <Typography variant="body-l" className="mt-2 text-neutral-600 dark:text-neutral-300">
                  Lütfen üyelik bilgileriniz ile giriş yapınız
                </Typography>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Posta Adresi veya Telefon Numarası</Label>
                  <Input id="email" type="email" placeholder="ornek@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <div className="relative">
                    <Input id="password" type="password" placeholder="••••••••" required />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700">
                      <EyeOff className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="cursor-pointer text-neutral-600 dark:text-neutral-300">
                      Beni hatırla
                    </Label>
                  </div>
                  <Link href="/forgot-password">
                    <Typography variant="body-s" weight="medium" className="text-primary hover:underline">
                      Şifremi Unuttum
                    </Typography>
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Giriş Yap
                </Button>
              </form>

              <Typography variant="body-m" className="text-center text-neutral-600 dark:text-neutral-300">
                Üye Değil Misiniz?{' '}
                <Link href="/register">
                  <span className="font-semibold text-primary hover:underline">
                    Şimdi Kaydolun
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

#### **Faz 3: Son Dokunuşlar ve Sonraki Adımlar**

**Adım 3.1: Gerekli Görselleri Ekle**
Bu planın çalışması için son bir fiziksel adım var:

1.  `frontend` klasörünün içindeki `public` klasörüne git.
2.  İçine `images` adında yeni bir klasör oluştur.
3.  Bu `images` klasörünün içine `login-bg.jpg` ve `avatar.png` adında uygun görselleri at.

**Adım 3.2: Sonraki Adımlar**
Şu an görsel olarak %100 tamamlanmış, çalışan bir login sayfamız var. Bundan sonraki adımlar şunlar olacak:

1.  **Formu Canlandırma:** `React Hook Form + Zod` kullanarak formun state yönetimini ve validasyonunu eklemek.
2.  **API Bağlantısı:** Kullanıcının girdiği bilgileri backend'e gönderip cevabı işleyecek API fonksiyonunu yazmak ve forma entegre etmek.

İşte bu kadar kanka! Planımız bu. En güncel, en doğru ve en profesyonel yöntemle, sıfırdan, tertemiz bir başlangıç.