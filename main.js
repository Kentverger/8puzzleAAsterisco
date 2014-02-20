var fs = require("fs");
var util = require('util');

/**
*
*    Objeto nodo con las propiedades de costo y piezas mal colocadas
*
**/

function Nodo(nodo){
	this.nodo = nodo;
	this.piezasMalColocadas = 0;
	this.nivel = 0;
	this.movimiento = "N";
	this.fn = 0;
}

Nodo.prototype.obtenPiezasMalColocadas = function(){
	return this.piezasMalColocadas;
}

Nodo.prototype.obtenNivel = function(){
	return this.nivel;
}

Nodo.prototype.obtenNodo = function(){
	return this.nodo;
}

Nodo.prototype.obtenFn = function(){
	return this.piezasMalColocadas + this.nivel;
}		

Nodo.prototype.obtenMovimiento = function(){
	return this.movimiento;
}

Nodo.prototype.ponPiezasMalColocadas = function(piezas){
	this.piezasMalColocadas = piezas;
}

Nodo.prototype.ponNivel = function(nivel){
	this.nivel = nivel;
}

Nodo.prototype.ponNodo = function(nodo){
	this.nodo = nodo;
}
Nodo.prototype.ponMov = function(mov){
	this.movimiento = mov;
}
Nodo.prototype.ponFn = function(fn){
	this.fn = fn;
}
/**
*
*   Fin del objeto
*
**/

// Funcion que cola un nodo ( Maldito javascript extraño :S )
function clone(existingArray){
	var newObj = (existingArray instanceof Array) ? []:{};
	for(i in existingArray){
		if(i == 'clone') continue;
		if(existingArray[i] && typeof existingArray[i] == "object"){
			newObj[i] = clone(existingArray[i]);
		}else{
			newObj[i] = existingArray[i];
		}
	}
	return newObj;
}

//Regresa el numero de piezas mal colocadas
function numeroDePiezasMalColocadas(nodo1, nodo2){
	var contador = 0;
	for(x in nodo1){
		for(y in nodo1[x]){
			x = parseInt(x);
			y = parseInt(y);

			if(nodo1[x][y] != nodo2[x][y]){
				contador++;
			}
		}
	}
	return contador;
}
// Compara si dos nodos son iguales
function compraraNodos(nodo1, nodo2){
	for(x in nodo1){
		for(y in nodo1[x]){
			x = parseInt(x);
			y = parseInt(y);

			if(nodo1[x][y] != nodo2[x][y]){
				return false;
			}
		}
	}
	return true;
}

fs.readFile(__dirname+"/entrada", "utf8", function(err, data){
	if(err){
		console.log(err.message);
		process.exit(1);
	}

	/*
	* Inicializa las variables
	*/
	dataArray = data.split('');
	var raiz = [[dataArray[0],dataArray[1],dataArray[2]],[dataArray[3],dataArray[4],dataArray[5]],[dataArray[6],dataArray[7],dataArray[8]]];

	var meta = [[1, 2, 3],[4, 5, 6],[7, 8, 0]];

	var nodosHijo = [];
	var pasos = [];

	var nodoInicial = new Nodo(raiz);
	var nodoMeta = new Nodo(meta);

	var nivel = parseInt(0);

	var contador = parseInt(0);

	nodosHijo.push(nodoInicial);

	function compare(a,b) {
		if (a.fn < b.fn)
	    	return -1;
	  	if (a.fn > b.fn)
	    	return 1;
	 	return 0;
	}

	// Funcion que expande los nodos hijo
	function expandirNodos(nodo, nivel){

		//console.log(nodo);

		//Busca en todo el arreglo el 0
		for(x in nodo){
			for(y in nodo[x]){
				if(nodo[x][y] == 0){
					var i = parseInt(x);
					var j = parseInt(y);

					if(i-1>=0){

						var copia = clone(nodo);

						tmp1 = copia[i-1][j];
						copia[i-1][j] = copia[i][j];
						copia[i][j] = tmp1;

						var node = new Nodo(copia);
						node.ponNivel(nivel+1);
						node.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node.obtenNodo()));
						node.ponMov("U");
						node.ponFn(node.obtenFn());

						nodosHijo.push(node);
					}
					if(i+1<=2){

						var copia2 = clone(nodo);

						tmp2 = copia2[i+1][j];
						copia2[i+1][j] = copia2[i][j];
						copia2[i][j] = tmp2;

						var node2 = new Nodo(copia2);
						node2.ponNivel(nivel+1);
						node2.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node2.obtenNodo()));
						node2.ponMov("D");
						node2.ponFn(node2.obtenFn());

						nodosHijo.push(node2);
					}
					if(j-1>=0){

						var copia3 = clone(nodo);

						tmp3 = copia3[i][j-1];
						copia3[i][j-1] = copia3[i][j];
						copia3[i][j] = tmp3;

						var node3 = new Nodo(copia3);

						node3.ponNivel(nivel+1);
						node3.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node3.obtenNodo()));
						node3.ponMov("L");
						node3.ponFn(node3.obtenFn());

						nodosHijo.push(node3);
					}
					if(j+1<=2){
						var copia4 = clone(nodo);

						tmp4 = copia4[i][j+1];
						copia4[i][j+1] = copia4[i][j];
						copia4[i][j] = tmp4;

						var node4 = new Nodo(copia4);
						node4.ponNivel(nivel+1);
						node4.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node4.obtenNodo()));
						node4.ponMov("R");
						node4.ponFn(node4.obtenFn());

						nodosHijo.push(node4);

					}
				}
			}
		}

		if(compraraNodos(nodoMeta.obtenNodo(), nodosHijo[0].obtenNodo())){
			//Número de esquinas por el numero de casillas que pueden desplazar
			var esquina = 4*2;
			//Número de lados por el numero de casillas que pueden desplazar
			var lado = 4*3;
			//Casilla central por las casillas que puede desplazar
			var centro = 1*4;
			//factor de ramificación
			var factor = (parseInt(esquina)+parseInt(lado)+parseInt(centro))/8;//número de casillas que se desplazan.
			console.log("Pasos: " + nodosHijo[0].obtenNivel());
			console.log("Factor de ramificación: "+factor);
			console.log(pasos);
			process.exit(1);
		}

		pasos.push(nodosHijo[0].obtenMovimiento());

		nodosHijo.splice(0, 1);

		nodosHijo.sort(compare);

	}

	while(nodosHijo.length != 0){
		expandirNodos(nodosHijo[0].obtenNodo(), nodosHijo[0].obtenNivel());
	}
});
