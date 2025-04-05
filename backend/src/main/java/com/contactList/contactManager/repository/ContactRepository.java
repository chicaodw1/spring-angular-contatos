package com.contactList.contactManager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.contactList.contactManager.model.ContactModel;

public interface ContactRepository extends JpaRepository<ContactModel, Long> {

    Optional<ContactModel> findByCellphone(String cellphone);

    @Query("SELECT COUNT(c) FROM ContactModel c")
    long countAllContacts();

    @Query("SELECT COUNT(c) FROM ContactModel c WHERE c.favoriteChar = 'S'")
    long countFavoritos();

    @Query("SELECT COUNT(c) FROM ContactModel c WHERE c.activeChar = 'N'")
    long countInativos();

    @Query("SELECT FUNCTION('to_char', c.createdAt, 'YYYY-MM') AS mes, COUNT(c) " +
            "FROM ContactModel c GROUP BY mes ORDER BY mes")
    List<Object[]> countContatosPorMes();

    @Query("SELECT c.activeChar, COUNT(c) FROM ContactModel c GROUP BY c.activeChar")
    List<Object[]> countAtivosInativos();

}
