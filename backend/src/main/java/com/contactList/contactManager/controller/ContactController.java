package com.contactList.contactManager.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contactList.contactManager.DTO.ContactDTO;
import com.contactList.contactManager.DTO.IndicadoresDTO;
import com.contactList.contactManager.service.ContactService;

@RestController
@RequestMapping("/api/contatos")
public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<List<ContactDTO>> getAllContacts(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @PostMapping
    public ResponseEntity<ContactDTO> createContact(@RequestBody ContactDTO dto) {
        return ResponseEntity.ok(contactService.createContact(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDTO> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDTO> updateContact(@PathVariable Long id, @RequestBody ContactDTO dto) {
        return ResponseEntity.ok(contactService.updateContact(id, dto));
    }

    @GetMapping("/indicadores")
    public ResponseEntity<IndicadoresDTO> getIndicadores() {
        return ResponseEntity.ok(contactService.getIndicadores());
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateContact(@PathVariable Long id) {
        contactService.deactivateContact(id);
        return ResponseEntity.noContent().build();
    }

}
