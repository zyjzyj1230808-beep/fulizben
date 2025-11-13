import { redirect } from 'next/navigation';

export default function BrokersLegacyRedirect() {
  // Redirect legacy partners/brokers URL to current strategic partner page
  redirect('../magic-university');
}


