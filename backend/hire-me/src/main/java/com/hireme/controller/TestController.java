package com.hireme.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

  @GetMapping("/api/test")
  public String test() {
    var auth = SecurityContextHolder.getContext().getAuthentication();
    return "Authenticated as: " + auth.getPrincipal();
  }
}
