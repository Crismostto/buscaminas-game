
// Componente de celda.
const celda = {
    props: ['objetoCelda'],
    template: "#celda-template",
};


// Componente de tablero.
const tablero = {
    template: "#tablero-template",
    components: {
        celda
    },

    data: function () {
        return {
            deshabilitadoFacil:false,
            deshabilitadoIntermedio:false,
            deshabilitadoDificil:false,
            mostrarBandera:false,
            ganar: false,
            perder: false,
            contadorFinal: 0,
            tablero: [],
            dificultad: {
                fil: '',
                col: '',
                bom: '',
                band: '',
            }
        }
    },

    methods: {
        //Seleccion dificultades.

        dificultadPrincipiante() {
            this.deshabilitadoFacil= false;
            this.deshabilitadoIntermedio= true;
            this.deshabilitadoDificil= true;
            this.mostrarBandera= true;
            this.ganar = false;
            this.perder = false;
            this.dificultad = {
                fil: 5,
                col: 5,
                bom: 4,
                band: 4,
            },
            this.llenarGrilla();
        },


        dificultadIntermedio() {
            this.deshabilitadoFacil= true;
            this.deshabilitadoIntermedio= false;
            this.deshabilitadoDificil= true;
            this.mostrarBandera= true;
            this.ganar = false;
            this.perder = false;
            this.dificultad = {
                fil: 6,
                col: 6,
                bom: 7,
                band: 7,
            },
                this.llenarGrilla();
        },


        dificultadAvanzado() {
            this.deshabilitadoFacil= true;
            this.deshabilitadoIntermedio= true;
            this.deshabilitadoDificil= false;
            this.mostrarBandera= true;
            this.ganar = false;
            this.perder = false;
            this.dificultad = {
                fil: 10,
                col: 10,
                bom: 10,
                band: 10,
            },
                this.llenarGrilla();
        },


        // LLenado de la grilla 
        llenarGrilla() {
            //Se instancia el componente celda. 
            class celda {
                norevelado = ''
                revelado = false
                bandera = false
                bomba = false
                numero = 0
                x = 0
                y = 0
            }
            
            //Se crea la matriz del tablero.
            this.tablero = []
            for (let i = 0; i < this.dificultad.fil; i++) {
                var cuadro = [];
                for (let j = 0; j < this.dificultad.col; j++) {
                    objetoCelda = new celda
                    objetoCelda.x = i
                    objetoCelda.y = j
                    cuadro.push(objetoCelda);
                }
                this.tablero.push(cuadro);
            }

            //Una vez creado el tablero se colocan las bombas en las celdas.
            this.colocarBombas();
        },
        
        //Colocacion de bombas. 
        colocarBombas() {
            var bombasColocadas = 0;
            while (this.dificultad.bom > bombasColocadas) {
                var celi = Math.floor(Math.random() * this.dificultad.fil);
                var celj = Math.floor(Math.random() * this.dificultad.col);
                if (!this.tablero[celi][celj].bomba) {
                    this.tablero[celi][celj].bomba = true;
                    this.tablero[celi][celj].numero = '💣';
                } else {
                    bombasColocadas--
                }
                bombasColocadas++
            }
            this.colocarNumeros();
        },

        //Proceso de colocacion de numeros.     
        colocarNumeros() {
            for (let i = 0; i < this.dificultad.fil; i++) {
                for (let j = 0; j < this.dificultad.col; j++) {
                    if (!this.tablero[i][j].bomba) {
                        var total = 0;
                        for (let x = -1; x <= 1; x++) {
                            for (let y = -1; y <= 1; y++) {
                                if (x == 0 && y == 0) {
                                    continue
                                }
                                try {
                                    if (this.tablero[i + x][j + y].bomba == true) {
                                        total++
                                    }
                                } catch (e) { }
                            }
                        }
                        this.tablero[i][j].numero = total;
                    }
                }
            }
        },



        colocarBandera(objetoCelda) {
            if (this.dificultad.band > 0) {
                objetoCelda.bandera = !objetoCelda.bandera;
                if (objetoCelda.bandera == true) {
                    objetoCelda.norevelado = '🏴';
                } else {
                    objetoCelda.norevelado = '';
                }
                this.banderas(objetoCelda);
            } else {
                if (objetoCelda.bandera == true) {
                    objetoCelda.bandera = !objetoCelda.bandera;
                    objetoCelda.norevelado = '';
                    this.dificultad.band++
                }
            }
            this.ganarJuego(objetoCelda);
        },

        revelarCelda(objetoCelda) {
            if (!objetoCelda.revelado) {
                objetoCelda.revelado = true;

            }
            if (objetoCelda.numero == 0) {
                this.revelarVacios(objetoCelda);
            }
            if (objetoCelda.bomba == true) {
                this.revelarTodos();
                this.perder = true;

            }
        },

        banderas(objetoCelda) {
            if (objetoCelda.bandera == true) {
                this.dificultad.band--
            }
            if (objetoCelda.bandera == false) {
                this.dificultad.band++
            }
        },

        ganarJuego(objetoCelda) {
            if (objetoCelda.bomba == true && objetoCelda.bandera == true) {
                this.contadorFinal++
            }
            if (objetoCelda.bomba == true && objetoCelda.bandera == false) {
                this.contadorFinal--
            }
            if (this.contadorFinal == this.dificultad.bom) {
                this.ganar = true;
            }
        },
        revelarTodos() {
            for (let i = 0; i < this.dificultad.fil; i++) {
                for (let j = 0; j < this.dificultad.col; j++) {
                    if (this.tablero[i][j].revelado == false) {
                        this.tablero[i][j].revelado = true;
                    }
                }
            }
        },
        
        revelarVacios(objetoCelda) {
            var i = objetoCelda.x;
            var j = objetoCelda.y;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x == 0 && y == 0) {
                        continue
                    }
                    try {
                        if (this.tablero[i + x][j + y].revelado == false) {
                            if (this.tablero[i + x][j + y].bomba == false) {
                                this.tablero[i + x][j + y].revelado = true;
                                if (this.tablero[i + x][j + y].numero == 0) {
                                    objetoCelda.x = i + x;
                                    objetoCelda.y = j + y;
                                    this.revelarVacios(objetoCelda);
                                }
                            }
                        }
                    } catch (e) { }
                }
            }
        },
    },

};

// Componente principal.
const vm = new Vue({
    el: "#app",
    data: {
        tablero: [],
        dificultad: {
            fil: '',
            col: '',
            bom: '',
            band: '',
        }
    },
    components: {
        tablero,
    }
});
