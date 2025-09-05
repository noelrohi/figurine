"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/8bit/select'
import { Label } from '@/components/ui/8bit/label'

const FIGURINE_TYPES = [
  { value: 'funko-pop', label: 'funko pop' },
  { value: 'action-figure', label: 'action figure' },
  { value: 'chibi', label: 'chibi style' },
  { value: 'realistic', label: 'realistic figurine' },
  { value: 'anime', label: 'anime style' },
  { value: 'cartoon', label: 'cartoon style' },
] as const

export type FigurineType = typeof FIGURINE_TYPES[number]['value']

interface FigurineSelectorProps {
  value?: FigurineType
  onValueChange: (value: FigurineType) => void
}

export function FigurineSelector({ value, onValueChange }: FigurineSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="figurine-type">figurine type</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="select figurine type" />
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