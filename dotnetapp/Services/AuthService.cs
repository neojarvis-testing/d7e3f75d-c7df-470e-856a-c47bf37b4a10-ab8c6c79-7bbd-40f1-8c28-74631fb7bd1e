
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using dotnetapp.Data;

namespace dotnetapp.Services
{
public class AuthService:IAuthService
{
// private readonly UserManager<ApplicationUser> _userManager;
// private readonly RoleManager<IdentityRole> _roleManager;
private readonly IConfiguration _configuration;
private readonly ApplicationDbContext _context;

public AuthService(IConfiguration configuration,
ApplicationDbContext context)
{
// _userManager = userManager;
// _roleManager = roleManager;
_configuration = configuration;
_context = context;
}

public async Task<(int, string)> Registration(User model, string role)
{
var userExists = _context.Users.FirstOrDefault(u => u.Email == model.Email);
if (userExists != null)
{
return (0, "User already exists");
}

_context.Users.Add(model);
_context.SaveChanges();

return (1, "User Created successfully!");
}
// return Ok("User Created successfully!");

// ApplicationUser user = new ApplicationUser()
// {
// Email = model.Email,
// UserName = model.Email,
// SecurityStamp = Guid.NewGuid().ToString(),
// Name = model.Name
// };

// var result = await _userManager.CreateAsync(user, model.Password);
// if (!result.Succeeded)
// {
// return (0, "User creation failed! Please check user details and try again.");
// }

// if (!await _roleManager.RoleExistsAsync(role))
// {
// await _roleManager.CreateAsync(new IdentityRole(role));
// }

// await _userManager.AddToRoleAsync(user, role);

// return (1, "User created successfully!");
// }



public async Task<(int, string)> Login(LoginModel model)
{
var user =  _context.Users.FirstOrDefault(u => u.Email == model.Email);
if (user == null)
{
return (0, "Invalid email");
}
var result = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.Password==model.Password);
if (result == null)
{
return (0, "Invalid password");
}


    string token = await GenerateToken(user);
    return (1, token);



// var userRoles = await _userManager.GetRolesAsync(user);

// var authClaims = new List<Claim>
// {
// new Claim(ClaimTypes.Name, model.UserName),
// new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
// };

// foreach (var userRole in userRoles)
// {
// authClaims.Add(new Claim(ClaimTypes.Role, userRole));
// }

// var token = GenerateToken(authClaims);

}

//=====================================

// private string GenerateToken(IEnumerable<Claim> claims)
// {
// var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

// var token = new JwtSecurityToken(
// issuer: _configuration["JWT:ValidIssuer"],
// audience: _configuration["JWT:ValidAudience"],
// expires: DateTime.Now.AddHours(3),
// claims: claims,
// signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
// );

// return new JwtSecurityTokenHandler().WriteToken(token);
// }

public async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole)
            };
            
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenDesc = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = credentials,
                Subject = new ClaimsIdentity(claims)
            };
            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDesc);
            return handler.WriteToken(token);
        }

}
}