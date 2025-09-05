"use client"

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/8bit/card'
import { Button } from '@/components/ui/8bit/button'
import { Download, Loader2 } from 'lucide-react'

interface GenerationOutputProps {
  isGenerating: boolean
  generatedImage?: string | null
  onDownload?: () => void
}

export function GenerationOutput({ isGenerating, generatedImage, onDownload }: GenerationOutputProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>generated figurine</CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground retro">generating your figurine...</p>
          </div>
        ) : generatedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={generatedImage}
                alt="Generated figurine"
                width={400}
                height={400}
                className="w-full rounded-none border-4 border-foreground"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            {onDownload && (
              <Button onClick={onDownload} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                download
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p className="text-sm retro">your generated figurine will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}