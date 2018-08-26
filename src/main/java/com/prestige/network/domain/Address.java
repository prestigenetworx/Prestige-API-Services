package com.prestige.network.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.prestige.network.domain.enumeration.AddressType;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "street_1", nullable = false)
    private String street1;

    @Column(name = "street_2")
    private String street2;

    @Column(name = "zipcode")
    private String zipcode;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private AddressType type;

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

    public String getStreet1() {
        return street1;
    }

    public Address street1(String street1) {
        this.street1 = street1;
        return this;
    }

    public void setStreet1(String street1) {
        this.street1 = street1;
    }

    public String getStreet2() {
        return street2;
    }

    public Address street2(String street2) {
        this.street2 = street2;
        return this;
    }

    public void setStreet2(String street2) {
        this.street2 = street2;
    }

    public String getZipcode() {
        return zipcode;
    }

    public Address zipcode(String zipcode) {
        this.zipcode = zipcode;
        return this;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public Address state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public Address country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public AddressType getType() {
        return type;
    }

    public Address type(AddressType type) {
        this.type = type;
        return this;
    }

    public void setType(AddressType type) {
        this.type = type;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Address customer(Customer customer) {
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
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", street1='" + getStreet1() + "'" +
            ", street2='" + getStreet2() + "'" +
            ", zipcode='" + getZipcode() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
