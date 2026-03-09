package com.hireme.exception.auth;

public class EmailAlreadyExistsException extends RuntimeException{
  public EmailAlreadyExistsException(String email){
    super("Email Already Exists!" + email);
  }
}
