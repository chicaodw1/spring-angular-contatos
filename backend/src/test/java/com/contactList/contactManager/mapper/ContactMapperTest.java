package com.contactList.contactManager.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.contactList.contactManager.DTO.ContactDTO;
import com.contactList.contactManager.model.ContactModel;

@DisplayName("Testes de mapeamento entre Contact e ContactDTO")
public class ContactMapperTest {
    @Test
    @DisplayName("Deve converter entidade Contact em ContactDTO corretamente")
    void testToDTO() {
        ContactModel contact = new ContactModel();
        contact.setId(1L);
        contact.setName("João Silva");
        contact.setEmail("joao@email.com");
        contact.setCellphone("11999999999");
        contact.setTelephone("1133334444");
        contact.setFavorite(true);
        contact.setActive(true);

        ContactDTO dto = ContactMapper.toDTO(contact);

        assertNotNull(dto);
        assertEquals("João Silva", dto.getName());
        assertEquals("joao@email.com", dto.getEmail());
        assertEquals("11999999999", dto.getCellphone());
        assertEquals("1133334444", dto.getTelephone());
        assertTrue(dto.isFavorite());
        assertTrue(dto.isActive());
    }

    @Test
    @DisplayName("Deve converter ContactDTO em entidade Contact corretamente")
    void testToEntity() {
        ContactDTO dto = new ContactDTO();
        dto.setName("Maria Lima");
        dto.setEmail("maria@email.com");
        dto.setCellphone("21988887777");
        dto.setTelephone("2133332222");
        dto.setFavorite(false);
        dto.setActive(true);

        ContactModel contact = ContactMapper.toEntity(dto);

        assertNotNull(contact);
        assertEquals("Maria Lima", contact.getName());
        assertEquals("maria@email.com", contact.getEmail());
        assertEquals("21988887777", contact.getCellphone());
        assertEquals("2133332222", contact.getTelephone());
        assertFalse(contact.isFavorite());
        assertTrue(contact.isActive());
    }
}
