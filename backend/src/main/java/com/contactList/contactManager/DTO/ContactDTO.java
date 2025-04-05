package com.contactList.contactManager.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import lombok.Data;

@Data
public class ContactDTO {
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Celular é obrigatório")
    @Pattern(regexp = "\\d{10,11}", message = "Celular deve conter 10 ou 11 dígitos")
    private String cellphone;

    @Pattern(regexp = "\\d{10}", message = "Telefone deve conter 10 dígitos")
    private String telephone;
    private boolean favorite;
    private boolean active;

    private LocalDateTime createdAt;

}
