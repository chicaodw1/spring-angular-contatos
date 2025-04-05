package com.contactList.contactManager.exception;

public class DuplicateCellphoneException extends RuntimeException {

    public DuplicateCellphoneException(String message) {
        super(message);
    }

    public DuplicateCellphoneException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateCellphoneException(Throwable cause) {
        super(cause);
    }

    public DuplicateCellphoneException() {
        super("Número de celular duplicado.");
    }
}
