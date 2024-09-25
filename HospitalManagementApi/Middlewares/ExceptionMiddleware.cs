using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using HospitalManagementApi.Exceptions;

namespace HospitalManagementApi.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                // Pass the request to the next middleware component in the pipeline
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError($"Something went wrong: {ex}");

                // Handle the exception and return a custom error response
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = (int)HttpStatusCode.InternalServerError;
            var message = "Internal Server Error. Please try again later.";

            if (exception is NotFoundException)
            {
                statusCode = (int)HttpStatusCode.NotFound;
                message = exception.Message;
            }
            else if (exception is ValidationException)
            {
                statusCode = (int)HttpStatusCode.BadRequest;
                message = exception.Message;
            }

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";

            var errorResponse = new ErrorDetails
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            };

            return context.Response.WriteAsync(JsonConvert.SerializeObject(errorResponse));
        }
    }

    // Error details model
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        // Override ToString to display the serialized error message
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}