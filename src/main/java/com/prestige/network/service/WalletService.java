package com.prestige.network.service;

import com.prestige.network.domain.User;
import com.prestige.network.domain.Wallet;
import com.prestige.network.repository.WalletRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Wallet.
 */
@Service
@Transactional
public class WalletService {

    private final Logger log = LoggerFactory.getLogger(WalletService.class);

    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    /**
     * Save a wallet.
     *
     * @param wallet the entity to save
     * @return the persisted entity
     */
    public Wallet save(Wallet wallet) {
        log.debug("Request to save Wallet : {}", wallet);        return walletRepository.save(wallet);
    }

    /**
     * Get all the wallets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Wallet> findAll(Pageable pageable) {
        log.debug("Request to get all Wallets");
        return walletRepository.findAll(pageable);
    }

    /**
     * devuelve todos los wallets para el usuario logeado.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Wallet> findAllById(User user, Pageable pageable) {
        log.debug("Request to get all Wallets with User login");
        return walletRepository.findByUserOrderById(user,pageable);
    }

    /**
     * return a wallet from user and address(NEO).
     *
     * @param user and address
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Wallet> findOnebyUserAndAdress(User user, String address) {
        log.debug("Request to get one Wallet with User and address(NEO)");
        return walletRepository.findByUserAndAddress(user,address);
    }

    /**
     * Get one wallet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Wallet> findOne(Long id) {
        log.debug("Request to get Wallet : {}", id);
        return walletRepository.findById(id);
    }

    /**
     * Delete the wallet by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Wallet : {}", id);
        walletRepository.deleteById(id);
    }
}
