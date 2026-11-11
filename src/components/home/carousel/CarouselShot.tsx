import { FeaturedMedia } from '../../../constants/featuredProjects';
import { PhoneMockup } from './PhoneMockup';

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
        <PhoneMockup src={media.front} position="front" />
        <PhoneMockup src={media.back} position="back" />
        {sweep}
      </div>
    );
  }

  return (
    <div className="carousel-shot">
      <img src={media.src} alt={alt} loading="lazy" decoding="async" className={media.fit === 'contain' ? '!object-contain !object-center p-3' : undefined} />
      {sweep}
    </div>
  );
};
