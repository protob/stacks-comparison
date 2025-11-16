<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
    <div class="max-w-md w-full space-y-6 text-center">
      <h1 class="text-4xl font-bold">Welcome to shadcn/ui</h1>
      <p class="text-muted-foreground">
        A simple, beautiful, and accessible component library built with Radix UI and Tailwind CSS.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="default">
          Get Started
        </Button>
        <Button variant="outline">
          Learn More
        </Button>
      </div>
      
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Button Variants</h2>
        <div class="flex flex-wrap gap-2 justify-center">
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
