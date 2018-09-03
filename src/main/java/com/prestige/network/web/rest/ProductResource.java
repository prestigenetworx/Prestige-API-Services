package com.prestige.network.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.prestige.network.web.rest.errors.BadRequestAlertException;
import com.prestige.network.web.rest.util.HeaderUtil;
import com.prestige.network.web.rest.util.PaginationUtil;
import com.prestige.network.service.dto.ProductDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.prestige.network.domain.User;
import com.prestige.network.service.UserService;
import com.prestige.network.service.ProductService;
import com.prestige.network.domain.Product;
import com.prestige.network.service.mapper.ProductMapper;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Product.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    private final ProductService productService;

    @Autowired
    private UserService userService;
    @Autowired
    private ProductMapper productMapper;

    public ProductResource(ProductService productService) {
        this.productService = productService;
    }

    /**
     * POST  /products : Create a new product.
     *
     * @param productDTO the productDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productDTO, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/products")
    @Timed
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) throws URISyntaxException {
        User user = userService.getCurrentUser();
        if(user == null) {
            throw new BadRequestAlertException("Current user doesn't exist", ENTITY_NAME, "noncurrentuser");
        }

        log.debug("REST request to save Product : {}", productDTO);
        if (productDTO.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Product product = new Product();
        Product productDTOtoEntity = productMapper.toEntity(productDTO);

        ProductDTO productEntitytoDTO = productMapper.toDto(product.createProductWithgetCurrentUser(user,productDTOtoEntity));

        ProductDTO result = productService.save(productEntitytoDTO);

        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /products : Updates an existing product.
     *
     * @param productDTO the productDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productDTO,
     * or with status 400 (Bad Request) if the productDTO is not valid,
     * or with status 500 (Internal Server Error) if the productDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/products")
    @Timed
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO) throws URISyntaxException {
        log.debug("REST request to update Product : {}", productDTO);
        if (productDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductDTO result = productService.save(productDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /products : get all the products.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */
    @GetMapping("/products")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProducts(Pageable pageable) {
        log.debug("REST request to get a page of Products");

        User user = userService.getCurrentUser();
        if(user == null) {
            throw new BadRequestAlertException("Current user doesn't exist", ENTITY_NAME, "noncurrentuser");
        }

        Page<ProductDTO> page = productService.findAllById(user,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /products/:id : get the "id" product.
     *
     * @param id the id of the productDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productDTO, or with status 404 (Not Found)
     */
    @GetMapping("/products/{id}")
    @Timed
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<ProductDTO> productDTOaux = productService.findOne(id);

        if (!productDTOaux.isPresent()) {
            log.debug("No product exist");
            throw new BadRequestAlertException("Product doesn't exist", ENTITY_NAME, "nonproductexist");
        }
        Product p = productMapper.toEntity(productDTOaux.get());

        User currentUser = userService.getCurrentUser();
        if(currentUser == null) {
            throw new BadRequestAlertException("Current user doesn't exist", ENTITY_NAME, "noncurrentuser");
        }

        if(!(currentUser.getId()).equals(p.getUser().getId())) {
            throw new BadRequestAlertException("You don't have access to this business", ENTITY_NAME, "productaccess");
        }

        Optional<ProductDTO> productDTO = Optional.of(productMapper.toDto(p));

        return ResponseUtil.wrapOrNotFound(productDTO);
    }

    /**
     * DELETE  /products/:id : delete the "id" product.
     *
     * @param id the id of the productDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/products/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
