package com.prestige.network.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.prestige.network.domain.enumeration.SubscriptionType;

/**
 * A DTO for the PrestigeSubscription entity.
 */
public class PrestigeSubscriptionDTO implements Serializable {

    private Long id;

    private String description;

    private SubscriptionType type;

    private Instant startDate;

    private Instant endDate;

    private Instant renewalDate;

    private Long currencyId;

    private Long customerId;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubscriptionType getType() {
        return type;
    }

    public void setType(SubscriptionType type) {
        this.type = type;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getRenewalDate() {
        return renewalDate;
    }

    public void setRenewalDate(Instant renewalDate) {
        this.renewalDate = renewalDate;
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

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PrestigeSubscriptionDTO prestigeSubscriptionDTO = (PrestigeSubscriptionDTO) o;
        if (prestigeSubscriptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prestigeSubscriptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrestigeSubscriptionDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", renewalDate='" + getRenewalDate() + "'" +
            ", currency=" + getCurrencyId() +
            ", customer=" + getCustomerId() +
            ", product=" + getProductId() +
            "}";
    }
}
