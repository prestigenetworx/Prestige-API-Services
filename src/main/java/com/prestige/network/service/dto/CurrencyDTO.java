package com.prestige.network.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Currency entity.
 */
public class CurrencyDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String symbol;

    @NotNull
    private String hash;

    private Long blockchainId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Long getBlockchainId() {
        return blockchainId;
    }

    public void setBlockchainId(Long blockchainId) {
        this.blockchainId = blockchainId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CurrencyDTO currencyDTO = (CurrencyDTO) o;
        if (currencyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currencyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CurrencyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", symbol='" + getSymbol() + "'" +
            ", hash='" + getHash() + "'" +
            ", blockchain=" + getBlockchainId() +
            "}";
    }
}
