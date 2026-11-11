
import { authClient } from "@/lib/auth-client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface CreateEventPayload {
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    imageUrl?: string;
}

export interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    imageUrl?: string;
    organizerId: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
}

// Create Event
export async function createEvent(eventData: CreateEventPayload) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
    }

    return result;
}

// Get Events Created By Logged-in User
export async function getMyEvents(): Promise<Event[]> {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${API_URL}/events/my-events`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch your events");
    }

    return result.data;
}

// Update Event
export async function updateEvent(
    eventId: string,
    eventData: Partial<CreateEventPayload>
) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
    }

    return result;
}

// Delete Event
export async function deleteEvent(eventId: string) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to delete event");
    }

    return result;
}

// Join Event
export async function joinEvent(eventId: string) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error("Please login to join this event.");
    }

    const response = await fetch(`${API_URL}/events/${eventId}/join`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to join event");
    }

    return result;
}

// Get Recent Upcoming Events (Home Page - Maximum 6)
export async function getRecentEvents(): Promise<Event[]> {
    const response = await fetch(`${API_URL}/events/recent`, {
        method: "GET",
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load recent events");
    }

    return result.data;
}

// Get All Upcoming Events (Upcoming Events Page - No Limit)
export async function getUpcomingEvents(): Promise<Event[]> {
    const response = await fetch(`${API_URL}/events/upcoming`, {
        method: "GET",
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load upcoming events");
    }

    return result.data;
}
