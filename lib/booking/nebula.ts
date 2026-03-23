export const NEBULA_BASE_URL = 'https://nebulacrs.hti.app/apollo3/mkangogolfview/#/hotel/370';

export function getNebulaBookingUrl(params?: {
  checkin?: string;
  checkout?: string;
  guests?: number | string;
}): string {
  let url = NEBULA_BASE_URL;
  
  if (params && (params.checkin || params.checkout || params.guests)) {
    const searchParams = new URLSearchParams();
    if (params.checkin) searchParams.append('checkin', params.checkin);
    if (params.checkout) searchParams.append('checkout', params.checkout);
    if (params.guests) searchParams.append('guests', params.guests.toString());
    
    // Apollo 3 uses hash routing, safely append QS based on context or just basic ? for now
    url += '?' + searchParams.toString();
  }
  
  return url;
}
