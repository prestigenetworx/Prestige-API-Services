package com.prestige.network.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_value")
    private Long value;

    @Column(name = "active")
    private Boolean active;

    @Lob
    @Column(name = "attributes")
    private String attributes;

    @OneToOne
    @JoinColumn(unique = true)
    private Metadata metadata;

    @OneToOne
    @JoinColumn(unique = true)
    private Currency currency;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Business business;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getValue() {
        return value;
    }

    public Product value(Long value) {
        this.value = value;
        return this;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Boolean isActive() {
        return active;
    }

    public Product active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getAttributes() {
        return attributes;
    }

    public Product attributes(String attributes) {
        this.attributes = attributes;
        return this;
    }

    public void setAttributes(String attributes) {
        this.attributes = attributes;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public Product metadata(Metadata metadata) {
        this.metadata = metadata;
        return this;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Product currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Business getBusiness() {
        return business;
    }

    public Product business(Business business) {
        this.business = business;
        return this;
    }

    public void setBusiness(Business business) {
        this.business = business;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", value=" + getValue() +
            ", active='" + isActive() + "'" +
            ", attributes='" + getAttributes() + "'" +
            "}";
    }
}
