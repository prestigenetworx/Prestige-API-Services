package com.prestige.network.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Charge.
 */
@Entity
@Table(name = "charge")
public class Charge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0L)
    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "jhi_transaction")
    private String transaction;

    @Column(name = "description")
    private String description;

    @Column(name = "address_from")
    private String addressFrom;

    @Column(name = "address_to")
    private String addressTo;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "blockchain_tx")
    private String blockchainTx;

    @OneToOne
    @JoinColumn(unique = true)
    private Metadata metadata;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Currency currency;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public Charge amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getTransaction() {
        return transaction;
    }

    public Charge transaction(String transaction) {
        this.transaction = transaction;
        return this;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public String getDescription() {
        return description;
    }

    public Charge description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddressFrom() {
        return addressFrom;
    }

    public Charge addressFrom(String addressFrom) {
        this.addressFrom = addressFrom;
        return this;
    }

    public void setAddressFrom(String addressFrom) {
        this.addressFrom = addressFrom;
    }

    public String getAddressTo() {
        return addressTo;
    }

    public Charge addressTo(String addressTo) {
        this.addressTo = addressTo;
        return this;
    }

    public void setAddressTo(String addressTo) {
        this.addressTo = addressTo;
    }

    public Boolean isCompleted() {
        return completed;
    }

    public Charge completed(Boolean completed) {
        this.completed = completed;
        return this;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public String getBlockchainTx() {
        return blockchainTx;
    }

    public Charge blockchainTx(String blockchainTx) {
        this.blockchainTx = blockchainTx;
        return this;
    }

    public void setBlockchainTx(String blockchainTx) {
        this.blockchainTx = blockchainTx;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public Charge metadata(Metadata metadata) {
        this.metadata = metadata;
        return this;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Charge currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Charge customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        Charge charge = (Charge) o;
        if (charge.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), charge.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Charge{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", transaction='" + getTransaction() + "'" +
            ", description='" + getDescription() + "'" +
            ", addressFrom='" + getAddressFrom() + "'" +
            ", addressTo='" + getAddressTo() + "'" +
            ", completed='" + isCompleted() + "'" +
            ", blockchainTx='" + getBlockchainTx() + "'" +
            "}";
    }
}
