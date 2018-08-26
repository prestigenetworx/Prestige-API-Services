package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.PrestigeSubscriptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PrestigeSubscription and its DTO PrestigeSubscriptionDTO.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class, CustomerMapper.class, ProductMapper.class})
public interface PrestigeSubscriptionMapper extends EntityMapper<PrestigeSubscriptionDTO, PrestigeSubscription> {

    @Mapping(source = "currency.id", target = "currencyId")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "product.id", target = "productId")
    PrestigeSubscriptionDTO toDto(PrestigeSubscription prestigeSubscription);

    @Mapping(source = "currencyId", target = "currency")
    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "productId", target = "product")
    PrestigeSubscription toEntity(PrestigeSubscriptionDTO prestigeSubscriptionDTO);

    default PrestigeSubscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        PrestigeSubscription prestigeSubscription = new PrestigeSubscription();
        prestigeSubscription.setId(id);
        return prestigeSubscription;
    }
}
