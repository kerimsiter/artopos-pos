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
