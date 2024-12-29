using System.Text.Json.Serialization;

namespace github_backend.Models;

public class User
{
    [JsonPropertyName("name")]
    public string Username { get; set; }
    [JsonPropertyName("login")]
    public string Login { get; set; }
    [JsonPropertyName("bio")]
    public string Bio { get; set; }
    [JsonPropertyName("avatar_url")]
    public string AvatarUrl { get; set; }
    [JsonPropertyName("email")]
    public string Email { get; set; }
    [JsonPropertyName("location")]
    public string Location { get; set; }
    [JsonPropertyName("html_url")]
    public string ProfileUrl { get; set; }
    
    public User(){}

    public User(string username, string login, string bio, string avatarUrl, string email, string location, string profileUrl)
    {
        Username = username;
        Login = login;
        Bio = bio;
        AvatarUrl = avatarUrl;
        Email = email;
        Location = location;
        ProfileUrl = profileUrl;
    }
}
