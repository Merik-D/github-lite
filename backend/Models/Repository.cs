using System.Text.Json.Serialization;

namespace github_backend.Models;

public class Repository
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string Description { get; set; }
    [JsonPropertyName("url")]
    public string Url { get; set; }
    [JsonPropertyName("stargazers_count")]
    public int Stargazers { get; set; }
    [JsonPropertyName("forks_count")]
    public int Forks { get; set; }
    
    public Repository() {}

    public Repository(string name, string description, string url, int stargazers, int forks)
    {
        Name = name;
        Description = description;
        Url = url;
        Stargazers = stargazers;
        Forks = forks;
    }
}
