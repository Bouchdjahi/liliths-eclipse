import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Turbopack configuration for better performance
  turbopack: {
    // Set the root directory to current working directory
    root: process.cwd(),
    
    // Optional: Add resolve extensions if needed
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    
    // Optional: Enable debug IDs for better debugging (only in development)
    ...(process.env.NODE_ENV === 'development' && {
      debugIds: true,
    }),
  },
  
  // Other Next.js config options
  images: {
    domains: ['localhost'],
  },
  
  // Transpile packages if needed
  transpilePackages: ['three'],
}

export default nextConfig