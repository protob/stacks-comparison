<script setup lang="ts">
import { Button } from '~/components/ui/button'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
    <div class="w-full max-w-md space-y-6 text-center">
      <h1 class="text-4xl font-bold">Welcome to shadcn/ui</h1>
      <p class="text-muted-foreground">
        A simple, beautiful, and accessible component library built with Radix UI and Tailwind CSS.
      </p>
      
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <Button variant="default">
          Get Started
        </Button>
        <Button variant="outline">
          Learn More
        </Button>
      </div>
      
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Button Variants</h2>
        <div class="flex flex-wrap justify-center gap-2">
          <Button variant="default" size="sm">Default Small</Button>
          <Button variant="default">Default</Button>
          <Button variant="default" size="lg">Default Large</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  </div>
</template>
