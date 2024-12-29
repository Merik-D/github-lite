using DotNetEnv;
using github_backend;
using github_backend.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

Env.Load();
var githubToken = Environment.GetEnvironmentVariable("GITHUB_TOKEN");

builder.Services.Configure<AppConfig>(options =>
{
    options.GitHubToken = githubToken;
});

builder.Services.AddHttpClient<UserService>();
builder.Services.AddHttpClient<RepositoryService>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
