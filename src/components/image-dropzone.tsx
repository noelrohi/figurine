"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/8bit/button'
import '@/components/ui/8bit/styles/retro.css'

interface ImageDropzoneProps {
  onImageSelect: (file: File | null) => void
}

export function ImageDropzone({ onImageSelect }: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      onImageSelect(file)
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    }
  }, [onImageSelect])

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
    onImageSelect(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  })

  return (
    <div className="w-full">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`
            relative border-y-6 border-foreground dark:border-ring p-8 text-center cursor-pointer transition-colors retro
            ${isDragActive
              ? 'bg-primary/5'
              : 'hover:bg-muted/50'
            }
          `}
        >
          {/* Pixelated border elements */}
          <div className="absolute inset-0 border-x-6 -mx-1.5 border-foreground dark:border-ring pointer-events-none" aria-hidden="true" />
          {/* Top shadow */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-foreground/20 pointer-events-none" />
          <div className="absolute top-1.5 left-0 w-3 h-1.5 bg-foreground/20 pointer-events-none" />
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-foreground/20 pointer-events-none" />
          <div className="absolute bottom-1.5 right-0 w-3 h-1.5 bg-foreground/20 pointer-events-none" />
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <Upload className="w-12 h-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-medium retro">
                {isDragActive ? 'drop the image here' : 'drag & drop an image here'}
              </p>
              <p className="text-sm text-muted-foreground mt-1 retro">
                or click to select a file
              </p>
            </div>
            <p className="text-xs text-muted-foreground retro">
              supports: jpg, png, webp
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative border-y-6 border-foreground dark:border-ring p-4 bg-muted/50">
            <div className="absolute inset-0 border-x-6 -mx-1.5 border-foreground dark:border-ring pointer-events-none" aria-hidden="true" />
            {/* Top shadow */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-foreground/20 pointer-events-none" />
            <div className="absolute top-1.5 left-0 w-3 h-1.5 bg-foreground/20 pointer-events-none" />
            {/* Bottom shadow */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-foreground/20 pointer-events-none" />
            <div className="absolute bottom-1.5 right-0 w-3 h-1.5 bg-foreground/20 pointer-events-none" />
            <Image
              src={preview}
              alt="Preview"
              width={400}
              height={192}
              className="w-full h-48 object-contain rounded-none pixelated relative z-10"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}