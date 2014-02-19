%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%						     %%
%%	Algoritmo de  busqueda A*                    %%
%%	E describe el estado			     %%
%%	P la profundidad del nodo                    %%
%%	F valor de la funcion de evaluacion          %%
%%	A antecesor del nodo                         %%
%%		                                     %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- op(400,yfx,'#').  %constructor de nodo
%necesario para determinar los nodos a buscar en cada estado

puzzle(Estado,Soln) :- f_funcion(Estado,0,F),
	               buscar([Estado#0#F#[]],E), reverse(E,Soln).

%funcion heuristica que estima el esfuerzo a realizar
%para llegar a la meta desde el estado actual
f_funcion(Estado,P,F) :- heuristica_funcion(Estado,H),
	                 F is P + H.

buscar([Estado#_#_#Soln|_],Soln) :- goal(Estado).
buscar([B|R],E) :- expandir(B,Hijos),
	           insertar_todos(Hijos,R,Abierto),
		   buscar(Abierto,E). %busca estado abierto

insertar_todos([F|R],Abierto1,Abierto3) :- insertar(F,Abierto1,Abierto2),
	                                   insertar_todos(R,Abierto2,Abierto3).

insertar_todos([],Abierto,Abierto).

insertar(B,Abierto,Abierto) :- repetir_nodo(B,Abierto), !.
insertar(B,[C|R],[B,C|R]) :- barato(B,C), !.
insertar(B,[B1|R],[B1|E]) :- insertar(B,R,E), !.
insertar(B,[],[B]).

repetir_nodo(P#_#_#_, [P#_#_#_|_]).

%determina el costo mas bajo entre los esfuerzos obtenidos
%en la funcion heuristica
barato(_#_#F1#_, _#_#F2#_ ) :- F1 < F2.

%expande los hijos del estado actual
expandir(Estado#D#_#E,Todos_hijos) :-
	bagof(Hijo#D1#F#[Mover|E], %coleccion de enlaces individuales de las variables en la meta
	      (	  D1 is D+1,
		  mover(Estado,Hijo,Mover),
		  f_funcion(Hijo,D1,F)),
	      Todos_hijos).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%						     %%
%%	Solucion al 8-puzzle                         %%
%%	Forma del estado (a/b/c/d/e/f/g/h/i)	     %%
%%	(a...i) representan los numeros (1...8)      %%
%%	Se utiliza 0 para el espacio en blanco       %%
%%	Estado inicial delclarado por usuario        %%
%%		                                     %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

goal(0/1/2/3/4/5/6/7/8).

%movimientos posibles segun la posicion del espacio en blanco

left( A/0/C/D/E/F/H/I/J , 0/A/C/D/E/F/H/I/J ).
left( A/B/C/D/0/F/H/I/J , A/B/C/0/D/F/H/I/J ).
left( A/B/C/D/E/F/H/0/J , A/B/C/D/E/F/0/H/J ).
left( A/B/0/D/E/F/H/I/J , A/0/B/D/E/F/H/I/J ).
left( A/B/C/D/E/0/H/I/J , A/B/C/D/0/E/H/I/J ).
left( A/B/C/D/E/F/H/I/0 , A/B/C/D/E/F/H/0/I ).

up( A/B/C/0/E/F/H/I/J , 0/B/C/A/E/F/H/I/J ).
up( A/B/C/D/0/F/H/I/J , A/0/C/D/B/F/H/I/J ).
up( A/B/C/D/E/0/H/I/J , A/B/0/D/E/C/H/I/J ).
up( A/B/C/D/E/F/0/I/J , A/B/C/0/E/F/D/I/J ).
up( A/B/C/D/E/F/H/0/J , A/B/C/D/0/F/H/E/J ).
up( A/B/C/D/E/F/H/I/0 , A/B/C/D/E/0/H/I/F ).

right( A/0/C/D/E/F/H/I/J , A/C/0/D/E/F/H/I/J ).
right( A/B/C/D/0/F/H/I/J , A/B/C/D/F/0/H/I/J ).
right( A/B/C/D/E/F/H/0/J , A/B/C/D/E/F/H/J/0 ).
right( 0/B/C/D/E/F/H/I/J , B/0/C/D/E/F/H/I/J ).
right( A/B/C/0/E/F/H/I/J , A/B/C/E/0/F/H/I/J ).
right( A/B/C/D/E/F/0/I/J , A/B/C/D/E/F/I/0/J ).

down( A/B/C/0/E/F/H/I/J , A/B/C/H/E/F/0/I/J ).
down( A/B/C/D/0/F/H/I/J , A/B/C/D/I/F/H/0/J ).
down( A/B/C/D/E/0/H/I/J , A/B/C/D/E/J/H/I/0 ).
down( 0/B/C/D/E/F/H/I/J , D/B/C/0/E/F/H/I/J ).
down( A/0/C/D/E/F/H/I/J , A/E/C/D/0/F/H/I/J ).
down( A/B/0/D/E/F/H/I/J , A/B/F/D/E/0/H/I/J ).

%funcion heuristica
heuristica_funcion(Pieza,H) :- d_fcn(Pieza,P), %funcion de distancia Manhattan
	                       s_fcn(Pieza,E), %Funcion de secuencia
					       %basa en la secuencia que debe seguir el estado final
					       %centro=1 no en el centro=2
			       H is P + 3*E.   %Heuristica de Nilsson's

%mover la pieza
mover(P,C,up) :- up(P,C).
mover(P,C,down) :- down(P,C).
mover(P,C,right) :- right(P,C).
mover(P,C,left) :- left(P,C).

%Distancia de Manhattan para determinar P y E
d_fcn(A/B/C/D/E/F/G/H/I, P) :-
     a(A,Pa), b(B,Pb), c(C,Pc),
     d(D,Pd), e(E,Pe), f(F,Pf),
     g(G,Pg), h(H,Ph), i(I,Pi),
     P is Pa+Pb+Pc+Pd+Pe+Pf+Pg+Ph+Pg+Pi.

a(0,0). a(1,0). a(2,1). a(3,2). a(4,3). a(5,4). a(6,3). a(7,2). a(8,1).
b(0,0). b(1,0). b(2,0). b(3,1). b(4,2). b(5,3). b(6,2). b(7,3). b(8,2).
c(0,0). c(1,2). c(2,1). c(3,0). c(4,1). c(5,2). c(6,3). c(7,4). c(8,3).
d(0,0). d(1,1). d(2,2). d(3,3). d(4,2). d(5,3). d(6,2). d(7,2). d(8,0).
e(0,0). e(1,2). e(2,1). e(3,2). e(4,1). e(5,2). e(6,1). e(7,2). e(8,1).
f(0,0). f(1,3). f(2,2). f(3,1). f(4,0). f(5,1). f(6,2). f(7,3). f(8,2).
g(0,0). g(1,2). g(2,3). g(3,4). g(4,3). g(5,2). g(6,2). g(7,0). g(8,1).
h(0,0). h(1,3). h(2,3). h(3,3). h(4,2). h(5,1). h(6,0). h(7,1). h(8,2).
i(0,0). i(1,4). i(2,3). i(3,2). i(4,1). i(5,0). i(6,1). i(7,2). i(8,3).

%funcion de secuencia

s_fcn(A/B/C/D/E/F/G/H/I, S) :-
     s_aux(A,B,S1), s_aux(B,C,S2), s_aux(C,F,S3),
     s_aux(F,I,S4), s_aux(I,H,S5), s_aux(H,G,S6),
     s_aux(G,D,S7), s_aux(D,A,S8), s_aux(E,S9),
     S is S1+S2+S3+S4+S5+S6+S7+S8+S9.

s_aux(0,0) :- !.
s_aux(_,1).

s_aux(X,Y,0) :- Y is X+1, !.
s_aux(8,1,0) :- !.
s_aux(_,_,2).




