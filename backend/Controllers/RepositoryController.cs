using github_backend.Models;
using github_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace github_backend.Controller;
[ApiController]
[Route("api/[controller]")]
public class RepositoryController:ControllerBase
{
    private readonly RepositoryService _repositoryService;

    public RepositoryController(RepositoryService repositoryService)
    {
        _repositoryService = repositoryService;
    }

    [HttpGet("/repos/{username}")]
    public async Task<IActionResult> GetAllRepositories(string username)
    {
        List<Repository> repositories = await _repositoryService.GetRepositories(username);
        if (repositories == null)
        {
            return NotFound();
        }
        return Ok(repositories);
    }
    
    [HttpGet("/repo/{username}/{repoName}")]
    public async Task<IActionResult> GetRepositorie(string username, string repoName, [FromQuery] string path = "")
    {
        var contents = await _repositoryService.GetRepositorie(username, repoName, path);
        if (contents == null || !contents.Any())
        {
            return NotFound();
        }
        return Ok(contents);
    }

}
