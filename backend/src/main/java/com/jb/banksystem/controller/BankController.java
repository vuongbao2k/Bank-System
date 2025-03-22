package com.jb.banksystem.controller;

import com.jb.banksystem.dto.ReqRes;
import com.jb.banksystem.entity.OurUsers;
import com.jb.banksystem.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class BankController {

    @Autowired
    private BankService bankService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg) {
        ReqRes response = bankService.register(reg);
        if (response.getStatusCode() == 200) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // Trả về 500 nếu có lỗi
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        ReqRes response = bankService.login(req);
        if (response.getStatusCode() == 200) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Trả về 401 nếu login thất bại
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req) {
        System.out.println("Received refresh request with token: " + req.getToken());

        ReqRes response = bankService.refreshToken(req);
        if (response.getStatusCode() == 500) {
            System.out.println("Refresh token is invalid or expired.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // 403 Forbidden nếu token không hợp lệ
        }

        System.out.println("New accessToken: " + response.getToken());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers() {
        ReqRes response = bankService.getAllUsers();
        if (response.getStatusCode() == 403) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // 403 Forbidden nếu không có quyền truy cập
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUserById(@PathVariable Long userId) {
        ReqRes response = bankService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Long userId, @RequestBody OurUsers req) {
        ReqRes response = bankService.updateUser(userId, req);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        ReqRes response = bankService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Long userId) {
        ReqRes response = bankService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
