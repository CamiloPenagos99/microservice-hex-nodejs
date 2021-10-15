Feature:Recuperar informaciòn forma de envio

    COMO usuario de una guía de Coordinadora Mercantil que olvidó su código de seguridad
    QUIERO poder solicitar un nuevo código de seguridad por diferentes medios
    PARA acceder al detalle de la guía digital cuando haya olvidado el código inicial.

    Scenario: Solicitar recuperación con correo y celular registrado
        Given Que la guía consultada 73940048072 tiene registrados el correo y el telefono
        When  Solicite la informacion de envio, del rol REMITENTE
        Then  Se debe visualizar las opciones de recuperación, CORREO debe ser igual a camilo.penagos@coordinadora.com y el TELEFONO debe ser igual a 3182443322

    Scenario: Solicitar recuperación con correo registrado
        Given Que la guía consultada 73940048071 tiene registrado el correo
        When  Solicite la informacion de envio, del rol REMITENTE
        Then  Se debe visualizar las opciones de recuperación, CORREO debe ser igual a camilo.penagos@coordinadora.com y el TELEFONO debe ser igual a 0

    Scenario: Solicitar recuperación con celular registrado
        Given Que la guía consultada 73940048077 tiene registrado el celular
        When  Solicite la informacion de envio, del rol REMITENTE
        Then  Se debe visualizar las opciones de recuperación, CORREO debe ser igual a 0 y el TELEFONO debe ser igual a 3182443322