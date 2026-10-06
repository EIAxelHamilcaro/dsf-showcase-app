import {
  CheckCircle2,
  Clock,
  Euro,
  FileText,
  type LucideIcon,
  MapPin,
  Shield,
} from "lucide-react";

const blockIcons: Partial<Record<string, LucideIcon>> = {
  mapPin: MapPin,
  clock: Clock,
  shield: Shield,
  euro: Euro,
  checkCircle: CheckCircle2,
  fileText: FileText,
};

export function resolveIcon(
  name: string | null | undefined,
): LucideIcon | null {
  if (!name) {
    return null;
  }

  return blockIcons[name] ?? null;
}
