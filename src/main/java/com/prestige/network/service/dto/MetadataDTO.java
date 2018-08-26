package com.prestige.network.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Metadata entity.
 */
public class MetadataDTO implements Serializable {

    private Long id;

    @Lob
    private String metadata;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MetadataDTO metadataDTO = (MetadataDTO) o;
        if (metadataDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), metadataDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MetadataDTO{" +
            "id=" + getId() +
            ", metadata='" + getMetadata() + "'" +
            "}";
    }
}
