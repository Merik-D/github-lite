using github_backend.Models;
using github_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace github_backend.Controller;
[ApiController]
[Route("api/[controller]")]
public class UserController:ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }
    [HttpGet("/{username}")]
    public async Task<IActionResult> GetUser(string username)
    {
        User user = await _userService.GetUserInfo(username);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
}
