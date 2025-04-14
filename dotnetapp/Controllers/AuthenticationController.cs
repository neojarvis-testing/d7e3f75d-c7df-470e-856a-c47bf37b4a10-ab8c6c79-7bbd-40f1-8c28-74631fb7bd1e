using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthService _service;
        public AuthenticationController(AuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
  // Call the Registration method and deconstruct the tuple to get the return values
                (int code, string message) = await _service.Registration(user, user.UserRole);

            if (code == 1)
            {
                return Ok(message);
            }
            else
            {
                return BadRequest(message);
            }
        }

         [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
                // ResponseModel response = await _service.Login(loginVM);
                (int code, string tokenOrMessage) = await _service.Login(loginModel);
                if(code == 1)
                {
                    return Ok(tokenOrMessage);
                }
                else
                {
                    return BadRequest(tokenOrMessage);
                }
            // }
            // else
            // {
            //     return BadRequest();
            // }
        }
    }
}


