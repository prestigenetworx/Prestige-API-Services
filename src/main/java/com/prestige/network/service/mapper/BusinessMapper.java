package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.BusinessDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Business and its DTO BusinessDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BusinessMapper extends EntityMapper<BusinessDTO, Business> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    BusinessDTO toDto(Business business);

    @Mapping(source = "userId", target = "user")
    Business toEntity(BusinessDTO businessDTO);

    default Business fromId(Long id) {
        if (id == null) {
            return null;
        }
        Business business = new Business();
        business.setId(id);
        return business;
    }
}
