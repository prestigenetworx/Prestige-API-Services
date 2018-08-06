package com.prestige.network.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.prestige.network.domain.User;
import com.prestige.network.domain.Wallet;
import com.prestige.network.repository.UserRepository;
import com.prestige.network.security.SecurityUtils;
import com.prestige.network.service.CryptUtils;
import com.prestige.network.service.WalletService;
import com.prestige.network.service.dto.UserDTO;
import com.prestige.network.web.rest.errors.BadRequestAlertException;
import com.prestige.network.web.rest.util.HeaderUtil;
import com.prestige.network.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

import com.prestige.network.service.UserService;
/**
 * REST controller for managing Wallet.
 */
@RestController
@RequestMapping("/api")
public class WalletResource {

    private final Logger log = LoggerFactory.getLogger(WalletResource.class);

    private static final String ENTITY_NAME = "wallet";

    private final WalletService walletService;

    @Autowired
    private UserService userService;

    public WalletResource(WalletService walletService) {
        this.walletService = walletService;
    }

    /**
     * POST  /wallets : Create a new wallet.
     *
     * @param wallet the wallet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wallet, or with status 400 (Bad Request) if the wallet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wallets")
    @Timed
    public ResponseEntity<Wallet> createWallet(@RequestBody Wallet w) throws URISyntaxException {
        User user = userService.getCurrentUser();
        if(user == null) {
            throw new BadRequestAlertException("Current user doesn't exist", "wallet", "noncurrentuser");
        }
        Wallet wallet = new Wallet();
        Wallet result = walletService.save(wallet.createWalletfromApi(user,w.getName()));
        return ResponseEntity.created(new URI("/api/wallets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wallets : Updates an existing wallet.
     *
     * @param wallet the wallet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wallet,
     * or with status 400 (Bad Request) if the wallet is not valid,
     * or with status 500 (Internal Server Error) if the wallet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wallets")
    @Timed
    public ResponseEntity<Wallet> updateWallet(@RequestBody Wallet wallet) throws URISyntaxException {
        log.debug("wallet desde update o import : {}",wallet);
        Wallet w = null;
        if(wallet.getId() == null) {
            User user = userService.getCurrentUser();
            if(user == null) {
                throw new BadRequestAlertException("Current user doesn't exist", "wallet", "noncurrentuser");
            }
            w = wallet.importWalletfromApi(user,wallet.getWif(),wallet.getName());
            if(!validateImport(user,w.getAddress())) {
                throw new BadRequestAlertException("Address exist for the user", "wallet", "addressexistforuser");
            }
        }else {
            w = wallet;
        }
        Wallet result = walletService.save(w);

        return ResponseEntity.created(new URI("/api/wallets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wallets : get all the wallets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wallets in body
     */
    @GetMapping("/wallets")
    @Timed
    public ResponseEntity<List<Wallet>> getAllWallets(Pageable pageable) {
        log.debug("REST request to get a page of Wallets");
        //Page<Wallet> page = walletService.findAll(pageable);

        User user = userService.getCurrentUser();
        if(user == null) {
            throw new BadRequestAlertException("Current user doesn't exist", "wallet", "noncurrentuser");
        }
        Page<Wallet> page = walletService.findAllById(user,pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/wallets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /wallets/:id : get the "id" wallet.
     *
     * @param id the id of the wallet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wallet, or with status 404 (Not Found)
     */
    @GetMapping("/wallets/{id}")
    @Timed
    public ResponseEntity<Wallet> getWallet(@PathVariable Long id) {
        log.debug("REST request to get Wallet : {}", id);

        //decrypt public key and public key hash for view wallet
        String key = System.getenv("PASSPHRASE_VALUE");
        Optional<Wallet> walletaux = walletService.findOne(id);

        if (!walletaux.isPresent()) {
            log.debug("No wallet exist");
            throw new BadRequestAlertException("Wallet doesn't exist", "wallet", "nonwalletexist");
        }
        Wallet w = walletaux.get();

        User currentUser = userService.getCurrentUser();
        if(currentUser == null) {
            throw new BadRequestAlertException("Current user doesn't exist", "wallet", "noncurrentuser");
        }

        if(!(currentUser.getId()).equals(w.getUser().getId())) {
            throw new BadRequestAlertException("You don't have access to this wallet", "wallet", "walletaccess");
        }

        w.setPublic_key(CryptUtils.decrypt(w.getPublic_key(), key));
        w.setPublic_key_hash(CryptUtils.decrypt(w.getPublic_key_hash(), key));

        Optional<Wallet> wallet = Optional.of(w);
        return ResponseUtil.wrapOrNotFound(wallet);
    }

    /**
     * DELETE  /wallets/:id : delete the "id" wallet.
     *
     * @param id the id of the wallet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wallets/{id}")
    @Timed
    public ResponseEntity<Void> deleteWallet(@PathVariable Long id) {
        log.debug("REST request to delete Wallet : {}", id);
        walletService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    //Validate that import is unic for user / true: empty
    public boolean validateImport(User user, String address) {
        List<Wallet> l = walletService.findOnebyUserAndAdress(user,address);
        if(l.isEmpty()) {
            return true;
        }
        return false;
    }
}
