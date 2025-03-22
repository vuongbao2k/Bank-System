package com.jb.banksystem.dto;

import lombok.Data;

@Data
public class TransferRequest {
    private Long sourceAccountId;
    private Long destinationAccountId;
    private Double amount;
}