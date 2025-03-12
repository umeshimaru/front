import { cn } from "@/lib/utils"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-3xl md:text-4xl font-bold text-[#1a1a4b] text-center">{title}</CardTitle>
        {subtitle && <CardDescription className="text-xl text-[#1a1a4b] mt-2 text-center">{subtitle}</CardDescription>}
      </CardHeader>
    </div>
  )
}

