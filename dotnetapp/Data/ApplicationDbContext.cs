using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Controllers;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
 
namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
 
        }
 


        public DbSet<Booking> Bookings{get; set;}
        public DbSet<Room> Rooms{get; set;}
        public DbSet<Feedback> Feedbacks{get; set;}
        public DbSet<User> Users{get; set;}     
    }
}