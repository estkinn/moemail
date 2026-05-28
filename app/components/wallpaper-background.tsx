'use client'

import { useWallpaper } from '@/hooks/use-wallpaper'

export function WallpaperBackground() {
  const wallpaperUrl = useWallpaper()

  if (!wallpaperUrl) return null

  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30 blur-sm"
      style={{ backgroundImage: `url(${wallpaperUrl})` }}
    />
  )
}
