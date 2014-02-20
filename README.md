# 8 Puzzle con A*, heuristicas distancia Manhattan y numero de fichas mas colocadas

Implementación de A* con dos heurísticas, casillas mal colocadas y distancia manhattan

Por:


* 070521 Luis Carlos González Hernández
* 070462 Ana Karen Guerrero Gámez
* 090125 Asaf Eduardo López Govea
* 070528 José Gualberto Meléndez Rangel


Inteligencia Artificial I
Proyecto 1

## Instrucciones

1. Es necesario instalar Node Js.
	Para linux/unix corra en la terminal el siguiente comando:
	`$ curl https://raw.github.com/creationix/nvm/master/ install.sh | sh`
	`$ nvm install 0.10`


	Revisa tu versión de node para saber si se instaló correctamente:
	`$ node -v`

2. En la terminal dirigete a la carpeta donde se encuentra el codigo fuente y corre el comando
	`$ node main.js //para la heurística 1 (piezas mal colocadas)`
	`$ node mainManhattan.js //para la heurística 2 (distancia manhattan)`

## Información Adicional
Se utilizó Node js, una plataforma que utiliza Javascript como lenguaje de programación.
El factor de ramificación promedio lo sacamos en el basado en este documento >> http://ocw.uc3m.es/ingenieria-informatica/inteligencia-artificial-2/ejercicios/ejercicios-espacio-estados.pdf y adaptamos según nuestro problema 8 Puzzle