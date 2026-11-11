interface IconImageProps {
  src: string;
  alt: string;
  size: number;
}

export const IconImage = ({ src, alt, size }: IconImageProps) => (
  <img src={src} alt={alt} width={size} height={size} className="object-contain" />
);
