import type { PropsWithChildren } from 'react'
import { ScrollViewStyleReset } from 'expo-router/html'

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang='ru'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <title></title>
        <meta name='author' content='Sulimova Anastasiia' />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}
