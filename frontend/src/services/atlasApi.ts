/**
 * Mock service layer for ATLAS.
 *
 * Every function here mimics a future FastAPI endpoint (path noted in the comment).
 * UI code must only ever talk to this module — swapping these bodies for `fetch`
 * calls is the only change required to connect the real backend.
 */
import { activities, bookings, lostFoundItems, restaurants, savedPlaces, trips } from '../data/catalog';
import { destinations, IMAGES } from '../data/destinations';
import {
  Activity,
  Booking,
  ChatMessage,
  Destination,
  LostFoundItem,
  PlannerPreferences,
  Restaurant,
  SavedPlace,
  TripPlan,
  Trip } from
'../types';
import { bookingReference, timeNow, uid } from '../utils/format';

const latency = (ms = 320) => new Promise((resolve) => setTimeout(resolve, ms));

/** GET /destinations */
export async function fetchDestinations(): Promise<Destination[]> {
  await latency();
  return destinations;
}

/** GET /restaurants */
export async function fetchRestaurants(): Promise<Restaurant[]> {
  await latency();
  return restaurants;
}

/** GET /activities */
export async function fetchActivities(): Promise<Activity[]> {
  await latency();
  return activities;
}

/** GET /trips */
export async function fetchTrips(): Promise<Trip[]> {
  await latency();
  return trips;
}

/** GET /bookings */
export async function fetchBookings(): Promise<Booking[]> {
  await latency();
  return bookings;
}

/** GET /lost-found */
export async function fetchLostFound(): Promise<LostFoundItem[]> {
  await latency();
  return lostFoundItems;
}

/** GET /saved-places */
export async function fetchSavedPlaces(): Promise<SavedPlace[]> {
  await latency();
  return savedPlaces;
}

/** POST /bookings */
export async function createBooking(input: {
  title: string;
  type: Booking['type'];
  date: string;
  price: number;
  travelers: number;
  image?: string;
}): Promise<Booking> {
  await latency(900);
  return {
    id: uid('bk'),
    reference: bookingReference(),
    title: input.title,
    type: input.type,
    image: input.image ?? IMAGES.goa,
    date: input.date,
    price: input.price,
    travelers: input.travelers,
    status: 'upcoming'
  };
}

