type RVPressUserConfig = {
  root: string
  base: string
  cacheDir: string
}

// TODO: implement config resolution logic
export async function resolveConfig(): Promise<RVPressUserConfig> {
  return {
    root: process.cwd(),
    base: "/",
    cacheDir: "./.rvpress/cache"
  } satisfies RVPressUserConfig
}
