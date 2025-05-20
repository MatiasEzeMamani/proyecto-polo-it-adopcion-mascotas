package com.adopciones.adopcionmascotas.modelos;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "mensajes")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "remitente_id")
    private Usuario remitente;

    @ManyToOne
    @JoinColumn(name = "receptor_id")
    private Usuario receptor;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    @CreationTimestamp
    @Column(updatable = false)
    private Date fecha;
}
