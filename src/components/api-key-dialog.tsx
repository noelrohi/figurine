"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/8bit/dialog'
import { Button } from '@/components/ui/8bit/button'
import { Input } from '@/components/ui/8bit/input'
import { Label } from '@/components/ui/8bit/label'
import { Settings } from 'lucide-react'

interface ApiKeyDialogProps {
  apiKey: string
  onApiKeyChange: (apiKey: string) => void
}

export function ApiKeyDialog({ apiKey, onApiKeyChange }: ApiKeyDialogProps) {
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    onApiKeyChange(tempApiKey)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          api key
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>configure api key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">api key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="enter your api key"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground retro">
              your api key is stored locally and never sent to our servers.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              cancel
            </Button>
            <Button onClick={handleSave}>
              save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}