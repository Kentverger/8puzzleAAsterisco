var fs = require("fs");
var util = require('util');

var exp_cont=0;
var pasos=0;


function Casilla(casilla,fil,col,val){
	this.valCas = casilla;
	this.fil = fil;
	this.col = col;
	this.val = val;
}
function CasillaCorrecta(casilla,fil, col){
	this.valCas = casilla;
	this.fil = fil;
	this.col = col;
}

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

function numeroDeDistanciaManhattan(nodo1, nodo2){
	//inicializa contador
	var contador = 0;
	//arreglo de piezas mal colocadas
	var piezasmal = new Array;
	var correcto = new Array;
	//variable con el numero de movimientos de la casilla
	var distancia = 0;
	//recorre el arreglo del nodo 1
	for(x in nodo1){
		//recorre el primer arreglo en el arreglo nodo 1
		for(y in nodo1[x]){
			//x toma el valor int de x
			x = parseInt(x);
			//y toma el valor int de y
			y = parseInt(y);
			//si el valor de nodo 1 en la posición x,y es diferente al valor del nodo 2 en la posición x,y
			if(nodo1[x][y] != nodo2[x][y]){
				//el arreglo de piezas mal colocadas en la posición contador, 0 se le asigna el valor del nodo2
				piezasmal[contador]=new Casilla(nodo2[x][y],x,y,distancia);
				//console.log('PIEZA MAL COLOCADA: val{'+piezasmal[contador].valCas+'} ['+piezasmal[contador].fil+']['+piezasmal[contador].col+']');
				for (r in nodo1){//para cada fila en el nodo1
					for (s in nodo1[r]){//para cada casilla en el nodo1[r]
						r = parseInt(r);
						s = parseInt(s);
						if(nodo1[r][s]==piezasmal[contador].valCas){//si el valor del nodo1 actual es igual al valor guardado en esa posición de piezasmal, entoces 
							correcto[contador]= new CasillaCorrecta(nodo1[r][s],r,s);//se guarda el valor
							//console.log('LUGAR CORRECTO: val{'+correcto[contador].valCas+'} ['+correcto[contador].fil+']['+correcto[contador].col+']');
							
							//CONTADOR DE MOVIMIENTOS
							//FILA 0: si la fila donde esta nuestra pieza es la 0
							if(piezasmal[contador].fil==0){
								if(correcto[contador].fil==0){//y la fila correcta es la 0
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										if(correcto[contador].cil==1){}
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){
											distancia=parseInt(distancia)+1;
										}
									}
								}
								//y la fila correcta es la 1
								if(correcto[contador].fil==1){
									//distancia va a ser igual a distancia mas 1 ya que la fila correcta está a un movimiento
									distancia=parseInt(distancia)+1;
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){//y la columna correcta es la 0
											//distancia es igual a distancia +2
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){//y la columna correcta es la 1
											//distancia es igual a distancia +2
											distancia=parseInt(distancia)+1;
										}
									}
								}
								//y la fila correcta es la 2
								if(correcto[contador].fil==2){
									//distancia va a ser igual a distancia mas 1 ya que la fila correcta está a un movimiento
									distancia=parseInt(distancia)+2;
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){
											distancia=parseInt(distancia)+1;
										}
									}
								}
							}

							//FILA 1: si la fila donde esta nuestra pieza es la 1
							else if(piezasmal[contador].fil==1){
								if(correcto[contador].fil==0){//y la fila correcta es la 0
									//distancia va a ser igual a distancia mas 1 ya que la fila correcta está a un movimiento
									distancia=parseInt(distancia)+1;
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){
											distancia=parseInt(distancia)+1;
										}
									}
								}
								//y la fila correcta es la 1
								if(correcto[contador].fil==1){
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){//y la columna correcta es la 0
											//distancia es igual a distancia +2
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){//y la columna correcta es la 1
											//distancia es igual a distancia +2
											distancia=parseInt(distancia)+1;
										}
									}
								}
								//y la fila correcta es la 2
								if(correcto[contador].fil==2){
									//distancia va a ser igual a distancia mas 1 ya que la fila correcta está a un movimiento
									distancia=parseInt(distancia)+1;
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){
											distancia=parseInt(distancia)+1;
										}
									}
								}
							}

							//FILA 2: si la fila donde esta nuestra pieza es la 2
							else if(piezasmal[contador].fil==2){
								if(correcto[contador].fil==0){//y la fila correcta es la 0
									//distancia va a ser igual a distancia mas 1 ya que la fila correcta está a un movimiento
									distancia=parseInt(distancia)+2;
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){
											distancia=parseInt(distancia)+1;
										}
									}
								}
								//y la fila correcta es la 1
								if(correcto[contador].fil==1){
									//distancia va a ser igual a distancia mas 1 ya que la fila correcta está a un movimiento
									distancia=parseInt(distancia)+1;
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									else if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									else if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){//y la columna correcta es la 0
											//distancia es igual a distancia +2
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){//y la columna correcta es la 1
											//distancia es igual a distancia +2
											distancia=parseInt(distancia)+1;
										}
									}
									break;
								}
								//y la fila correcta es la 2
								if(correcto[contador].fil==2){
									if(piezasmal[contador].col==0){//si la columna donde esta nuestra pieza es la 0
										//distancia va a ser igual a distancia mas la posición de la columna correcta 1 ó 2
										distancia=parseInt(distancia)+parseInt(correcto[contador].col);
									}
									if(piezasmal[contador].col==1){//si la columna donde esta nuestra pieza es la 1
										//distancia va a ser igual a distancia mas 1 ya que la columna correcta está a un movimiento
										distancia=parseInt(distancia)+1;
									}
									if(piezasmal[contador].col==2){//si la columna donde esta nuestra pieza es la 2
										if(correcto[contador].col==0){
											distancia=parseInt(distancia)+2;
										}else if(correcto[contador].col==1){
											distancia=parseInt(distancia)+1;
										}
									}
								}

							}
							break;
						}
					}
				}
				//se aumenta el contadorde piezas mal colocadas
				contador++;
			}
		}
	}
	pasos++;
	//console.log('Distancia Manhattan: '+distancia+' del nodo: '+nodo2);
	return distancia;
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
						node.ponPiezasMalColocadas(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node.obtenNodo()));
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
						node2.ponPiezasMalColocadas(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node2.obtenNodo()));
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
						node3.ponPiezasMalColocadas(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node3.obtenNodo()));
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
						node4.ponPiezasMalColocadas(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node4.obtenNodo()));
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
