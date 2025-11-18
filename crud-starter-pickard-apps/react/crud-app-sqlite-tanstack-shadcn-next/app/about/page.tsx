'use client';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  BookOpen, 
  Zap, 
  Shield, 
  Code2, 
  Layers,
  ArrowRight,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: <Zap className="size-5" />,
      title: 'Lightning Fast',
      description: 'Built with Next.js 16 App Router for optimal performance'
    },
    {
      icon: <Shield className="size-5" />,
      title: 'Type Safe',
      description: 'Full TypeScript support with Zod validation'
    },
    {
      icon: <Layers className="size-5" />,
      title: 'Modern Stack',
      description: 'TanStack Query, Zustand, and Shadcn UI components'
    },
    {
      icon: <Code2 className="size-5" />,
      title: 'Developer Experience',
      description: 'Hot reload, ESLint, and modern development tools'
    }
  ];

  const techStack = [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'TanStack Query',
    'Zustand',
    'Shadcn UI',
    'Tailwind CSS',
    'Lucide Icons',
    'Zod',
    'TanStack Form'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                About Items App
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A modern CRUD application built with the latest web technologies 
                to showcase best practices in React development.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tech Stack */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="size-5" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="size-5" />
                    Core Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Create, read, update, and delete items
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Priority-based organization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Category management
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Real-time search and filtering
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Dark mode support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="size-5" />
                    Development Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Type-safe API calls
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Form validation with Zod schemas
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Optimistic updates
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Error boundaries and handling
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Responsive design
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Explore the application to see how modern React development 
                  can create powerful, user-friendly interfaces.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button className="gap-2">
                      View Dashboard
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="gap-2">
                    <Github className="size-4" />
                    View Source
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>
                Built with ❤️ using modern web technologies. 
                This application serves as a reference implementation 
                for CRUD operations with React and Next.js.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}