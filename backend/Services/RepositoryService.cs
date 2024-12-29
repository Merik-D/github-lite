using System.Text.Json;
using github_backend.Models;
using Microsoft.Extensions.Options;

namespace github_backend.Services;

public class RepositoryService
{
    private readonly HttpClient _httpClient;
    private readonly string _gitHubToken;

    public RepositoryService(HttpClient httpClient, IOptions<AppConfig> config)
    {
        _httpClient = httpClient;
        _gitHubToken = config.Value.GitHubToken;
    }

    public async Task<List<Repository>> GetRepositories(string username)
    {
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"token {_gitHubToken}");
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "GitHubClientApp");

        var response = await _httpClient.GetAsync($"https://api.github.com/users/{username}/repos");
        if (!response.IsSuccessStatusCode) return null;

        var content = await response.Content.ReadAsStringAsync();
        var repos = JsonSerializer.Deserialize<List<Repository>>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        
        return repos;
    }

    public async Task<List<RepositoryItem>> GetRepositorie(string username, string repoName, string path)
    {
        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"token {_gitHubToken}");
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "GitHubClientApp");
        
        var apiPath = string.IsNullOrWhiteSpace(path) ? "" : $"/{path}";
        var response = await _httpClient.GetAsync($"https://api.github.com/repos/{username}/{repoName}/contents{apiPath}");
        
        if (!response.IsSuccessStatusCode) return null;

        var content = await response.Content.ReadAsStringAsync();

        var items = JsonSerializer.Deserialize<List<RepositoryItem>>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return items;
    }
    
}