/** POST /plan  — the multi-agent planning pipeline */
export async function generateTripPlan(prefs: PlannerPreferences): Promise<TripPlan> {
  await latency(400);
  const match =
  destinations.find((d) => d.name.toLowerCase().includes(prefs.destination.toLowerCase().trim())) ??
  destinations.find((d) => d.country.toLowerCase().includes(prefs.destination.toLowerCase().trim())) ??
  destinations[4];

  const travellers = Math.max(1, prefs.adults + prefs.children);
  const budget = prefs.budget || 60000;
  const stay = Math.round(budget * 0.34);
  const travel = Math.round(budget * 0.26);
  const food = Math.round(budget * 0.16);
  const acts = Math.round(budget * 0.15);
  const estimatedCost = stay + travel + food + acts;

  const dayTitles = [
  'Arrival & Exploration',
  'Culture & Local Flavours',
  'Nature & Slow Hours',
  'Adventure Day',
  'Hidden Gems',
  'Coast & Sunset',
  'Departure'];


  const start = prefs.startDate ? new Date(prefs.startDate) : new Date();
  const totalDays = Math.min(
    7,
    Math.max(
      3,
      prefs.endDate && prefs.startDate ?
      Math.round(
        (new Date(prefs.endDate).getTime() - new Date(prefs.startDate).getTime()) / 86400000
      ) + 1 :
      match.durationDays
    )
  );

  const days = Array.from({ length: totalDays }).map((_, index) => {
    const date = new Date(start.getTime() + index * 86400000);
    return {
      day: index + 1,
      title: dayTitles[index % dayTitles.length],
      date: date.toISOString().slice(0, 10),
      items:
      index === 0 ?
      [
      { time: '09:00', title: 'Arrival', location: `${match.name} Airport`, duration: '1 hr', cost: 0, rating: 4.4, distanceKm: 0, kind: 'travel' as const },
      { time: '10:30', title: 'Hotel check-in', location: 'Boutique stay, city centre', duration: '45 min', cost: Math.round(stay / totalDays), rating: 4.6, distanceKm: 12.4, kind: 'stay' as const },
      { time: '13:00', title: 'Lunch at a local favourite', location: restaurants[0].name, duration: '1 hr', cost: 900, rating: 4.8, distanceKm: 2.4, kind: 'food' as const },
      { time: '15:00', title: activities[1].name, location: activities[1].location, duration: activities[1].duration, cost: activities[1].price, rating: activities[1].rating, distanceKm: 3.1, kind: 'activity' as const },
      { time: '19:00', title: 'Dinner by the water', location: restaurants[1].name, duration: '1.5 hrs', cost: 650, rating: 4.6, distanceKm: 3.9, kind: 'food' as const }] :

      [
      { time: '08:00', title: 'Breakfast at the stay', location: 'Hotel terrace', duration: '45 min', cost: 350, rating: 4.5, distanceKm: 0, kind: 'food' as const },
      { time: '09:30', title: activities[(index + 2) % activities.length].name, location: activities[(index + 2) % activities.length].location, duration: activities[(index + 2) % activities.length].duration, cost: activities[(index + 2) % activities.length].price, rating: activities[(index + 2) % activities.length].rating, distanceKm: 6.2, kind: 'activity' as const },
      { time: '13:00', title: 'Lunch', location: restaurants[(index + 1) % restaurants.length].name, duration: '1 hr', cost: restaurants[(index + 1) % restaurants.length].pricePerPerson, rating: restaurants[(index + 1) % restaurants.length].rating, distanceKm: 2.8, kind: 'food' as const },
      { time: '16:00', title: activities[(index + 4) % activities.length].name, location: activities[(index + 4) % activities.length].location, duration: activities[(index + 4) % activities.length].duration, cost: activities[(index + 4) % activities.length].price, rating: activities[(index + 4) % activities.length].rating, distanceKm: 4.5, kind: 'activity' as const },
      { time: '19:30', title: 'Dinner', location: restaurants[(index + 3) % restaurants.length].name, duration: '1.5 hrs', cost: restaurants[(index + 3) % restaurants.length].pricePerPerson, rating: restaurants[(index + 3) % restaurants.length].rating, distanceKm: 5.1, kind: 'food' as const }]

    };
  });

  return {
    id: uid('plan'),
    destination: match.name,
    country: match.country,
    image: match.image,
    startDate: prefs.startDate || start.toISOString().slice(0, 10),
    endDate: prefs.endDate || new Date(start.getTime() + (totalDays - 1) * 86400000).toISOString().slice(0, 10),
    travelers: travellers,
    budget,
    estimatedCost,
    breakdown: [
    { label: 'Accommodation', value: stay },
    { label: 'Travel', value: travel },
    { label: 'Food', value: food },
    { label: 'Activities', value: acts }],

    weather: [
    { day: 'Mon', temp: 29, condition: 'Sunny' },
    { day: 'Tue', temp: 28, condition: 'Partly cloudy' },
    { day: 'Wed', temp: 27, condition: 'Light rain' },
    { day: 'Thu', temp: 30, condition: 'Sunny' },
    { day: 'Fri', temp: 29, condition: 'Clear' }],

    reasoning: [
    { title: 'Matches your interests', detail: `${prefs.interests.slice(0, 3).join(', ') || 'Nature, Food'} appear in 8 of the 12 scheduled stops.` },
    { title: 'Fits your budget', detail: `Planned spend is ${Math.round(estimatedCost / budget * 100)}% of your stated budget, leaving a buffer for extras.` },
    { title: 'Highly rated by travellers', detail: 'Every activity holds a 4.5+ rating across more than 400 recent reviews.' },
    { title: 'Close to your accommodation', detail: 'Average travel time between stops is 14 minutes.' },
    { title: 'Lower expected crowd levels', detail: 'Morning slots were chosen where community reports flag afternoon crowding.' },
    { title: 'Suitable for your preferences', detail: `${prefs.accessibility.length ? prefs.accessibility.join(', ') + ' needs were applied.' : 'Pace kept moderate with rest gaps after long transfers.'}` },
    { title: 'Fits the available time', detail: 'The constraint solver kept each day under 9 active hours including travel.' }]

  };
}

/** POST /assistant/message  → POST /api/chat (FastAPI + Gemini) */
export async function sendAssistantMessage(text: string): Promise<ChatMessage> {
  // Base URL from Vite env variable; falls back to localhost:8000 for safety.
  const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8000';
  const endpoint = `${apiUrl}/api/chat`;

  let responseText: string;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
      // Abort after 60 s so the UI never hangs indefinitely
      signal: AbortSignal.timeout(60_000),
    });

    if (!res.ok) {
      // Try to surface a meaningful message from the backend if available
      let detail = `Server responded with status ${res.status}.`;
      try {
        const errorBody = await res.json();
        if (errorBody?.detail) detail = String(errorBody.detail);
      } catch {
        // ignore JSON parse errors — use the default message
      }
      responseText = `Sorry, I ran into a problem: ${detail} Please try again in a moment.`;
    } else {
      const data = await res.json();
      if (typeof data?.response === 'string' && data.response.trim()) {
        responseText = data.response;
      } else {
        responseText = 'I received an unexpected response. Please try again.';
      }
    }
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      responseText = 'The request timed out. The AI is taking longer than usual — please try again.';
    } else if (err instanceof TypeError) {
      // fetch throws TypeError on network failure / CORS / no server
      responseText =
        'Could not reach the ATLAS server. Make sure the backend is running on http://localhost:8000.';
    } else {
      responseText = 'An unexpected error occurred. Please try again.';
    }
  }

  return {
    id: uid('m'),
    role: 'assistant',
    content: responseText,
    time: timeNow(),
  };
}


/** POST /lost-found */
export async function submitLostFound(item: Omit<LostFoundItem, 'id' | 'status'>): Promise<LostFoundItem> {
  await latency(700);
  return { ...item, id: uid('lf'), status: 'Open' };
}