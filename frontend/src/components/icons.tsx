import { ChefHat } from "lucide-react";
import Image from "next/image";

export const Icons = {
  // Kendi SVG logonuzu buraya ekleyebilirsiniz.
  // Şimdilik marka kimliğini yansıtması için bir placeholder.
  logo: () => (
    <div className="flex items-center gap-2">
      <Image src="/images/logo.svg" alt="Atropos" width={132} height={32} priority />
    </div>
  ),
};
