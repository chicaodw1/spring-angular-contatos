package com.contactList.contactManager.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.contactList.contactManager.DTO.ContactDTO;
import com.contactList.contactManager.DTO.IndicadoresDTO;
import com.contactList.contactManager.mapper.ContactMapper;
import com.contactList.contactManager.model.ContactModel;
import com.contactList.contactManager.repository.ContactRepository;

public class ContactServiceTest {
    @InjectMocks
    private ContactService contactService;

    @Mock
    private ContactRepository contactRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        ContactModel contact = new ContactModel();
        contact.setName("João");
        contact.setEmail("joao@email.com");
        contact.setActive(true);

        when(contactRepository.findAll()).thenReturn(List.of(contact));

        List<ContactDTO> result = contactService.getAllContacts();

        assertEquals(1, result.size());
        assertEquals("João", result.get(0).getName());
    }

    @Test
    void testFindById() {
        ContactModel contact = new ContactModel();
        contact.setId(1L);
        contact.setName("Maria");

        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        ContactDTO dto = contactService.findById(1L);

        assertEquals("Maria", dto.getName());
    }

    @Test
    void testCreate() {
        ContactDTO dto = new ContactDTO();
        dto.setName("Carlos");

        ContactModel entity = ContactMapper.toEntity(dto);
        entity.setId(1L);

        when(contactRepository.save(any(ContactModel.class))).thenReturn(entity);

        ContactDTO savedDto = contactService.createContact(dto);

        assertNotNull(savedDto);
        assertEquals("Carlos", savedDto.getName());
    }

    @Test
    void testUpdate() {
        ContactDTO dto = new ContactDTO();
        dto.setName("Atualizado");

        ContactModel existing = new ContactModel();
        existing.setId(1L);
        existing.setName("Antigo");

        when(contactRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(contactRepository.save(any(ContactModel.class))).thenReturn(existing);

        ContactDTO updatedDto = contactService.updateContact(1L, dto);

        assertEquals("Atualizado", updatedDto.getName());
    }

    @Test
    void testDeactivate() {
        ContactModel contact = new ContactModel();
        contact.setId(1L);
        contact.setActive(true);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        contactService.deactivateContact(1L);

        assertFalse(contact.isActive());
        verify(contactRepository).save(contact);
    }

    @Test
    void testNaoDeveCadastrarContatoComCelularExistente() {
        ContactDTO dto = new ContactDTO();
        dto.setCellphone("11999999999");

        ContactModel existente = new ContactModel();
        existente.setCellphone("11999999999");

        when(contactRepository.findByCellphone("11999999999")).thenReturn(Optional.of(existente));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            contactService.createContact(dto);
        });

        assertEquals("Erro ao criar o contato: Já existe um contato com esse número de celular: " + dto.getCellphone(),
                exception.getMessage());

    }

    @Test
    void testGetIndicadores() {
        when(contactRepository.countAllContacts()).thenReturn(10L);
        when(contactRepository.countFavoritos()).thenReturn(4L);
        when(contactRepository.countInativos()).thenReturn(2L);

        List<Object[]> contatosPorMes = List.of(
                new Object[] { "2025-01", 3L },
                new Object[] { "2025-02", 7L });
        when(contactRepository.countContatosPorMes()).thenReturn(contatosPorMes);

        List<Object[]> ativosInativos = List.of(
                new Object[] { "S", 8L },
                new Object[] { "N", 2L });

        when(contactRepository.countAtivosInativos()).thenReturn(ativosInativos);

        IndicadoresDTO dto = contactService.getIndicadores();

        assertEquals(10L, dto.getTotalContatos());
        assertEquals(4L, dto.getTotalFavoritos());
        assertEquals(2L, dto.getTotalInativos());

        assertEquals(2, dto.getContatosPorMes().size());
        assertEquals(3L, dto.getContatosPorMes().get("2025-01"));
        assertEquals(7L, dto.getContatosPorMes().get("2025-02"));

        assertEquals(2, dto.getAtivosInativos().size());
        assertEquals(8L, dto.getAtivosInativos().get("Ativos"));
        assertEquals(2L, dto.getAtivosInativos().get("Inativos"));
    }

}
