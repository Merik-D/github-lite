﻿using System.Text.Json.Serialization;

namespace github_backend.Models;

public class RepositoryItem
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("path")]
    public string Path { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("size")]
    public long? Size { get; set; }

    [JsonPropertyName("download_url")]
    public string DownloadUrl { get; set; }
    
}
