package com.contactList.contactManager.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.contactList.contactManager.DTO.ContactDTO;
import com.contactList.contactManager.DTO.IndicadoresDTO;
import com.contactList.contactManager.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ContactController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private ContactService contactService;

    @Autowired
    private ObjectMapper objectMapper;

    private ContactDTO contato;

    @BeforeEach
    void setUp() {
        contato = new ContactDTO();
        contato.setName("João");
        contato.setEmail("joao@email.com");
        contato.setCellphone("11999999999");
        contato.setTelephone("1133334444");
        contato.setFavorite(true);
        contato.setActive(true);

    }

    private MockHttpServletRequestBuilder getWithAuth(String url) {
        return MockMvcRequestBuilders.get(url)
                .header("Authorization", "Bearer fake-token");
    }

    @Test
    void deveListarContatos() throws Exception {
        when(contactService.getAllContacts()).thenReturn(List.of(contato));

        mockMvc.perform(getWithAuth("/api/contatos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("João"));
    }

    @Test
    void deveBuscarContatoPorId() throws Exception {
        when(contactService.findById(1L)).thenReturn(contato);

        mockMvc.perform(getWithAuth("/api/contatos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("João"));
    }

    @Test
    void deveCadastrarContato() throws Exception {
        when(contactService.createContact(any(ContactDTO.class))).thenReturn(contato);

        mockMvc.perform(post("/api/contatos")
                .header("Authorization", "Bearer fake-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contato)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("joao@email.com"));
    }

    @Test
    void deveAtualizarContato() throws Exception {
        when(contactService.updateContact(Mockito.eq(1L), any(ContactDTO.class))).thenReturn(contato);

        mockMvc.perform(put("/api/contatos/1")
                .header("Authorization", "Bearer fake-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contato)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("João"));
    }

    @Test
    void deveDesativarContato() throws Exception {
        mockMvc.perform(patch("/api/contatos/1/deactivate")
                .header("Authorization", "Bearer fake-token"))
                .andExpect(status().isNoContent());

        verify(contactService).deactivateContact(1L);
    }

    @Test
    void deveRetornarIndicadores() throws Exception {
        IndicadoresDTO indicadores = new IndicadoresDTO();
        indicadores.setTotalContatos(10L);
        indicadores.setTotalFavoritos(4L);
        indicadores.setTotalInativos(2L);
        indicadores.setContatosPorMes(Map.of("2025-01", 3L, "2025-02", 7L));
        indicadores.setAtivosInativos(Map.of("Ativos", 8L, "Inativos", 2L));

        when(contactService.getIndicadores()).thenReturn(indicadores);

        mockMvc.perform(getWithAuth("/api/contatos/indicadores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalContatos").value(10))
                .andExpect(jsonPath("$.totalFavoritos").value(4))
                .andExpect(jsonPath("$.totalInativos").value(2))
                .andExpect(jsonPath("$.contatosPorMes['2025-01']").value(3))
                .andExpect(jsonPath("$.contatosPorMes['2025-02']").value(7))
                .andExpect(jsonPath("$.ativosInativos.Ativos").value(8))
                .andExpect(jsonPath("$.ativosInativos.Inativos").value(2));
    }

}
