//Una ronda es una atención a ucn cliente
//por un zombie alimentado por baterías
//SPDX-License-Identifier: GPL-30
pragma solidity ^0.8.0;

import "./ZombieElectrico.sol";

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
    uint   zombie_id;
  }

  Ronda[] public rondas;


//Un zombie es la representación de un colaborador. Un usuario solo puede tener un solo zombie
//Los zombies están definidos en la biblioteca zombie_factory

  //Se crea una ronda sin zombie 
  function _crearRonda(
     string memory _nombre,
     string memory _fono,
     string memory _direccion, 
     string memory _comuna ,
     string memory _descripcion,
     string memory _tipo) private {

     rondas.push( Ronda( _nombre,
                           _fono,
                      _direccion,
                         _comuna,
                    _descripcion,
                           _tipo,
                              0));
  }

  //La ronda la crea el instalador y genera un evento que es entregado a cada colaborador
  //requiere que sea el instalador, no se permite al colaborador-instalador
  function crearRondaConEvento( 
      string memory _nombre,
      string memory _fono,
      string memory _direccion,
      string memory _comuna,
      string memory _descripcion,
      string memory _tipo) public {

      _crearRonda( 
            _nombre, 
            _fono, 
            _direccion, 
            _comuna, 
            _descripcion, 
            _tipo );

     uint len = rondas.length;
     uint id  = len - 1;
     _difundirRonda( id );
  }

  //La ronda se difunde a cada colaborador
  //requiere que sea el instalador o colaborador instalador el que 
  //llame a este evento
  function _difundirRonda(uint _id) private  {
    emit RondaNueva(_id, rondas[_id].nombre, rondas[_id].comuna, rondas[_id].descripcion, rondas[_id].tipo );
  }

  //La ronda se cambia de dueño
  //require que el zombie dueño de la ronda quiera pasarla
  //eso se traduce en que esta funcion solo la puede llamar el dueño
  //del zombie que posee la ronda
  function _pasarRonda(uint _ronda_id, uint _zombie_id) public {
    require( zombieToOwner[rondas[_ronda_id].zombie_id]  == msg.sender);
    rondas[_ronda_id].zombie_id = _zombie_id;
  } 

  //Requiere que el zombie que vaya a recibir la ronda tenga saldo positivo de baterías
  function _tomarRonda(uint _ronda_id, uint _zombie_id) public {
    //require( zombieBateriasCount[rondas[_ronda_id].zombie_id]  > 0 );
    rondas[_ronda_id].zombie_id = _zombie_id; 
    //zombieBateriasCount[rondas[_ronda_id].zombie_id]--;
  }
 
}
