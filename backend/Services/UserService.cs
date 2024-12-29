using System.Text.Json;
using github_backend.Models;
using Microsoft.Extensions.Options;

namespace github_backend.Services;

public class UserService
{
    private readonly HttpClient _httpClient;
    private readonly string _gitHubToken;

    public UserService(HttpClient httpClient, IOptions<AppConfig> config)
    {
        _httpClient = httpClient;
        _gitHubToken = config.Value.GitHubToken;
    }

    public async Task<User> GetUserInfo(string username)
    {
        Console.WriteLine($"Getting user info for {username}");
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"token {_gitHubToken}");
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "GitHubClientApp");

        var response = await _httpClient.GetAsync($"https://api.github.com/users/{username}");
        if (!response.IsSuccessStatusCode) return null;

        var content = await response.Content.ReadAsStringAsync();
        var user = JsonSerializer.Deserialize<User>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        
        return user;
    }
}
