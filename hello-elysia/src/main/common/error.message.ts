export const elysiaErrorMessage = (code: string) => {
  switch (code) {
    case "UNKNOWN":
      return "Unknown";
    case "VALIDATION":
      return "Validation";
    case "NOT_FOUND":
      return "Route not found.";
    case "PARSE":
      return "Parser";
    case "INTERNAL_SERVER_ERROR":
      return "Internal server error";
    case "INVALID_COOKIE_SIGNATURE":
      return "Invalid signature";
    default:
      return "default error";
  }
};

export const ErrorMessages = {
  elysiaErrorMessage,
};
