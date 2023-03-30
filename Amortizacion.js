(function () {
    document.addEventListener("DOMContentLoaded", () => {
        
        const formulario = document.querySelector('form#formAmortizacion');
        function mostrarAmortizacion({monto, interes, plazo}) {     
            let interesMensual = interes/1200;

            let cuota = (interesMensual * monto)/(1-Math.pow((1+interesMensual), -plazo))
            cuota = Math.round(cuota * 100) /100;
            
            let capital = monto;

            let tabla = {'cuota': cuota, 'plazo':plazo, 'filas':[]}

            for (let i = 0; i < plazo; i++) {
                let interesPagado = (interesMensual*capital).toFixed(2);
                let capitalPagado = (cuota-interesPagado).toFixed(2);
                capital -= capitalPagado;
                capital = capital.toFixed(2)
                if (capital < 0) capital = 0;

                let fila = {'interesPagado':interesPagado, 'capitalPagado':capitalPagado, 'capitalRestante': capital}
                tabla.filas.push(fila);
            }
            
            renderizarTabla(tabla);
        }

        function renderizarTabla({cuota, filas, plazo}) {
            let articleAmortizacion = document.querySelector('.tablaAmortizacion');
            if (articleAmortizacion.classList.contains('d-none')) articleAmortizacion.classList.remove('d-none')

            let tablaContainer = document.querySelector('.tablaAmortizacion tbody');

            tablaContainer.innerHTML = '';

            // Variables para animacion
            let numFrames = 200;
            
            filas.forEach((fila, plazo) => {
                let delay = numFrames;
                
                setTimeout(() => {
                    scrollTo(0, document.body.clientHeight)
                    
                    
                    tablaContainer.innerHTML += `<tr class="table-light animationRow">  
                    <td>${plazo+1}</td>
                    <td>${cuota}</td>
                    <td>${fila.capitalPagado}</td>
                    <td>${fila.interesPagado}</td>
                    <td>${fila.capitalRestante}</td>
                    </tr>`;
                }, delay*plazo)
                delay += numFrames;
            })

        }

        
        formulario.addEventListener("submit", e => {
            e.preventDefault();
            const datos = new FormData(formulario);

            let monto, interes, plazo = 0;

            try {
                monto = Number.parseFloat(datos.get("monto"));
                interes = Number.parseFloat(datos.get("interes"));
                plazo = Number.parseInt(datos.get("plazo"));
            }catch(error) {
                console.error(error);
                alert("Valores no validos, inserte numeros por favor")
                return
            }
            
            if (monto > 0 &&
                interes > 0 &&
                plazo > 0) {
                let datosNetos = {'monto': monto, 'interes':interes, 'plazo':plazo};
                mostrarAmortizacion(datosNetos);
            }else {
                alert("Valores no validos, inserte nuevamente")
            }
        })

    })
})();