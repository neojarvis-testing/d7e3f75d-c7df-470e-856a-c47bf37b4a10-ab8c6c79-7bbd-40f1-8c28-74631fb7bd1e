using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace dotnetapp.Models
{
    public class ApplicationUser
    {
        [MaxLength(30, ErrorMessage="Maximum Length of the name is 30")]
        public string Name{get; set;}
    }
}