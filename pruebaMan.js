var raiz = [[1, 2, 4],
			[7, 0, 5],
			[3, 6, 8]];

var meta = [[1, 2, 3],
		[4, 5, 6],
		[7, 8, 0]];

var lista = [];

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

numeroDeDistanciaManhattan(meta, raiz);

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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
										
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
										if(correcto[contador].col==1){
											//distancia va a ser igual a distancia mas 1
											distancia=parseInt(distancia)+1;
										}else if (correcto[contador].col==2){
											//distancia va a ser igual a distancia mas 2
											distancia=parseInt(distancia)+2;
										}
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
	console.log('Distancia: '+distancia+' del nodo: '+nodo2);
	return distancia;
}