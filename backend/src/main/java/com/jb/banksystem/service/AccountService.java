package com.jb.banksystem.service;

import com.jb.banksystem.entity.Account;
import com.jb.banksystem.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAccountsByUsername(String username) {
        return accountRepository.findByUserUsername(username);
    }

    public void transfer(String sourceAccountNumber, String destinationAccountNumber, Double amount, Authentication authentication) {
        // Lấy username từ người dùng hiện tại
        String currentUsername = authentication.getName();

        // Lấy tài khoản nguồn dựa trên accountNumber
        Account sourceAccount = accountRepository.findByAccountNumber(sourceAccountNumber)
                .orElseThrow(() -> new RuntimeException("Tài khoản nguồn không tồn tại"));

        // Kiểm tra xem tài khoản nguồn có thuộc về người dùng hiện tại không
        if (!sourceAccount.getUser().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Bạn không có quyền thực hiện giao dịch từ tài khoản này");
        }

        // Lấy tài khoản đích dựa trên accountNumber
        Account destinationAccount = accountRepository.findByAccountNumber(destinationAccountNumber)
                .orElseThrow(() -> new RuntimeException("Tài khoản đích không tồn tại"));

        // Kiểm tra số dư tài khoản nguồn
        if (sourceAccount.getBalance() < amount) {
            throw new RuntimeException("Số dư không đủ để thực hiện giao dịch");
        }

        // Thực hiện chuyển tiền
        sourceAccount.setBalance(sourceAccount.getBalance() - amount);
        destinationAccount.setBalance(destinationAccount.getBalance() + amount);

        // Lưu thay đổi
        accountRepository.save(sourceAccount);
        accountRepository.save(destinationAccount);
    }
}