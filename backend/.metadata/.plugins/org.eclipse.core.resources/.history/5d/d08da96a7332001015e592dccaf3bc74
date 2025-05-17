package com.adopciones.adopcionmascotas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.UsuarioDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.servicios.impl.UsuarioServicios;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {
	
	@Autowired
	private UsuarioServicios usuarioServicio;

	// Obtener todos los usuarios (GET)
	@GetMapping("/")
	public ResponseEntity<Response> getAllUsers() {
		Response response = usuarioServicio.getAllUsers();
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Obtener información de un usuario por ID (GET)
	@GetMapping("/{usuarioId}")
	public ResponseEntity<Response> getUserById(@PathVariable String usuarioId) {
		Response response = usuarioServicio.getUserById(usuarioId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Eliminar un usuario por ID (DELETE)
	@DeleteMapping("/{usuarioId}")
	public ResponseEntity<Response> deleteUser(@PathVariable String usuarioId, @AuthenticationPrincipal Usuario currentUser) {
		Response response = usuarioServicio.deleteUser(usuarioId, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Obtener información de un usuario usando el correo electrónico (GET)
	@GetMapping("/me/{email}")
	public ResponseEntity<Response> getMyInfo(@PathVariable String email) {
		Response response = usuarioServicio.getMyInfo(email);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Modificar información de un usuario (PUT)
	@PutMapping("edit/{usuarioId}")
	public ResponseEntity<Response> updateUser(@PathVariable String usuarioId, @Valid @RequestBody UsuarioDTO usuarioDTO) {
		Response response = usuarioServicio.updateUsuario(usuarioId, usuarioDTO); // Asegúrate de implementar este método en
																				// el servicio
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}
}