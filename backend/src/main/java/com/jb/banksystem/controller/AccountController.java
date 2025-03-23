package com.jb.banksystem.controller;

import com.jb.banksystem.dto.TransferRequest;
import com.jb.banksystem.entity.Account;
import com.jb.banksystem.entity.Transaction;
import com.jb.banksystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAccountsForCurrentUser(Authentication authentication) {
        // Lấy username từ token JWT
        String username = authentication.getName();

        // Lấy danh sách tài khoản của người dùng
        List<Account> accounts = accountService.getAccountsByUsername(username);

        return ResponseEntity.ok(accounts);
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transferMoney(@RequestBody TransferRequest transferRequest, Authentication authentication) {
        try {
            // Thực hiện chuyển tiền và lưu giao dịch
            Transaction transaction = accountService.transfer(
                    transferRequest.getSourceAccountNumber(),
                    transferRequest.getDestinationAccountNumber(),
                    transferRequest.getAmount(),
                    authentication
            );

            // Trả về thông tin giao dịch
            return ResponseEntity.ok(transaction);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}