package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.BusinessDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Business and its DTO BusinessDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BusinessMapper extends EntityMapper<BusinessDTO, Business> {



    default Business fromId(Long id) {
        if (id == null) {
            return null;
        }
        Business business = new Business();
        business.setId(id);
        return business;
    }
}
