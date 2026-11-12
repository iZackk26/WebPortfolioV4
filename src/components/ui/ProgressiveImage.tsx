import { CSSProperties, ImgHTMLAttributes, useMemo, useState } from 'react';
import { isSlowConnection } from '../../utils/connection';

interface ProgressiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  src: string;
  /** Miniatura incrustada (LQIP) que se ve mientras baja la imagen */
  placeholder?: string;
  /** Versión liviana para ahorro de datos o red lenta; si no hay, usa src */
  lowSrc?: string;
}

/**
 * Imagen progresiva: la miniatura borrosa va de fondo de la propia <img> (se ve al
 * instante, sin envoltorio que cambie el layout) y la real la cubre al decodificarse.
 * Con red lenta o ahorro de datos pide solo la versión liviana.
 */
export const ProgressiveImage = ({ src, srcSet, sizes, placeholder, lowSrc, className = '', style, onLoad, ...img }: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const slow = useMemo(isSlowConnection, []);
  const light = slow && lowSrc;

  const placeholderStyle: CSSProperties | undefined =
    placeholder && !loaded ? { backgroundImage: `url(${placeholder})`, ...style } : style;

  return (
    <img
      {...img}
      src={light ? lowSrc : src}
      srcSet={light ? undefined : srcSet}
      sizes={light ? undefined : sizes}
      className={`pimg ${loaded ? 'is-loaded' : ''} ${className}`}
      style={placeholderStyle}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
};
