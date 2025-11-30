import { api } from './api';

export type EventCategory = 'cultural' | 'sports' | 'academic' | 'social' | 'other';

export interface Event {
  id?: number;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  registrationFormUrl?: string;
  photoGalleryUrl?: string;
  category?: EventCategory;
  location?: string;
  maxParticipants?: number;
  currentParticipants?: number;
}

export interface CreateEventRequest {
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  registrationFormUrl?: string;
  photoGalleryUrl?: string;
  category?: EventCategory;
  location?: string;
  maxParticipants?: number;
}

class EventService {
  async getEvents(): Promise<Event[]> {
    const response = await api.get<Event[]>('/events');
    return response.data;
  }

  async getEvent(id: number): Promise<Event> {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  }

  async createEvent(eventData: CreateEventRequest): Promise<string> {
    const response = await api.post<string>('/events', eventData);
    return response.data;
  }

  async updateEvent(id: number, eventData: Partial<Event>): Promise<string> {
    const response = await api.put<string>(`/events/${id}`, eventData);
    return response.data;
  }

  async deleteEvent(id: number): Promise<string> {
    const response = await api.delete<string>(`/events/${id}`);
    return response.data;
  }
}

export const eventService = new EventService();
