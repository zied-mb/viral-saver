declare module "next-themes" {
  import * as React from "react"

  export function useTheme(): {
    theme: string | undefined
    setTheme: (theme: string) => void
    resolvedTheme: string
  }

  export const ThemeProvider: React.FC<{ attribute?: string }>
}