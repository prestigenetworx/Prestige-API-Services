package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.ChargeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Charge and its DTO ChargeDTO.
 */
@Mapper(componentModel = "spring", uses = {MetadataMapper.class, CurrencyMapper.class, CustomerMapper.class})
public interface ChargeMapper extends EntityMapper<ChargeDTO, Charge> {

    @Mapping(source = "metadata.id", target = "metadataId")
    @Mapping(source = "currency.id", target = "currencyId")
    @Mapping(source = "customer.id", target = "customerId")
    ChargeDTO toDto(Charge charge);

    @Mapping(source = "metadataId", target = "metadata")
    @Mapping(source = "currencyId", target = "currency")
    @Mapping(source = "customerId", target = "customer")
    Charge toEntity(ChargeDTO chargeDTO);

    default Charge fromId(Long id) {
        if (id == null) {
            return null;
        }
        Charge charge = new Charge();
        charge.setId(id);
        return charge;
    }
}
