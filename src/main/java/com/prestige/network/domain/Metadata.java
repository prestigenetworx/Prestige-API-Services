package com.prestige.network.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Metadata.
 */
@Entity
@Table(name = "metadata")
public class Metadata implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "metadata")
    private String metadata;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMetadata() {
        return metadata;
    }

    public Metadata metadata(String metadata) {
        this.metadata = metadata;
        return this;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
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
        Metadata metadata = (Metadata) o;
        if (metadata.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), metadata.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Metadata{" +
            "id=" + getId() +
            ", metadata='" + getMetadata() + "'" +
            "}";
    }
}
