import type { Resort } from '../types'

const EPOCH = new Date('2026-04-16T00:00:00Z')

export function getPuzzleNumber(date: Date = new Date()): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.max(0, Math.floor((utc - EPOCH.getTime()) / 86400000))
}

function lcgIndex(seed: number, length: number): number {
  const a = 1664525
  const c = 1013904223
  const m = 2 ** 32
  const state = ((seed * a + c) % m + m) % m
  return state % length
}

export function getDailyResort(resorts: Resort[], date?: Date): Resort {
  const n = getPuzzleNumber(date)
  return resorts[lcgIndex(n, resorts.length)]
}
