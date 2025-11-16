import { createFileRoute } from "@tanstack/react-router";
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative px-6 py-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Zap className="w-12 h-12 text-cyan-400" />

            <div>
              <Button>ShadCn button</Button>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
}
