using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){

        }


        public DbSet<Booking> Bookings{get; set;}
        public DbSet<Room> Rooms{get; set;}
        public DbSet<Feedback> Feedbacks{get; set;}
        public DbSet<User> Users{get; set;}
    }
}