using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.Middleware
{
  // This middleware catches the API's that specifically throw an Exception. 
  // The other API's that return "NotFound","BadRequest", etc., do not throw an exception. 
  // Therefore, they don't trigger the Catch block of the middleware
  public class ExceptionMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
      _env = env;
      _next = next;
      _logger = logger;
    }


    // Framework needs method 'InvokeAsync' in middleware
    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, ex.Message); //This logs in the .NET console what was passed in argument of throw new Exception("Error Message Here")
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = 500;

        var response = new ProblemDetails
        {
          Status = 500,
          Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
          Title = ex.Message
        };

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);
      }
    }
  }
}