using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookings();
            return Ok(bookings);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsByUserId(int userId)
        {
            var bookings = await _bookingService.GetBookingsByUserId(userId);
            if (bookings == null)
            {
                return NotFound();
            }
            return Ok(bookings);
        }

        [HttpPost]
        public async Task<ActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.AddBooking(booking);
                if (result)
                {
                    return Ok("Booking added successfully");
                }
                else
                {
                    return BadRequest("Failed to add booking");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{bookingId}")]
        public async Task<ActionResult> UpdateBooking(int bookingId, [FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.UpdateBooking(bookingId, booking);
                if (!result)
                {
                    return NotFound("Cannot find the booking");
                }
                else
                {
                    return Ok("Booking updated successfully");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{bookingId}")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            try
            {
                var result = await _bookingService.DeleteBooking(bookingId);
                if (!result)
                {
                    return NotFound("Cannot find the booking");
                }
                else
                {
                    return Ok("Booking deleted successfully");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
