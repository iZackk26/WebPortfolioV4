import { MessageSquare, Smartphone } from 'lucide-react';
import { BentoCard } from './BentoCard';
import type { AutomationCardProps } from './AutomationFeatureCards';

const MOBILE_PLATFORMS = ['iOS', 'Android'] as const;

const CompactCardText = ({ title, description }: AutomationCardProps) => (
  <>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">{description}</p>
  </>
);

export const CommentsCard = (props: AutomationCardProps) => (
  <BentoCard
    reveal="up"
    delay={0.4}
    className="md:col-span-2 lg:col-span-2 md:row-span-1 bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-6 hover:border-[rgb(var(--color-accent))]/30 hover:shadow-lg transition-all duration-300"
  >
    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
      <MessageSquare size={24} className="text-orange-400/70" />
    </div>
    <CompactCardText {...props} />
  </BentoCard>
);

export const MobileAppCard = (props: AutomationCardProps) => (
  <BentoCard
    reveal="up"
    delay={0.45}
    className="md:col-span-2 lg:col-span-2 md:row-span-1 bg-gradient-to-br from-cyan-500/10 to-blue-500/8 border-2 border-cyan-500/15 rounded-2xl p-6 hover:border-cyan-500/30 hover:scale-105 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-cyan-500/15 rounded-lg flex items-center justify-center">
        <Smartphone size={20} className="text-cyan-400/70" />
      </div>
      <div className="flex gap-1.5">
        {MOBILE_PLATFORMS.map((platform) => (
          <span
            key={platform}
            className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-600 rounded font-medium border border-cyan-500/20"
          >
            {platform}
          </span>
        ))}
      </div>
    </div>
    <CompactCardText {...props} />
  </BentoCard>
);

export const ResponsiveCard = (props: AutomationCardProps) => (
  <BentoCard
    reveal="scale"
    delay={0.5}
    className="md:col-span-2 lg:col-span-2 md:row-span-1 bg-gradient-to-br from-purple-500/10 to-pink-500/8 border-2 border-purple-500/15 rounded-2xl p-6 hover:border-purple-500/30 hover:scale-105 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-purple-500/15 rounded-lg flex items-center justify-center mb-3">
      <Smartphone size={24} className="text-purple-400/70" />
    </div>
    <CompactCardText {...props} />
  </BentoCard>
);
