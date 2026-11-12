interface PostCoverProps {
  src: string;
  /** Vacío en las tarjetas: el título ya describe el enlace y la imagen es decorativa ahí */
  alt?: string;
  priority?: boolean;
}

/** Portada de tarjeta: la imagen como ventana sobre un tablero de puntos */
export const PostCover = ({ src, alt = '', priority = false }: PostCoverProps) => (
  <div className="blog-cover">
    <img
      src={src}
      alt={alt}
      width={1200}
      height={630}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  </div>
);
