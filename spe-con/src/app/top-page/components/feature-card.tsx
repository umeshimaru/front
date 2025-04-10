import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/top-page/components/card"

interface FeatureProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function FeatureCard({ title, description, imageSrc, imageAlt }: FeatureProps) {
  return (
    <Card className="overflow-hidden border-[#5aafb0]/30">
      <CardContent className="p-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          width={320}
          height={640}
          className="w-full h-auto object-cover"
        />
      </CardContent>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-[#1a1a4b] mb-2">{title}</CardTitle>
        <CardDescription className="text-gray-600 text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

