package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.CurrencyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Currency and its DTO CurrencyDTO.
 */
@Mapper(componentModel = "spring", uses = {BlockchainMapper.class})
public interface CurrencyMapper extends EntityMapper<CurrencyDTO, Currency> {

    @Mapping(source = "blockchain.id", target = "blockchainId")
    CurrencyDTO toDto(Currency currency);

    @Mapping(source = "blockchainId", target = "blockchain")
    Currency toEntity(CurrencyDTO currencyDTO);

    default Currency fromId(Long id) {
        if (id == null) {
            return null;
        }
        Currency currency = new Currency();
        currency.setId(id);
        return currency;
    }
}
