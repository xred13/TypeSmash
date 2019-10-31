using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TypeSmash.Models;

namespace TypeSmash.Controllers
{
    [Route("[controller]")]
    public class HomePageController : Controller
    {

        private readonly ApplicationDbContext appDbContext;

        public HomePageController(ApplicationDbContext context)
        {
            appDbContext = context;
        }

        public bool IsUsernameValid(string username)
        {
            // A valid username must only contain letters and numbers

            // checking if there is a char that isn't either a letter or digit in the string provided
            foreach(char character in username)
            {
                if (!char.IsLetterOrDigit(character)){
                    return false;
                }
            }

            return true;
        }

        public void AddUsernameCookie(string username)
        {
            HttpContext.Response.Cookies.Append("Username", username);
        }

        [HttpPost("[action]/{username}")]
        public async Task<IActionResult> IsUsernameAvailable(string username)
        {

            if (!IsUsernameValid(username))
            {
                return BadRequest(); // invalid username
            }

            var player = await appDbContext.Players.FindAsync(username);

            if (player != null)
            {

                return Ok(false); // username unavailable
            }
            else
            {
                AddUsernameCookie(username);
                return Ok(true); // username available
            }
        }

        [HttpPost("[action]/{username}")]
        public async Task<IActionResult> SubmitUsername(string username)
        {

            var player = await appDbContext.Players.FindAsync(username);

            if (player != null)
            {
                // a player with this username already exists
                return Conflict();
            }
            else
            {
                Player newPlayer = new Player { ID = username };
                await appDbContext.Players.AddAsync(newPlayer);
                await appDbContext.SaveChangesAsync();
                
                return Ok();
            }
        }
    }
}
