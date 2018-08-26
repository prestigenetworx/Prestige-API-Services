package com.prestige.network.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.prestige.network.domain.enumeration.SubscriptionType;

/**
 * A PrestigeSubscription.
 */
@Entity
@Table(name = "prestige_subscription")
public class PrestigeSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private SubscriptionType type;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "renewal_date")
    private Instant renewalDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Currency currency;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public PrestigeSubscription description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubscriptionType getType() {
        return type;
    }

    public PrestigeSubscription type(SubscriptionType type) {
        this.type = type;
        return this;
    }

    public void setType(SubscriptionType type) {
        this.type = type;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public PrestigeSubscription startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public PrestigeSubscription endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getRenewalDate() {
        return renewalDate;
    }

    public PrestigeSubscription renewalDate(Instant renewalDate) {
        this.renewalDate = renewalDate;
        return this;
    }

    public void setRenewalDate(Instant renewalDate) {
        this.renewalDate = renewalDate;
    }

    public Currency getCurrency() {
        return currency;
    }

    public PrestigeSubscription currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Customer getCustomer() {
        return customer;
    }

    public PrestigeSubscription customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public PrestigeSubscription product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PrestigeSubscription prestigeSubscription = (PrestigeSubscription) o;
        if (prestigeSubscription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prestigeSubscription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrestigeSubscription{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", renewalDate='" + getRenewalDate() + "'" +
            "}";
    }
}
