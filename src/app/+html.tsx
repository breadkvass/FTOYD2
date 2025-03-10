import type { PropsWithChildren } from 'react'
import { ScrollViewStyleReset } from 'expo-router/html'

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>FTOYD | тестовое 2</title>
        <meta name="title" content="Expo Router Typescript" />
        <meta name="description" content="Тестовое задание для FTOYD" />
        <meta name="author" content="Sulimova Anastasiia" />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}
