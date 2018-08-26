package com.prestige.network.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Charge entity.
 */
public class ChargeDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 0L)
    private Long amount;

    private String transaction;

    private String description;

    private String addressFrom;

    private String addressTo;

    private Boolean completed;

    private String blockchainTx;

    private Long metadataId;

    private Long currencyId;

    private Long customerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getTransaction() {
        return transaction;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddressFrom() {
        return addressFrom;
    }

    public void setAddressFrom(String addressFrom) {
        this.addressFrom = addressFrom;
    }

    public String getAddressTo() {
        return addressTo;
    }

    public void setAddressTo(String addressTo) {
        this.addressTo = addressTo;
    }

    public Boolean isCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public String getBlockchainTx() {
        return blockchainTx;
    }

    public void setBlockchainTx(String blockchainTx) {
        this.blockchainTx = blockchainTx;
    }

    public Long getMetadataId() {
        return metadataId;
    }

    public void setMetadataId(Long metadataId) {
        this.metadataId = metadataId;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChargeDTO chargeDTO = (ChargeDTO) o;
        if (chargeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chargeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChargeDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", transaction='" + getTransaction() + "'" +
            ", description='" + getDescription() + "'" +
            ", addressFrom='" + getAddressFrom() + "'" +
            ", addressTo='" + getAddressTo() + "'" +
            ", completed='" + isCompleted() + "'" +
            ", blockchainTx='" + getBlockchainTx() + "'" +
            ", metadata=" + getMetadataId() +
            ", currency=" + getCurrencyId() +
            ", customer=" + getCustomerId() +
            "}";
    }
}
