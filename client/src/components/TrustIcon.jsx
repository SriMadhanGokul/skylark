import { Leaf, Droplet, FlaskConical } from 'lucide-react';
const map = { leaf: Leaf, drop: Droplet, flask: FlaskConical };
export default function TrustIcon({ name, size = 20, className = '' }) {
  const I = map[name];
  return <I size={size} strokeWidth={1.5} className={className} />;
}
