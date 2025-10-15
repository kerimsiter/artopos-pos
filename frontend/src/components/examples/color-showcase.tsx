import { Typography } from "@/components/ui/typography";

export function ColorShowcase() {
  const primaryColors = [
    { name: "Primary 50", value: "#F2FAF7", class: "bg-primary-50" },
    { name: "Primary 100", value: "#DAF4E6", class: "bg-primary-100" },
    { name: "Primary 200", value: "#BEEDD2", class: "bg-primary-200" },
    { name: "Primary 300", value: "#99E4B8", class: "bg-primary-300" },
    { name: "Primary 400", value: "#6AD896", class: "bg-primary-400" },
    { name: "Primary 500", value: "#34CB6F", class: "bg-primary-500" },
    { name: "Primary 600", value: "#2EB362", class: "bg-primary-600" },
    { name: "Primary 700", value: "#289E56", class: "bg-primary-700" },
    { name: "Primary 800", value: "#218347", class: "bg-primary-800" },
    { name: "Primary 900", value: "#1A6637", class: "bg-primary-900" },
  ];

  const neutralColors = [
    { name: "White", value: "#FFFFFF", class: "bg-white border" },
    { name: "Neutral 50", value: "#FAFAFA", class: "bg-neutral-50" },
    { name: "Neutral 100", value: "#F7F7F7", class: "bg-neutral-100" },
    { name: "Neutral 200", value: "#E5E5E5", class: "bg-neutral-200" },
    { name: "Neutral 300", value: "#D7D7D7", class: "bg-neutral-300" },
    { name: "Neutral 400", value: "#A3A3A3", class: "bg-neutral-400" },
    { name: "Neutral 500", value: "#757575", class: "bg-neutral-500" },
    { name: "Neutral 600", value: "#525252", class: "bg-neutral-600" },
    { name: "Neutral 700", value: "#464646", class: "bg-neutral-700" },
    { name: "Neutral 800", value: "#282828", class: "bg-neutral-800" },
    { name: "Neutral 900", value: "#141414", class: "bg-neutral-900" },
  ];

  const semanticColors = [
    {
      name: "Error",
      colors: [
        { name: "Error 50", value: "#FEEDEA", class: "bg-error-50" },
        { name: "Error 500", value: "#F04D28", class: "bg-error-500" },
      ]
    },
    {
      name: "Warning", 
      colors: [
        { name: "Warning 50", value: "#FFF7E6", class: "bg-warning-50" },
        { name: "Warning 500", value: "#FFAB00", class: "bg-warning-500" },
      ]
    },
    {
      name: "Info",
      colors: [
        { name: "Info 50", value: "#E8F4FF", class: "bg-info-50" },
        { name: "Info 500", value: "#1D90FB", class: "bg-info-500" },
      ]
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <Typography variant="heading-2" className="text-neutral-900">
          Renk Paleti
        </Typography>
        <Typography variant="body-l" className="text-neutral-600">
          ClaPos POS sistemi için tasarlanmış renk paleti
        </Typography>
      </div>

      {/* Primary Colors */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Ana Renkler (Primary)
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {primaryColors.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`h-20 w-full rounded-lg ${color.class}`} />
              <div className="space-y-1">
                <Typography variant="body-s" weight="semibold" className="text-neutral-900">
                  {color.name}
                </Typography>
                <Typography variant="body-xs" className="text-neutral-500 font-mono">
                  {color.value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neutral Colors */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Nötr Renkler (Neutral)
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {neutralColors.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`h-20 w-full rounded-lg ${color.class}`} />
              <div className="space-y-1">
                <Typography variant="body-s" weight="semibold" className="text-neutral-900">
                  {color.name}
                </Typography>
                <Typography variant="body-xs" className="text-neutral-500 font-mono">
                  {color.value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Anlamsal Renkler (Semantic)
        </Typography>
        <div className="space-y-8">
          {semanticColors.map((category) => (
            <div key={category.name} className="space-y-4">
              <Typography variant="heading-4" className="text-neutral-700">
                {category.name}
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.colors.map((color) => (
                  <div key={color.name} className="space-y-3">
                    <div className={`h-16 w-full rounded-lg ${color.class}`} />
                    <div className="space-y-1">
                      <Typography variant="body-s" weight="semibold" className="text-neutral-900">
                        {color.name}
                      </Typography>
                      <Typography variant="body-xs" className="text-neutral-500 font-mono">
                        {color.value}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-6">
        <Typography variant="heading-3" className="text-neutral-900">
          Kullanım Örnekleri
        </Typography>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <Typography variant="body-m" weight="semibold" className="text-primary-800">
              Başarılı İşlem
            </Typography>
            <Typography variant="body-s" className="text-primary-700">
              Sipariş başarıyla oluşturuldu.
            </Typography>
          </div>
          
          <div className="p-4 bg-error-50 rounded-lg border border-error-200">
            <Typography variant="body-m" weight="semibold" className="text-error-500">
              Hata Mesajı
            </Typography>
            <Typography variant="body-s" className="text-error-400">
              Bir hata oluştu, lütfen tekrar deneyin.
            </Typography>
          </div>
          
          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <Typography variant="body-m" weight="semibold" className="text-warning-500">
              Uyarı
            </Typography>
            <Typography variant="body-s" className="text-warning-400">
              Stok seviyesi düşük.
            </Typography>
          </div>
          
          <div className="p-4 bg-info-50 rounded-lg border border-info-200">
            <Typography variant="body-m" weight="semibold" className="text-info-500">
              Bilgi
            </Typography>
            <Typography variant="body-s" className="text-info-400">
              Yeni özellikler eklendi.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
