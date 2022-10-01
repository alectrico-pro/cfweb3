//Una ronda es una atención a ucn cliente
//por un zombie alimentado por baterías
//SPDX-License-Identifier: GPL-30
pragma solidity ^0.8.0;

import "./ZombieElectrico.sol";
import "hardhat/console.sol";


//Una Ronda es un crédito de Atención para atender una solicitud
contract RondaFactory is ZombieElectrico {

  event RondaNueva (
    uint   id, 
    string nombre, 
    string comuna, 
    string descripcion, 
    string tipo );

  struct Ronda {
    string nombre;
    string fono;
    string direccion;
    string comuna;
    string descripcion;
    string tipo;
  }

  Ronda[] public rondas;

  mapping( uint => address ) public rondaToOwner;
  mapping( uint => address ) public rondaToZombie;
  mapping( address => uint ) public ownerRondaCount;

//Los zombies están definidos en la biblioteca zombie_factory

  function cuantasRondasHay() public view returns (uint) {
     //console.log("En cuantasRondasHay" );
     return rondas.length;
  }

  function getZombieFromRonda( uint _ronda_id ) view public returns (address) {
     //console.log("En getZombieFromRonda id: %d", _ronda_id);
     return rondaToZombie[ _ronda_id ];
  }

  //Se crea una ronda sin zombie 
  function crearRonda(  string memory _nombre,   
	string memory _fono,  
	string memory _direccion, 
	string memory _comuna, 
	string memory _descripcion,  
	string memory _tipo) public {

    //console.log("En crearRonda->  nombre: %s, fono: %d", _nombre, _fono);
    //console.log("direccion: %s, comuna: %s, descripcion: %s", _direccion, _comuna, _descripcion);
    Ronda memory ronda = Ronda( _nombre, 
	_fono, 
	_direccion,  
	_comuna,
	_descripcion, 
	_tipo);
     rondas.push( ronda );
     uint id = rondas.length - 1;
     emit RondaNueva(id,_nombre, _comuna, _descripcion, _tipo);
     rondaToOwner[id] = msg.sender;
     ownerRondaCount[msg.sender]++;
  }



  //La ronda la crea el instalador y genera un evento que es entregado a cada colaborador
  //requiere que sea el instalador, no se permite al colaborador-instalador
  function crearRondaConEvento( string memory _nombre, 
	string memory _fono, 
	string memory _direccion,  
	string memory _comuna,  
	string memory _descripcion,  
	string memory _tipo) public {

   //console.log("En crearRondaConEvento: llama a crearRonda y luego a _difundirRonda");
   crearRonda(
	_nombre,      
	_fono,         
	_direccion,         
	_comuna,        
	_descripcion,      
	_tipo );
     _difundirRonda( rondas.length -1 );

  }

  //La ronda se difunde a cada colaborador
  //requiere que sea el instalador o colaborador instalador el que 
  //llame a este evento
  //Esta emisión debe guardarse en el almacen del worker
  //Para poder recuperar los datos, cuando un zombie quiera tomarlo
  function _difundirRonda(uint _id) private  {
    //console.log("En _difundirRonda _id: %d nombre: %s, fono: %d", _id , rondas[_id].nombre, rondas[_id].fono);
    //console.log("direccion: %s, comuna: %s, descripcion: %s", rondas[_id].direccion, rondas[_id].comuna, rondas[_id].descripcion);
    emit RondaNueva(_id, rondas[_id].nombre, rondas[_id].comuna, rondas[_id].descripcion, rondas[_id].tipo );
  }

  //Requiere que el zombie que vaya a recibir la ronda tenga saldo positivo de baterías
  //Esta función es iniciada por el zombie desde su whatsapp
  //Esto deberá emitiar un evento para que se pueda convertir a Whatsapp y enviar al zombie
  function asignarRondaAZombie(uint _ronda_id, address _zombie_address) public {
    //console.log("En asignarRondaAZombie _ronda_id: %d zombie address: %s", _ronda_id, _zombie_address);
    rondaToZombie[_ronda_id] = _zombie_address;
  }
 
}
