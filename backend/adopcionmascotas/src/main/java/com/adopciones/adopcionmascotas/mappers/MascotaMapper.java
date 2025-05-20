package com.adopciones.adopcionmascotas.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Mascota;

@Mapper(componentModel = "spring", uses = {UsuarioMapper.class})
public interface MascotaMapper {

	MascotaRespuestaDTO mascotaToMascotaRespuestaDTO(Mascota mascota);
	List<MascotaRespuestaDTO> mascotasToMascotaRespuestaDTOs(List<Mascota> mascotas);

	Mascota mascotaRegistroDTOToMascota(MascotaRegistroDTO dto);

	void actualizarMascotaDesdeDTO(MascotaUpdateDTO dto, @MappingTarget Mascota mascota);
}
