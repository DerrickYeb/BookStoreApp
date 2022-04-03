using BookStoreApp.DAL.Abstractions;
using BookStoreApp.DAL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BookStoreApp.DAL.Extensions;

public static class ServicesCollectionExtension
{
    public static IServiceCollection AddServiceCollections(this IServiceCollection services)
    {
        services.AddScoped<IUserAuthenticate, UserAuthenticate>();
        services.AddScoped<IBookService, BookService>();
        return services;                            
    }
}