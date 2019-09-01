using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TypeSmash.SubmitedUsernames;

namespace TypeSmash.Controllers
{
    [Route("[controller]")]
    public class ApiController : Controller
    {
        static HashSet<string> usernamesHashSet;

        public ApiController()
        {
            usernamesHashSet = SubmitedUsernames.SubmitedUsernames.UsernamesHashSet;
        }

        [HttpPost("[action]/{username}")]
        public JsonResult IsUsernameValid(string username)
        {
            Console.WriteLine("-------------------------------------Is it valid? " + username);
            if (usernamesHashSet.Contains(username))
            {
                Console.WriteLine("NO");
                return Json(false);
            }
            else
            {
                Console.WriteLine("YES");
                return Json(true);
            }
        }

        [HttpPost("[action]/{username}")]
        public IActionResult SubmitUsername(string username)
        {
            if (usernamesHashSet.Add(username))
            {
                return Ok();
            }
            else
            {
                return StatusCode(500);
            }
        }
    }
}
