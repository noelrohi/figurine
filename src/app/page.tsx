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

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [figurineType, setFigurineType] = useState<FigurineType>()
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

  const handleGenerate = async () => {
    if (!selectedImage || !figurineType || !apiKey) {
      alert('Please select an image, figurine type, and set your API key')
      return
    }

    setIsGenerating(true)
    
    // TODO: Implement actual API call
    // For now, simulate generation
    setTimeout(() => {
      setGeneratedImage('/placeholder-figurine.jpg') // This would be the actual generated image
      setIsGenerating(false)
    }, 3000)
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
              Figurine AI
            </h1>
            <p className="text-muted-foreground retro">Transform your photos into custom figurines</p>
          </div>
          <ApiKeyDialog apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageDropzone onImageSelect={setSelectedImage} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configure Figurine</CardTitle>
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
                    <>Generating...</>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Figurine
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
                // TODO: Implement download functionality
                console.log('Download clicked')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
