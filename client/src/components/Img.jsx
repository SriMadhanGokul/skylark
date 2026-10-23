import { useState } from 'react';
// Shows a soft placeholder until the real image is added to /public/images
export default function Img({ src, alt = '', className = '', placeholder = 'bg-orange-100/60' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className={`${className} ${placeholder}`} />;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
