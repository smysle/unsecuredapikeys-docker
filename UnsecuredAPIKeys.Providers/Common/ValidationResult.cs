using System.Net;

namespace UnsecuredAPIKeys.Providers.Common
{
    public enum ValidationAttemptStatus
    {
        Valid,                 // Key is valid and working.
        Unauthorized,          // Key is explicitly unauthorized (e.g., HTTP 401).
        HttpError,             // An HTTP error occurred (e.g., 403, 404, 429, 5xx).
        NetworkError,          // A network-level error occurred (e.g., DNS, timeout, connection refused).
        ProviderSpecificError  // An unexpected error within the provider's logic.
    }

    public class ModelInfo
    {
        public string ModelId { get; set; } = string.Empty;
        public string? DisplayName { get; set; }
        public string? Description { get; set; }
        public string? Version { get; set; }
        public long? InputTokenLimit { get; set; }
        public long? OutputTokenLimit { get; set; }
        public List<string>? SupportedMethods { get; set; }
        public float? Temperature { get; set; }
        public float? TopP { get; set; }
        public int? TopK { get; set; }
        public float? MaxTemperature { get; set; }
        public string? ModelGroup { get; set; } // For grouping similar models
    }

    public class ValidationResult
    {
        public ValidationAttemptStatus Status { get; set; }
        public HttpStatusCode? HttpStatusCode { get; set; } // Null if not an HTTP-related error.
        public string? Detail { get; set; } = string.Empty; // Optional error message or detail.
        
        // Model information discovered during validation
        public List<ModelInfo>? AvailableModels { get; set; }

        // Helper factory methods for convenience
        public static ValidationResult Success(HttpStatusCode statusCode, List<ModelInfo>? models = null) =>
            new() { Status = ValidationAttemptStatus.Valid, HttpStatusCode = statusCode, AvailableModels = models };

        public static ValidationResult IsUnauthorized(HttpStatusCode statusCode, string? detail = null) =>
            new() { Status = ValidationAttemptStatus.Unauthorized, HttpStatusCode = statusCode, Detail = detail };

        public static ValidationResult HasHttpError(HttpStatusCode statusCode, string? detail = null) =>
            new() { Status = ValidationAttemptStatus.HttpError, HttpStatusCode = statusCode, Detail = detail };

        public static ValidationResult HasNetworkError(string detail) =>
            new() { Status = ValidationAttemptStatus.NetworkError, Detail = detail };
        
        public static ValidationResult HasProviderSpecificError(string detail) =>
            new() { Status = ValidationAttemptStatus.ProviderSpecificError, Detail = detail };
    }
}
