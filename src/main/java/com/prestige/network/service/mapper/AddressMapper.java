package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.AddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {

    @Mapping(source = "customer.id", target = "customerId")
    AddressDTO toDto(Address address);

    @Mapping(source = "customerId", target = "customer")
    Address toEntity(AddressDTO addressDTO);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}
