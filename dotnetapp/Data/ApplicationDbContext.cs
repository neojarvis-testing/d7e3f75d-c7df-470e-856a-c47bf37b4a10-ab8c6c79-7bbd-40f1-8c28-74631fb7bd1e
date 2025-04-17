using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
<<<<<<< HEAD
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
 
        }
         public DbSet<Booking> Bookings{get; set;}
        public DbSet<Room> Rooms{get; set;}
        public DbSet<Feedback> Feedbacks{get; set;}
        public DbSet<User> Users{get; set;}
=======

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base (options){}
        public DbSet<Room> Rooms{get;set;}
        public DbSet<Booking> Bookings{get;set;}
        public DbSet<Feedback> Feedbacks{get;set;}
        public DbSet<User> Users{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Room)
            .WithMany()
            .HasForeignKey(b => b.RoomId);

        // modelBuilder.Entity<Feedback>()
        //     .HasOne(b => b.User)
        //     .WithOne()
        //     .HasForeignKey(b => b.UserId);
        }
      
>>>>>>> 715581abfb458af0472147e27387db8be61d6c9a
    }
}
