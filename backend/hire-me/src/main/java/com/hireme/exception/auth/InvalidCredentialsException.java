package com.hireme.exception.auth;

public class InvalidCredentialsException extends RuntimeException{
  public InvalidCredentialsException(){
    super("Invalid Credentials!");
  }
}
