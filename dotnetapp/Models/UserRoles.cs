using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class UserRoles
    {
        [Required(ErrorMessage="Admin is required")]
        public string Admin{get; set;}
        [Required(ErrorMessage="User is required")]
        public string User{get; set;}

    }
}