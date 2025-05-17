package com.adopciones.adopcionmascotas.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.adopciones.adopcionmascotas.dtos.UsuarioDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;


@Mapper(componentModel = "spring")
public interface UsuarioMapper {
	
	@Mapping(source = "usuarioId", target = "usuarioId")
    @Mapping(source = "nombre", target = "nombre")
    @Mapping(source = "email", target = "email")
	UsuarioDTO usuarioToUsuarioDTO(Usuario usuario);
	
	Usuario usuarioDTOtoUsuario(UsuarioDTO usuarioDTO); 
	
	List<UsuarioDTO> usuariosToUsuarioDTOs(List<Usuario> usuarios);

}
