export interface CalendarEvent {
    id: number;
    title: string;
    date: string; // YYYY-MM-DD
    startTime: string;
    endTime: string;
    color?: string;
    status?: string;
}

export interface CalendarProps {
    events: CalendarEvent[];
    onEventClick?: (id: number) => void;
}
