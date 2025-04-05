package com.contactList.contactManager.mapper;

import com.contactList.contactManager.DTO.ContactDTO;
import com.contactList.contactManager.model.ContactModel;

public class ContactMapper {

    public static ContactDTO toDTO(ContactModel contact) {
        ContactDTO dto = new ContactDTO();
        dto.setId(contact.getId());
        dto.setName(contact.getName());
        dto.setEmail(contact.getEmail());
        dto.setCellphone(contact.getCellphone());
        dto.setTelephone(contact.getTelephone());
        dto.setFavorite(contact.isFavorite());
        dto.setActive(contact.isActive());
        dto.setCreatedAt(contact.getCreatedAt());

        return dto;

    }

    public static ContactModel toEntity(ContactDTO dto) {
        ContactModel contact = new ContactModel();
        if (dto.getId() != null && dto.getId() > 0) {
            contact.setId(dto.getId());
        }

        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setCellphone(dto.getCellphone());
        contact.setTelephone(dto.getTelephone());
        contact.setFavorite(dto.isFavorite());
        contact.setActive(dto.isActive());
        return contact;
    }

}
