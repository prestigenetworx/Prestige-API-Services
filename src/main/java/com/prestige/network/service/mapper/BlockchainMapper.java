package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.BlockchainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Blockchain and its DTO BlockchainDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BlockchainMapper extends EntityMapper<BlockchainDTO, Blockchain> {



    default Blockchain fromId(Long id) {
        if (id == null) {
            return null;
        }
        Blockchain blockchain = new Blockchain();
        blockchain.setId(id);
        return blockchain;
    }
}
