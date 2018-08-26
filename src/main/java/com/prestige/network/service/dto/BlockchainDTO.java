package com.prestige.network.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Blockchain entity.
 */
public class BlockchainDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String symbol;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BlockchainDTO blockchainDTO = (BlockchainDTO) o;
        if (blockchainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blockchainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlockchainDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", symbol='" + getSymbol() + "'" +
            "}";
    }
}
