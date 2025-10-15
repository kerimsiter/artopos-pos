import { Typography } from "@/components/ui/typography";

export function TypographyShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <Typography variant="heading-2" className="text-neutral-900">
          Typography Sistemi
        </Typography>
        <Typography variant="body-l" className="text-neutral-600">
          Plus Jakarta Sans font ailesi ile oluşturulmuş tipografi sistemi
        </Typography>
      </div>

      {/* Headings */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Başlıklar
        </Typography>
        
        <div className="space-y-4">
          <div>
            <Typography variant="heading-1" className="text-neutral-900">
              Heading 1
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              64px / 76px line-height - Bold
            </Typography>
          </div>
          
          <div>
            <Typography variant="heading-2" className="text-neutral-900">
              Heading 2
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              46px / 54px line-height - Bold
            </Typography>
          </div>
          
          <div>
            <Typography variant="heading-3" className="text-neutral-900">
              Heading 3
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              36px / 44px line-height - Bold
            </Typography>
          </div>
          
          <div>
            <Typography variant="heading-4" className="text-neutral-900">
              Heading 4
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              24px / 30px line-height - Bold
            </Typography>
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Gövde Metinleri
        </Typography>
        
        <div className="space-y-4">
          <div>
            <Typography variant="body-xl" className="text-neutral-900">
              Body XL - Bu büyük gövde metnidir
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              20px / 28px line-height
            </Typography>
          </div>
          
          <div>
            <Typography variant="body-l" className="text-neutral-900">
              Body L - Bu büyük gövde metnidir
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              18px / 24px line-height
            </Typography>
          </div>
          
          <div>
            <Typography variant="body-m" className="text-neutral-900">
              Body M - Bu orta boy gövde metnidir
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              16px / 22px line-height
            </Typography>
          </div>
          
          <div>
            <Typography variant="body-s" className="text-neutral-900">
              Body S - Bu küçük gövde metnidir
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              14px / 20px line-height
            </Typography>
          </div>
          
          <div>
            <Typography variant="body-xs" className="text-neutral-900">
              Body XS - Bu çok küçük gövde metnidir
            </Typography>
            <Typography variant="body-s" className="text-neutral-400">
              12px / 16px line-height
            </Typography>
          </div>
        </div>
      </div>

      {/* Font Weights */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Font Ağırlıkları
        </Typography>
        
        <div className="space-y-2">
          <Typography variant="body-l" weight="normal" className="text-neutral-900">
            Normal (400) - Standart metin ağırlığı
          </Typography>
          <Typography variant="body-l" weight="medium" className="text-neutral-900">
            Medium (500) - Orta ağırlık
          </Typography>
          <Typography variant="body-l" weight="semibold" className="text-neutral-900">
            Semibold (600) - Yarı kalın
          </Typography>
          <Typography variant="body-l" weight="bold" className="text-neutral-900">
            Bold (700) - Kalın
          </Typography>
        </div>
      </div>
    </div>
  );
}
