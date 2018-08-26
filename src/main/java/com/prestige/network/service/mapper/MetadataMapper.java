package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.MetadataDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Metadata and its DTO MetadataDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MetadataMapper extends EntityMapper<MetadataDTO, Metadata> {



    default Metadata fromId(Long id) {
        if (id == null) {
            return null;
        }
        Metadata metadata = new Metadata();
        metadata.setId(id);
        return metadata;
    }
}
