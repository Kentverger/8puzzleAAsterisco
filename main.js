
// Variables iniciales
var raiz = [[1, 2, 3],
		[4, 5, 0],
		[7, 8, 6]];

var meta = [[1, 2, 3],
		[4, 5, 6],
		[7, 8, 0]];

var lista = [];


/**
*
*    Objeto nodo con las propiedades de costo y piezas mal colocadas
*
**/

function Nodo(nodo){
	this.nodo = nodo;
	this.piezasMalColocadas = 0;
	this.nivel = 0;
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

Nodo.prototype.ponPiezasMalColocadas = function(piezas){
	this.piezasMalColocadas = piezas;
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

var nodoInicial = new Nodo(raiz);
var nodoMeta = new Nodo(meta);

lista.push(nodoInicial);

var contador = parseInt(0);
var nivel = parseInt(0);


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

//Expande los nodos 
function expandirNodos(lista, pos){

	nivel++;

	nodo = lista[0].obtenNodo();

	/*console.log("----------------");
	console.log(lista);
	console.log("****************");*/

	//Busca en todo el arreglo el 0
	for(x in nodo){
		for(y in nodo[x]){
			if(nodo[x][y] == 0){
				var i = parseInt(x);
				var j = parseInt(y);

				if(i-1>=0){

					var copia = clone(nodo);

					tmp1 = copia[i-1][y];

					copia[i-1][y] = copia[i][y];

					copia[i][y] = tmp1;

					var node = new Nodo(copia);

					node.ponNivel(nivel);

					node.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node.obtenNodo()));

					lista.push(node);

				}
				if(i+1<=2){

					var copia2 = clone(nodo);

					tmp2 = copia2[i+1][y];

					copia2[i+1][y] = copia2[i][y];

					copia2[i][y] = tmp2;

					var node2 = new Nodo(copia2);

					node2.ponNivel(nivel);

					node2.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node2.obtenNodo()));

					lista.push(node2);
				}
				if(j-1>=0){

					var copia3 = clone(nodo);

					tmp3 = copia3[i][j-1];

					copia3[i][j-1] = copia3[i][j];

					copia3[i][j] = tmp3;

					var node3 = new Nodo(copia3);

					node3.ponNivel(nivel);

					node3.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node3.obtenNodo()));

					lista.push(node3);
				}
				if(j+1<=2){
					var copia4 = clone(nodo);

					tmp4 = copia4[i][j+1];

					copia4[i][j+1] = copia4[i][j];

					copia4[i][j] = tmp4;

					var node4 = new Nodo(copia4);

					node4.ponNivel(nivel);

					node4.ponPiezasMalColocadas(numeroDePiezasMalColocadas(nodoMeta.obtenNodo(), node4.obtenNodo()));

					lista.push(node4);
				}
			}
		}
	}
	
	if(compraraNodos(nodoMeta.obtenNodo(), lista[pos].obtenNodo())){
		console.log("Nivel del arbol de la solucion: " + lista[pos].obtenNivel());
		process.exit(1);
	}

	lista.splice(0, 1);
}

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