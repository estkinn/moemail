'use client'

import { useEffect, useState } from 'react'

const WALLPAPER_API = 'https://api.xsot.cn/bing/'
const CACHE_KEY = 'moemail_wallpaper'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface WallpaperCache {
  url: string
  timestamp: number
}

interface WallpaperResponse {
  success: boolean
  data: {
    image: string
  }
}

export function useWallpaper() {
  const [wallpaperUrl, setWallpaperUrl] = useState<string>('')

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)

    if (cached) {
      try {
        const { url, timestamp }: WallpaperCache = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) {
          setWallpaperUrl(url)
          return
        }
      } catch {}
    }

    fetch(WALLPAPER_API)
      .then(res => res.json() as Promise<WallpaperResponse>)
      .then(res => {
        if (res.success && res.data?.image) {
          const url = res.data.image
          setWallpaperUrl(url)
          localStorage.setItem(CACHE_KEY, JSON.stringify({ url, timestamp: Date.now() }))
        }
      })
      .catch((err) => {
        console.error('Failed to fetch wallpaper:', err)
      })
  }, [])

  return wallpaperUrl
}
