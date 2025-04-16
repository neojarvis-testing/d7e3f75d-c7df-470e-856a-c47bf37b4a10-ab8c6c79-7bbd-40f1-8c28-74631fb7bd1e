export interface Booking 
{
    Room?: any;
    BookingId?: number;
    UserId: number;
    RoomId: number;
    CheckInDate: string;
    CheckOutDate: string;
    Status: string;
    SpecialRequests?: string;
    BookingPurpose: string;
    AdditionalComments?: string;
}
