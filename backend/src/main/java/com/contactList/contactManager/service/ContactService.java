package com.contactList.contactManager.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.contactList.contactManager.DTO.ContactDTO;
import com.contactList.contactManager.DTO.IndicadoresDTO;
import com.contactList.contactManager.exception.DuplicateCellphoneException;
import com.contactList.contactManager.mapper.ContactMapper;
import com.contactList.contactManager.model.ContactModel;
import com.contactList.contactManager.repository.ContactRepository;

@Service
public class ContactService {
    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public List<ContactDTO> getAllContacts() {
        return repository.findAll()
                .stream()
                .map(ContactMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ContactDTO findById(Long id) {
        ContactModel contact = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado com id: " + id));
        return ContactMapper.toDTO(contact);
    }

    public ContactDTO createContact(ContactDTO dto) {
        try {
            repository.findByCellphone(dto.getCellphone())
                    .ifPresent(c -> {
                        throw new DuplicateCellphoneException(
                                "Já existe um contato com esse número de celular: " + dto.getCellphone());
                    });

            ContactModel contact = ContactMapper.toEntity(dto);
            return ContactMapper.toDTO(repository.save(contact));
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar o contato: " + e.getMessage());
        }
    }

    public ContactDTO updateContact(Long id, ContactDTO dto) {
        try {
            ContactModel contact = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Contato não encontrado com ID: " + id));

            contact.setName(dto.getName());
            contact.setEmail(dto.getEmail());
            contact.setCellphone(dto.getCellphone());
            contact.setTelephone(dto.getTelephone());
            contact.setFavorite(dto.isFavorite());
            contact.setActive(dto.isActive());

            return ContactMapper.toDTO(repository.save(contact));
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar contato: " + e.getMessage());
        }
    }

    public void deactivateContact(Long id) {
        ContactModel contact = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado com ID: " + id));

        contact.setActive(false);
        repository.save(contact);
    }

    public IndicadoresDTO getIndicadores() {
        try {
            System.out.println("Carregando indicadores...");
            IndicadoresDTO dto = new IndicadoresDTO();

            dto.setTotalContatos(repository.countAllContacts());
            dto.setTotalFavoritos(repository.countFavoritos());
            dto.setTotalInativos(repository.countInativos());

            Map<String, Long> contatosPorMes = new LinkedHashMap<>();
            for (Object[] row : repository.countContatosPorMes()) {
                contatosPorMes.put((String) row[0], (Long) row[1]);
            }
            dto.setContatosPorMes(contatosPorMes);

            Map<String, Long> ativosInativos = new HashMap<>();
            for (Object[] row : repository.countAtivosInativos()) {
                String activeChar = (String) row[0];
                ativosInativos.put("S".equalsIgnoreCase(activeChar) ? "Ativos" : "Inativos", (Long) row[1]);
            }
            dto.setAtivosInativos(ativosInativos);

            return dto;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao gerar indicadores", e);
        }
    }

}
