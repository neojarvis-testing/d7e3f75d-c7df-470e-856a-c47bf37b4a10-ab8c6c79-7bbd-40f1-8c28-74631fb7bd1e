import { Room } from "./room.model";
import { User } from "./user.model";



export interface Booking 
{
    Room?: Room;
    User?: User;
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
