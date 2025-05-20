package com.adopciones.adopcionmascotas.modelos;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@IdClass(ListaDeseoId.class)
@Table(name = "lista_deseo")
public class ListaDeseo {

    @Id
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Id
    @ManyToOne
    @JoinColumn(name = "mascota_id")
    private Mascota mascota;

    @CreationTimestamp
    @Column(updatable = false)
    private Date fechaAgregado;
}
