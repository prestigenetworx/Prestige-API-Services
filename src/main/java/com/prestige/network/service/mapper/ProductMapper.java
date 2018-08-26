package com.prestige.network.service.mapper;

import com.prestige.network.domain.*;
import com.prestige.network.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {MetadataMapper.class, CurrencyMapper.class, BusinessMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "metadata.id", target = "metadataId")
    @Mapping(source = "currency.id", target = "currencyId")
    @Mapping(source = "business.id", target = "businessId")
    ProductDTO toDto(Product product);

    @Mapping(source = "metadataId", target = "metadata")
    @Mapping(source = "currencyId", target = "currency")
    @Mapping(source = "businessId", target = "business")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
