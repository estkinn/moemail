'use client'

import { useEffect, useState } from 'react'

const WALLPAPER_API = 'https://api.xsot.cn/bing?jump=true'
const CACHE_KEY = 'moemail_wallpaper'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface WallpaperCache {
  url: string
  timestamp: number
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
      .then(res => res.url)
      .then(url => {
        setWallpaperUrl(url)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ url, timestamp: Date.now() }))
      })
      .catch(() => {})
  }, [])

  return wallpaperUrl
}
