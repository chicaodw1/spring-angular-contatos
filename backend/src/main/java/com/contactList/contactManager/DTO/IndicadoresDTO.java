package com.contactList.contactManager.DTO;

import java.util.Map;

import lombok.Data;

@Data
public class IndicadoresDTO {
    private long totalContatos;
    private long totalFavoritos;
    private long totalInativos;
    private Map<String, Long> contatosPorMes;
    private Map<String, Long> ativosInativos;
}
