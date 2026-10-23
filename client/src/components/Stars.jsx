import { Star } from 'lucide-react';
export default function Stars({ size = 14 }) {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => <Star key={i} size={size} className="fill-gold text-gold" />)}
    </div>
  );
}
