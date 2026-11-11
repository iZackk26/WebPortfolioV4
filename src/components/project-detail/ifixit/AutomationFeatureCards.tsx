import { Bell, Image, Search } from 'lucide-react';
import { BentoCard } from './BentoCard';

export interface AutomationCardProps {
  title: string;
  description: string;
}

const IMAGE_THUMBNAIL_CLASSES = [
  'bg-emerald-500/10 border-emerald-500/20',
  'bg-teal-500/10 border-teal-500/20',
  'bg-emerald-500/10 border-emerald-500/20',
] as const;

export const SearchCard = ({ title, description }: AutomationCardProps) => (
  <BentoCard
    reveal="scale"
    delay={0.1}
    className="md:col-span-2 lg:col-span-3 md:row-span-2 bg-gradient-to-br from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 border-2 border-[rgb(var(--color-accent))]/20 rounded-2xl p-8 relative overflow-hidden group hover:border-[rgb(var(--color-accent))]/40 transition-all duration-300"
  >
    <div className="absolute top-0 right-0 w-40 h-40 bg-[rgb(var(--color-accent))]/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[rgb(var(--color-accent))]/5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
    <div className="relative z-10">
      <div className="w-16 h-16 bg-[rgb(var(--color-accent))]/15 rounded-xl flex items-center justify-center mb-6">
        <Search size={32} className="text-[rgb(var(--color-accent))]" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-[rgb(var(--color-text))]">{title}</h3>
      <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed text-lg">{description}</p>
    </div>
  </BentoCard>
);

export const StatusCard = ({ title, description }: AutomationCardProps) => (
  <BentoCard
    reveal="up"
    delay={0.2}
    className="md:col-span-2 lg:col-span-3 md:row-span-1 bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-6 hover:border-[rgb(var(--color-accent))]/30 transition-all duration-300 group"
  >
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Bell size={32} className="text-blue-400/70" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </BentoCard>
);

export const ImagesCard = ({ title, description }: AutomationCardProps) => (
  <BentoCard
    reveal="left"
    delay={0.3}
    className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-gradient-to-b from-emerald-500/8 to-teal-500/5 border-2 border-emerald-500/15 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-card))]/80 to-transparent" />
    <div className="relative z-10 h-full flex flex-col">
      <div className="w-14 h-14 bg-emerald-500/15 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
        <Image size={28} className="text-emerald-400/70" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 flex gap-2">
        {IMAGE_THUMBNAIL_CLASSES.map((thumbnailClassName, index) => (
          <div key={index} className={`w-12 h-12 rounded-lg border ${thumbnailClassName}`} />
        ))}
      </div>
    </div>
  </BentoCard>
);
