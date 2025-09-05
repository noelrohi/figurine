"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/8bit/select'
import { Label } from '@/components/ui/8bit/label'
import { FIGURINE_OPTIONS, type FigurineOption } from '@/lib/google-genai'

export type FigurineType = FigurineOption['id']

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
          {FIGURINE_OPTIONS.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}