import { FeaturedMedia, SCREEN_SIZES } from '../../../constants/featuredProjects';
import { PhoneMockup } from './PhoneMockup';
import { ProgressiveImage } from '../../ui/ProgressiveImage';

interface CarouselShotProps {
  media: FeaturedMedia;
  alt: string;
  /** Cambia para reproducir el barrido de luz; null = sin barrido */
  flashNonce: number | null;
}

export const CarouselShot = ({ media, alt, flashNonce }: CarouselShotProps) => {
  const sweep = flashNonce !== null && <span key={flashNonce} className="carousel-sweep" aria-hidden="true" />;

  if (media.type === 'phones') {
    return (
      <div className="carousel-shot is-phones" role="img" aria-label={alt}>
        <PhoneMockup src={media.front} placeholder={media.frontPlaceholder} position="front" />
        <PhoneMockup src={media.back} placeholder={media.backPlaceholder} position="back" />
        {sweep}
      </div>
    );
  }

  return (
    <div className="carousel-shot">
      <ProgressiveImage
        src={media.src}
        srcSet={media.srcSet}
        lowSrc={media.lowSrc}
        placeholder={media.placeholder}
        sizes={SCREEN_SIZES}
        alt={alt}
        width={1080}
        height={675}
        loading="lazy"
        decoding="async"
        className={media.fit === 'contain' ? '!object-contain !object-center p-3' : undefined} />
      {sweep}
    </div>
  );
};
