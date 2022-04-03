using System.Text;
using BookStoreApp.DAL.Entities;
using BookStoreApp.DAL.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

const string myCorsPolicy = "AllowedCors";

// Add services to the container.
builder.Services.AddServiceCollections();
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<BookContextDb>(s =>
    s.UseSqlServer(builder.Configuration.GetConnectionString("BookConnection")));
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(myCorsPolicy,
        opt =>
            opt.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
});

//JWT Authentication
builder.Services.AddAuthentication(s =>
{
    s.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    s.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(s =>
{
    var secret = Encoding.UTF8.GetBytes(builder.Configuration["jwtTokenConfig:secret"]);
    s.SaveToken = true;
    s.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["jwtTokenConfig:issuer"],
        ValidAudience = builder.Configuration["jwtTokenConfig:audience"],
        IssuerSigningKey = new SymmetricSecurityKey(secret)
    };
});

var app = builder.Build();
//builder.Services.AddServiceCollections();

//Jwt Configuration



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

var context = app.Services.CreateScope().ServiceProvider.GetService<BookContextDb>();
await context?.Database.MigrateAsync()!;

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(myCorsPolicy);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();