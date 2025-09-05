"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/8bit/button'

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void
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
    onImageSelect(null as any)
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
            border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-colors retro relative
            ${isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground hover:border-primary hover:bg-muted/50'
            }
          `}
          style={{
            borderStyle: 'solid',
            borderWidth: '6px',
            borderColor: isDragActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
          }}
        >
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
          <div className="border-4 border-foreground rounded-none p-4 bg-muted/50">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-contain rounded-none pixelated"
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