
// Variables iniciales
var raiz = [[1, 2, 3],
			[4, 0, 5],
			[7, 8, 6]];

var meta = [[1, 2, 3],
		[4, 5, 6],
		[7, 8, 0]];

var lista = [];

var exp_cont=0;
var pasos=0;

/**
*
*    Objeto nodo con las propiedades de costo y piezas mal colocadas
*
**/

function Nodo(nodo){
	this.nodo = nodo;
	this.distanciaManhattan = 0;
	this.nivel = 0;
}
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
Nodo.prototype.obtenDistanciaManhattan = function(){
	return this.distanciaManhattan;
}

Nodo.prototype.obtenNivel = function(){
	return this.nivel;
}

Nodo.prototype.obtenNodo = function(){
	return this.nodo;
}

Nodo.prototype.obtenFn = function(){
	return this.distanciaManhattan + this.nivel;
}

Nodo.prototype.ponDistanciaManhattan = function(distancia){
	this.distanciaManhattan = distancia;
}

Nodo.prototype.ponNivel = function(nivel){
	this.nivel = nivel;
}

Nodo.prototype.ponNodo = function(nodo){
	this.nodo = nodo;
}

/**
*
*   Fin del objeto
*
**/

//se declara el nodo inicial con la función Nodo que inicializa el nivel y las piezas mal colocadas en 0
var nodoInicial = new Nodo(raiz);
//se declara el nodo meta con la función Nodo que inicializa el nivel y las piezas mal colocadas en 0
var nodoMeta = new Nodo(meta);

//agrega el nodo inicial a la lista
lista.push(nodoInicial);

//inicializa variable contador en 0
var contador = parseInt(0);
//inicializa variable nivel en 0
var nivel = parseInt(0);


// Funcion que clona un nodo ( Maldito javascript extraño :S )
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

//Expande los nodos 
function expandirNodos(lista, pos){
	exp_cont++;
	nivel++;

	nodo = lista[0].obtenNodo();

	/*console.log("----------------");
	console.log(lista);
	console.log("****************");*/

	//Busca en todo el arreglo el 0
	for(x in nodo){
		for(y in nodo[x]){
			if(nodo[x][y] == 0){//si encuentra el valor de 0 entonces
				var i = parseInt(x);//j lo declara como el valor int de x
				var j = parseInt(y);//i lo declara como el valor int de y

				if(i-1>=0){//si i-1 es menor o igual a 0 entonces
					//clona nodo en una variable llamada copia
					var copia = clone(nodo);
					//tmp1 es una referencia del valor de copia en la posición i-1,y
					tmp1 = copia[i-1][y];
					//a copia en la posición i-1,y se le asigna el valor de copia en la posición i,y
					copia[i-1][y] = copia[i][y];
					//a copia en la posición i,y se le asigna el valor de i,y
					copia[i][y] = tmp1;
					//se instancía node como un nuevo nodo con el valor de copia
					var node = new Nodo(copia);
					//se le da a node el valor del nivel en el que se encuentra
					node.ponNivel(nivel);
					//se le da a node el valor de la distancia manhattan actual
					node.ponDistanciaManhattan(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node.obtenNodo()));
					//agrega el nodo a la lista
					lista.push(node);

				}
				if(i+1<=2){

					var copia2 = clone(nodo);

					tmp2 = copia2[i+1][y];

					copia2[i+1][y] = copia2[i][y];

					copia2[i][y] = tmp2;

					var node2 = new Nodo(copia2);

					node2.ponNivel(nivel);

					node2.ponDistanciaManhattan(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node2.obtenNodo()));

					lista.push(node2);
				}
				if(j-1>=0){

					var copia3 = clone(nodo);

					tmp3 = copia3[i][j-1];

					copia3[i][j-1] = copia3[i][j];

					copia3[i][j] = tmp3;

					var node3 = new Nodo(copia3);

					node3.ponNivel(nivel);

					node3.ponDistanciaManhattan(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node3.obtenNodo()));

					lista.push(node3);
				}
				if(j+1<=2){
					var copia4 = clone(nodo);

					tmp4 = copia4[i][j+1];

					copia4[i][j+1] = copia4[i][j];

					copia4[i][j] = tmp4;

					var node4 = new Nodo(copia4);

					node4.ponNivel(nivel);

					node4.ponDistanciaManhattan(numeroDeDistanciaManhattan(nodoMeta.obtenNodo(), node4.obtenNodo()));

					lista.push(node4);
				}
			}
		}
	}
	
	if(comparaNodos(nodoMeta.obtenNodo(), lista[pos].obtenNodo())){
		console.log("===================================");
		console.log(" ");
		console.log("PASOS: " + lista[pos].obtenNivel() );
		//Número de esquinas por el numero de casillas que pueden desplazar
		var esquina = 4*2;
		//Número de lados por el numero de casillas que pueden desplazar
		var lado = 4*3;
		//Casilla central por las casillas que puede desplazar
		var centro = 1*4;
		//factor de ramificación
		var factor = (parseInt(esquina)+parseInt(lado)+parseInt(centro))/8;//número de casillas que se desplazan.
		console.log('FACTOR DE RAMIFICACION: '+factor);
		console.log('RAMIFICACION PROMEDIO:'+newton_raphson(exp_cont,lista[pos].obtenNivel(),factor));
		console.log(" ");
		console.log("===================================");
		process.exit(1);
	}

	lista.splice(0, 1);
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
	console.log('Distancia Manhattan: '+distancia+' del nodo: '+nodo2);
	return distancia;
}

function comparaNodos(nodo1, nodo2){
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

//Funcion para sacar la ramificación promedio
function newton_raphson(n,k,b){
	n = parseFloat(n);
	k = parseFloat(k);
	b = parseFloat(b);
	var f= Math.pow(b,(k+1))+(b*(1-n))-1;
	var f_prima=(k+1)*Math.pow(b,k);
	var b_prima= b-(f/f_prima);
	if((b_prima-b)< 0.00001){
		return b_prima;
	}else{
		newton_raphson(n,k,b_prima);
	}

}

expandirNodos(lista, contador);

while(lista.length != 0){

	for(x in lista){
		var fn = lista[x].obtenFn();
		var nextPos = parseInt(x) + parseInt(1);

		if(lista[nextPos] != undefined){
			var fn2 = lista[nextPos].obtenFn();
			if(parseInt(fn) > parseInt(fn2)){
				var nodoSiguiente = nextPos;
				console.log("Posicion del arbol en la que se mueve: "+nextPos);
				console.log("FN: "+fn2);
			}
		}
	}

	expandirNodos(lista, nodoSiguiente);
	
}	

