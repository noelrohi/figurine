"use client"

import { useState, useEffect } from 'react'
import '@/components/ui/8bit/styles/retro.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/8bit/card'
import { Button } from '@/components/ui/8bit/button'
import { ImageDropzone } from '@/components/image-dropzone'
import { FigurineSelector, type FigurineType } from '@/components/figurine-selector'
import { ApiKeyDialog } from '@/components/api-key-dialog'
import { GenerationOutput } from '@/components/generation-output'
import { Sparkles } from 'lucide-react'
import { generateFigurineImage, FIGURINE_OPTIONS } from '@/lib/google-genai'
import { toast } from 'sonner'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [figurineType, setFigurineType] = useState<FigurineType>('original')
  const [apiKey, setApiKey] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('figurine-ai-api-key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  // Save API key to localStorage when changed
  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey)
    localStorage.setItem('figurine-ai-api-key', newApiKey)
  }

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const message = error.message
      if (message.includes('quota')) {
        return 'API quota exceeded. Please check your billing.'
      }
      if (message.includes('RESOURCE_EXHAUSTED')) {
        return 'API limit reached. Please try again later.'
      }
      if (message.includes('INVALID_ARGUMENT')) {
        return 'Invalid request. Please try a different image.'
      }
      if (message.includes('UNAUTHENTICATED')) {
        return 'Invalid API key. Please check your credentials.'
      }
      if (message.includes('PERMISSION_DENIED')) {
        return 'Access denied. Please verify your API permissions.'
      }
      return 'Generation failed. Please try again.'
    }
    return 'Unknown error occurred.'
  }

  const handleGenerate = async () => {
    if (!selectedImage || !figurineType || !apiKey) {
      toast.error('Please select an image, figurine type, and set your API key')
      return
    }

    setIsGenerating(true)

    try {
      const selectedOption = FIGURINE_OPTIONS.find(option => option.id === figurineType)
      if (!selectedOption) {
        throw new Error('Selected figurine type not found')
      }

      const generatedImageUrl = await generateFigurineImage(selectedImage, selectedOption.prompt, apiKey)
      setGeneratedImage(generatedImageUrl)
    } catch (error) {
      console.error('Generation failed:', error)
      toast.error(getErrorMessage(error))
    } finally {
      setIsGenerating(false)
    }
  }

  const canGenerate = selectedImage && figurineType && apiKey

  return (
    <div className="min-h-screen bg-muted/50 p-4 retro">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 retro">
              <Sparkles className="w-8 h-8 text-primary" />
              figurine ai
            </h1>
            <p className="text-muted-foreground retro">transform your photos into custom figurines</p>
          </div>
          <ApiKeyDialog apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>upload image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageDropzone onImageSelect={setSelectedImage} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>configure figurine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FigurineSelector
                  value={figurineType}
                  onValueChange={setFigurineType}
                />

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!canGenerate || isGenerating}
                >
                  {isGenerating ? (
                    <>generating...</>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      generate figurine
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Output */}
          <div>
            <GenerationOutput
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              onDownload={() => {
                if (generatedImage) {
                  const link = document.createElement('a')
                  link.href = generatedImage
                  link.download = 'figurine.png'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
