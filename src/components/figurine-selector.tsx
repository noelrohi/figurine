"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/8bit/select'
import { Label } from '@/components/ui/8bit/label'

const FIGURINE_TYPES = [
  { value: 'funko-pop', label: 'Funko Pop' },
  { value: 'action-figure', label: 'Action Figure' },
  { value: 'chibi', label: 'Chibi Style' },
  { value: 'realistic', label: 'Realistic Figurine' },
  { value: 'anime', label: 'Anime Style' },
  { value: 'cartoon', label: 'Cartoon Style' },
] as const

export type FigurineType = typeof FIGURINE_TYPES[number]['value']

interface FigurineSelectorProps {
  value?: FigurineType
  onValueChange: (value: FigurineType) => void
}

export function FigurineSelector({ value, onValueChange }: FigurineSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="figurine-type">Figurine Type</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select figurine type" />
        </SelectTrigger>
        <SelectContent className="z-50">
          {FIGURINE_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}