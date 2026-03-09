package com.hireme.exception.core;

import com.hireme.exception.auth.EmailAlreadyExistsException;
import com.hireme.exception.auth.InvalidCredentialsException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.stream.Collectors;

@RestControllerAdvice
public class  GlobalExceptionHandler {

  @ExceptionHandler(EmailAlreadyExistsException.class)
  public ResponseEntity<ApiErrorResponse> handleEmailExists(
    EmailAlreadyExistsException ex,
    HttpServletRequest request
  ) {
    return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request);
  }

  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<ApiErrorResponse> handleInvalidCredentials(
    InvalidCredentialsException ex,
    HttpServletRequest request
  ) {
    return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), request);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleValidation(
    MethodArgumentNotValidException ex,
    HttpServletRequest request
  ) {
    String message = ex.getBindingResult()
      .getFieldErrors()
      .stream()
      .map(err -> err.getField() + ": " + err.getDefaultMessage())
      .collect(Collectors.joining(", "));

    return buildResponse(HttpStatus.BAD_REQUEST, message, request);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleGeneric(
    Exception ex,
    HttpServletRequest request
  ) {
    return buildResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Unexpected server error",
      request
    );
  }

  private ResponseEntity<ApiErrorResponse> buildResponse(
    HttpStatus status,
    String message,
    HttpServletRequest request
  ) {
    ApiErrorResponse error = new ApiErrorResponse(
      Instant.now(),
      status.value(),
      status.getReasonPhrase(),
      message,
      request.getRequestURI()
    );

    return ResponseEntity.status(status).body(error);
  }
}
