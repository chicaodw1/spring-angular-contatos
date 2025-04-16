package com.contactList.contactManager.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "contato", schema = "desafio")
public class ContactModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contato_id")
    private Long id;

    @Column(name = "contato_nome", length = 100)
    private String name;

    @Column(name = "contato_email", length = 255)
    private String email;

    @Column(name = "contato_celular", length = 11, unique = true, nullable = false)
    private String cellphone;

    @Column(name = "contato_telefone", length = 10)
    private String telephone;

    @Column(name = "contato_sn_favorito", length = 1)
    private String favoriteChar;

    @Column(name = "contato_sn_ativo", length = 1)
    private String activeChar;

    @Column(name = "contato_dh_cad", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @jakarta.persistence.Transient
    public boolean isFavorite() {
        return "S".equalsIgnoreCase(favoriteChar);
    }

    public void setFavorite(boolean favorite) {
        this.favoriteChar = favorite ? "S" : "N";
    }

    @jakarta.persistence.Transient
    public boolean isActive() {
        return "S".equalsIgnoreCase(activeChar);
    }

    public void setActive(boolean active) {
        this.activeChar = active ? "S" : "N";
    }

}
